const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express=require('express');
const {BOUNCE_MAIL,SENDERS_MAIL,JWT_KEY}=require('../../env');
const { db } = require('../db/sql');
//For student table
const Student = require('../models/student_table');
//Middleware
const verifyToken = require('../middleware/verify_token');
//const webp = require('webp-converter');
//For customer table
const { User } = require('../models/customer_table');
const codingJWT = require('../JWT/coding');

router.use(express.json())

  

//Create a new student
router.post('/register', async (req, res) => {
    try {
        //Fetching data from body of post request
        let {
            student_first_name,
            student_last_name,
            student_phone_number,
            student_email,
            student_password,
            using_google = false,
            customer_id,
        } = req.body;

        //Don't change it to let otherwise DB is will not connect
        //Check if student exists
        sqlCheck = await Student.findOne({
            where: {
                student_email,
            },
        });
  
        //If student already exist
        if (sqlCheck) {
            return res.status(500).json({
                success: 0,
                error: 'Email Aready Registered',
            });
        }
  
        //Encrypting password and checking if all parameters are passed
        if (!using_google) {
            if(student_phone_number==null || student_last_name==null || student_password==null){
                return res.status(500).json({
                    success: 0,
                    error: 'Please provide all parameters',
                });
            }
            const salt = bcrypt.genSaltSync(10);
            student_password = bcrypt.hashSync(student_password, salt);
        }

    
        //Creating student
        const user = await Student.create({
            student_first_name,
            student_last_name,
            customer_id,
            student_phone_number,
            student_email,
            student_password,
        });

        //Hit email api for welcome email
        //Hit sms api for welcome sms

        res.redirect(307, '/student/auth/login');
    } 
    catch (err) {
        console.log("Error")
        return res.status(500).json({
            success: 0,
            error: 'Database connection error',
            errorReturned: err,
        });
    }
});
  
//Logging in student
router.post('/login', async (req, res) => {
    try {
        //Fetching data from body of post request
        const {
            student_email,
            student_password = '',
            using_google = false,
        } = req.body;

        //Checking if student exists
        const sqlCheck = await Student.findOne({
            where: {
                student_email,
            },
            attributes: ['student_id', 'student_password'],
        });

        //If student does not exist
        if (!sqlCheck) {
            return res.status(500).json({
                success: 0,
                error: 'Email not registered',
            });
        } 
        else {
            //If student exists
            if (!using_google) {
                if(student_password==''){
                    return res.status(500).json({
                        success: 0,
                        error: 'Please provide password parameter',
                    });
                }
                //Password check
                let storedPassword = sqlCheck.dataValues.student_password;
                const matchPassword = bcrypt.compareSync(
                    student_password,
                    storedPassword
                );

                if (!matchPassword) {
                    return res.status(500).json({
                        success: 0,
                        error: 'Incorrect Password',
                    });
                }
            }
            //Token creation
            const jwtToken = jwt.sign(
                { student_id: sqlCheck.dataValues.student_id },
                JWT_KEY,
                { expiresIn: '7d',}
            );
    
            //Cookie creation
            res.cookie('auth-token', jwtToken, {
                httpOnly: true,
            });
    
            return res.status(200).json({
                success: 1,
                message: 'Login Successful',
                token: jwtToken,
            });
        }
    } 
    catch (err) {
        return res.status(500).json({
            success: 0,
            error: 'Database connection error',
            errorReturned: err,
        });
    }
});
  
  
router.get("/logout",async(req,res,next)=>{
    try{    
        //Clearing cookie
        res.clearCookie("auth-token");
        return res.status(200).json({
            success:1,
            msg:"Logged out successfully"
        })
    }
    catch(error){
        res.status(500).json({
            msg:"Unable to logout",
            err:error
        })
    }
})
  
router.post('/forgotPassword', async (req, res) => {
    try {
        //Fetch email from body of post request
        const { student_email } = req.body;

        //Fetching data
        sqlCheck = await Student.findOne({
            where: {
                student_email: student_email,
            },
            attributes: ['student_id','customer_id'],
        });
    
        //Not registered
        if (!sqlCheck) {
            return res.status(500).json({
                success: 0,
                error: 'Email not registered',
            });
        } 

        const encryptedData = jwt.sign(
            { student_email, valid: Date.now() },
            JWT_KEY,
            {
              expiresIn: '1d',
            }
        );

        const myobj={
            bounce_address: BOUNCE_MAIL,
            from: { address: SENDERS_MAIL, name: 'Oyesters Training' },
            to: student_email,
            sender_name:"OYESTR",
            sender_id: 1,
            customer_id: sqlCheck.dataValues.customer_id,
            method:"default",
            subject: 'Welcome!!!!!!',
            htmlbody: `Nice to have you here.
                <h2>Reset Your Password</h2>
                <a href="http://localhost:3002/student/auth/reset-password?oobCode=${encryptedData}">Reset</a>
                `,
        }

        JWT_token=codingJWT(myobj)
        res.redirect(`http://localhost:5000/email/${JWT_token}/`)
 
    } 
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: 0,
            error: 'Database Connection Error',
            errorReturned: err,
        });
    }
});
  
router.post('/resetPassword', async (req, res) => {
    try {
        const { student_email, new_password } = req.body;
        //Verifying JWT token
        jwt.verify(student_email, JWT_KEY, async (err, decoded) => {
            if (err){
                console.log(err)
                return res.status(400).json({
                    success: 0,
                    error: 'Invalid Code',
                });
            }
            console.log(decoded);
    
            //Hashing password
            const salt = bcrypt.genSaltSync(10);
            new_hashed_password = await bcrypt.hashSync(new_password, salt);
    
            //Updating password
            const sqlCheck = await Student.update(
                { student_password: new_hashed_password },
                { where: { student_email: student_email } }
            );

            if (sqlCheck == 0){
                return res.status(500).json({
                    success: 0,
                    error: 'Mail not registered',
                });
            }

            return res.status(200).json({
                success: 1,
                error: '',
            });
        });
    } 
    catch (err) {
        return res.status(500).json({
            success: 0,
            error: 'Database Connection Error',
            errorReturned: err,
        });
    }
});



router.get('/profile', verifyToken, async (req, res) => {
    try {
      const result = await Student.findOne({
        where: { student_id: req.user.student_id },
        attributes: [
          'student_first_name',
          'student_last_name',
          'student_profile_picture',
          'student_bio',
          'student_website_url',
          'student_linkedin_url',
          'student_facebook_url',
          'student_twitter_url',
          'student_github_url',
          'student_youtube_url',
        ],
      });
      return res.status(200).json({
        success: 1,
        result,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: 0,
        error: 'Unable to fetch data',
        errorReturned: error,
      });
    }
});
  
router.put('/profile', verifyToken, async (req, res) => {
    try {
      const values = JSON.parse(req.body.values);
      console.log(values);
  
      if (req.files && req.files.student_profile_picture) {
        const file = req.files.student_profile_picture;
        file.mv(`${process.env.FILE_UPLOAD_PATH_CLIENT}${file.name}`, (err) => {
          if (err)
            return res.status(500).json({
              success: 0,
              error: 'unable to upload thumbnail',
              errorReturned: JSON.stringify(err),
            });
          webp
            .cwebp(
              `${process.env.FILE_UPLOAD_PATH_CLIENT}${file.name}`,
              `${process.env.FILE_UPLOAD_PATH_CLIENT}${file.name.substr(
                0,
                file.name.lastIndexOf('.')
              )}.webp`,
              '-q 80'
            )
            .then(async (response) => {
              console.log(response);
              values.student_profile_picture = 'url of profile';
              console.log(values);
  
              const result = await Student.update(values, {
                where: { student_id: req.user.student_id },
              });
  
              return res.status(200).json({
                success: 1,
                result,
              });
            })
            .catch((err) => {
              console.log(err);
  
              return res.status(400).json({
                success: 0,
                error: 'Unable to update profile',
                errorReturned: err,
              });
            });
          console.log('profile pic uploaded');
        });
      } else {
        const result = await Student.update(values, {
          where: { student_id: req.user.student_id },
        });
  
        return res.status(200).json({
          success: 1,
          result,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: 0,
        error: 'Unable to update profile',
        errorReturned: error,
      });
    }
});

module.exports = router;
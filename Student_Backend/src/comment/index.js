const router=require("express").Router()
const verifyToken=require("../middleware/verify_token");
const Comment=require("../models/comment_table");
const {db}=require("../db/sql");

router.get('/:id', verifyToken,async(req,res,next)=>{
    try{
        let lesson=req.params.id;
        const sql=`SELECT
        c.comment_content,
        c.comment_img_url,
        c.chapter_id,
        c.lesson_id,
        c.session_id,
        s.student_id,
        c.student_id,
        c.customer_id,
        s.student_first_name,
        s.student_last_name
        FROM
        student_tables AS s INNER JOIN  comment_tables AS c ON c.student_id=s.student_id
        WHERE
        c.student_id=${req.user.student_id}
        AND
        c.lesson_id=${lesson}
        ORDER BY c.updatedAt DESC
        `
        
        const result=await db.query(sql,{type:db.QueryTypes.SELECT});
        
        return res.status(200).json({
            sucess:1,
            result
        });

    }
    catch (e){
        console.log(e);
        res.status(200).json({
            msg:"Unable to get data",
            err:e
        })
    }
})

router.post('/',verifyToken, async(req,res,next)=>{
    try {
        console.log(req.files.file);
        if (!req.files || !req.files.file)
          return res.status(400).json({
            success: 0,
            error: 'Please Provide Some Attachment',
        });
    
        console.log("Body",req.body);
        if (!req.body.session_id)
          return res.status(400).json({
            success: 0,
            error: 'Provide comments and customer_id',
        });
  

        const file = req.files.file;

        const bData = await db.query(
            `SELECT customer_storage_zone_password,customer_storage_zone_name FROM customer_tables WHERE customer_id=${req.body.customer_id} `,
            { type: db.QueryTypes.SELECT }
        );
        console.log(bData);
  
    if (req.files && file) {
        const file = req.files.file;
        file.mv(`./${FILE_UPLOAD_PATH_CLIENT}/${file.name}`, async(err) => {
          if (err)
            return res.status(500).json({
              success: 0,
              error: 'unable to upload thumbnail',
              errorReturned: JSON.stringify(err),
            });
            newpath=`./upload/${file.name}`
                
            const url =  `https://storage.bunnycdn.com/${bData[0].customer_storage_zone_name}/student_profile_pic/${file.name}`;

            console.log(url)
            const options = {
                method: 'PUT', 
                headers: {'Content-Type': 'application/octet-stream', 'AccessKey': bData[0].customer_storage_zone_password},
                body: fs.createReadStream(newpath)
            };

            fetch(url, options)
            .then(res => res.json())
            .then(json =>{
                console.log(json)
                // const commands=  cmd.runSync(`
                //   sudo rm -r ./upload/${file.name}
                //   `)
                //   console.log(commands);
                })
            .catch(err => console.error('error:' + err));


            const {
                comment_content,
                chapter_id,
                lesson_id,
                session_id,
                customer_id
            }=req.body.values;
        
            const student_id=req.user.student_id
        
            try{
                const result=await Comment.create({
                    comment_content,
                    comment_img_url:`https://${bData[0].customer_storage_zone_name}.b-cdn.net/handouts/${file.name}`,
                    chapter_id,
                    lesson_id,
                    session_id,
                    customer_id,
                    student_id 
                })
                return res.status(200).json({
                    success:1,
                    result
                })
            }
            catch (e){
                res.status(401).send({
                    message:"Unbale to add the comment details",
                    err:e
                })   
            }
         
  
            return res.status(400).json({
                success: 0,
                error: 'Unable to update comment picture',
                errorReturned: err,
              });
            });
          console.log('Comment pic uploaded');
  
      } else {
  
        return res.status(500).json({
          success: 0,
          result:"Unable to upload file",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: 0,
        error: 'Unable to comment picture',
        errorReturned: error,
      });
    }

})

module.exports=router
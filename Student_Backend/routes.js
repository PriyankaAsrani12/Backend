const router = require('express').Router();
const {User}=require('./src/models/customer_table');

router.use('/auth', require('./src/login_signup'));
router.use('/sessions', require('./src/sessions'));
//router.use('/blog', require('./src/blog'));
router.use('/courses', require('./src/courses'));
router.use('/referal', require('./src/referrel'));
router.use('/mycourses', require('./src/my_courses'));
//router.use('/cart', require('./src/cart'));
//router.use('/affiliates', require('./src/affiliate'));
router.use("/info",require("./src/info"));
router.use("/comment",require("./src/comment"));

router.get('/clientDetails/:id',async(req,res)=>{
    customer_id=req.params.id
  
    sqlCheck = await User.findOne({
      where: {
        customer_id,
      },
      attributes:['customer_institute_name']
    });
  
    if (!sqlCheck) {
      return res.status(404).json({
        success: 0,
        error: 'Client not registered',
      });
    }else{
      return res.json(sqlCheck.dataValues)
    }
})
module.exports = router;
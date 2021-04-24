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
    const {
        comment_content,
        comment_img_url,
        chapter_id,
        lesson_id,
        session_id,
        customer_id
    }=req.body.values;
    const student_id=req.user.student_id

    try{
        const result=await Comment.create({
            comment_content,
            comment_img_url,
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
})

module.exports=router
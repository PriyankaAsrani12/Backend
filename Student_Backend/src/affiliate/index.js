const router = require('express').Router();
const verifyToken = require('../middleware/verify_token');
const { db } = require('../db/sql');

router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                course_name,
                affiliate_brought_student_name,
                affiliate_brought_student_id,
                affiliate_purchase_status,
                affiliate_rewards_given
                FROM affiliate_tables WHERE student_id=${req.user.student_id}`,
            { type: db.QueryTypes.SELECT }
        );

        const emailContactData = async () => {
            const finalData = [];
            for (let i = 0; i < result.length; i++) {
                const data = await db.query(
                    `SELECT student_email,student_phone_number FROM student_tables 
                                WHERE student_id=${result[i].affiliate_brought_student_id};
                            `,
                    { type: db.QueryTypes.SELECT }
                );
                console.log(data);
                finalData.push(data[0]);
            }
            return finalData;
        };
        const sData = await emailContactData();

        const finalResult = result.map((doc, index) => {
            return {
                affiliate_brought_student_name: doc.affiliate_brought_student_name,
                course_name: doc.course_name,
                affiliate_brought_student_id: doc.affiliate_brought_student_id,
                affiliate_purchase_status: doc.affiliate_purchase_status,
                affiliate_rewards_given: doc.affiliate_rewards_given,
                student_email: sData[index].student_email,
                student_phone_number: sData[index].student_phone_number,
            };
        });

        return res.status(200).json({
            success: 1,
            finalResult,
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: 0,
            error: 'Unable to fetch data',
            errorReturned: error,
        });
    }
});

module.exports = router;

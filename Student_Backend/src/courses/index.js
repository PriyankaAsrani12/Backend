const router = require('express').Router();
const verifyToken = require('../middleware/verify_token');
const { db } = require('../db/sql');
const Course = require('../models/purchase_table');

router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                session_tables.session_name, 
                session_tables.session_id, 
                session_tables.session_thumbnail,
                session_tables.session_tagline,
                session_tables.session_description,
                session_tables.session_fee,
                session_tables.session_tags
            FROM session_tables INNER JOIN student_purchases ON session_tables.session_id=student_purchases.session_id AND student_purchases.student_id=${req.user.student_id} `,
            { type: db.QueryTypes.SELECT }
        );
        if (!result){
            return res.status(400).json({
                success: 0,
                error: 'Unable to find courses',
            });
        }
        return res.status(200).json({
            success: 1,
            courses: result,
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            error: 'Unable to find courses',
            errorReturned: JSON.stringify(err),
        });
    }
});

module.exports = router;
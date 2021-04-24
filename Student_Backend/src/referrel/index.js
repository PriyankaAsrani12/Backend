const router = require('express').Router();
const { db } = require('../db/sql');
const verifyToken = require('../middleware/verify_token');
require('../models/referrel_link_table');
require('../models/session_table');

router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await db.query(
            `SELECT
            s.session_id,
            s.session_link , 
            s.session_name, 
            r.link_whatsapp,
            r.link_instagram,
            r.link_linkedIn,
            r.link_gmail
            FROM session_tables as s INNER JOIN referal_links as r
            ON
            s.session_id=r.session_id AND r.student_id=${req.user.student_id}`,
            { type: db.QueryTypes.SELECT }
        );
        console.log(result);
        if (!result){
            return res.status(400).json({
                success: 0,
                error: 'Unable to fetch details',
            });
        }
        return res.status(200).json({
            success: 1,
            result,
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            error: 'Unable to fetch referral link details',
            errorReturned: err,
        });
    }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const {JWT_KEY}=require('../../env');

const verifyToken = (req, res, next) => {
    if (!req.headers.cookie)
        return res.status(401).send('You are not logged in');
    try {
        const token=req.headers.cookie.split('=')[1] ;
        const verified = jwt.verify(token, JWT_KEY);
        console.log(verified)
        if (!verified.student_id)
        return res.status(403).json({
            success: 0,
            error: 'Invalid Token',
        });
        req.user = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: 0,
            error: 'Invalid Token',
        });
    }
};

module.exports = verifyToken;
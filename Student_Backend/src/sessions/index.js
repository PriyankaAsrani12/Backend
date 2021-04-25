const router = require('express').Router();
const verifyToken = require('../middleware/verify_token');
const { db } = require('../db/sql');

//Route to fetch recorded session
router.get('/', verifyToken, async (req, res) => {
    try {
        //Fetching customer_id from students table
        const customer = await db.query(
            `SELECT customer_id FROM student_tables WHERE student_id=${req.user.student_id}`,
            { type: db.QueryTypes.SELECT }
        );
        const customer_id = customer[0].customer_id;

        //Fetching session details using customer_id
        const result = await db.query(
            `SELECT session_id,session_name,session_tagline,session_tags,session_fee,session_thumbnail FROM session_tables WHERE customer_id=${customer_id}  AND session_type="Recorded"`,
            { type: db.QueryTypes.SELECT }
        );

        return res.status(200).json({
            success: 1,
            sessions: result,
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            error: 'Unable to find sessions',
            errorReturned: JSON.stringify(err),
        });
    }
});

//Route to fetch live session
router.get('/live', verifyToken, async (req, res) => {
    try {
        //Fetching customer_id from students table
        const customer = await db.query(
            `SELECT customer_id FROM student_tables WHERE student_id=${req.user.student_id}`,
            { type: db.QueryTypes.SELECT }
        );
        const customer_id = customer[0].customer_id;

        //Fetching session details using customer_id
        const result = await db.query(
        `SELECT session_id,session_name,session_description,session_tagline,session_tags,session_fee,session_thumbnail FROM session_tables WHERE customer_id=${customer_id} AND session_type="Live"`,
        { type: db.QueryTypes.SELECT }
        );

        return res.status(200).json({
            success: 1,
            sessions: result,
        });
    } 
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            error: 'Unable to find sessions',
            errorReturned: JSON.stringify(err),
        });
    }
});

//Fetching tutor details
router.get('/trainer/:id', verifyToken, async (req, res) => {
    try {
        let TrainerData;
        //If :id is customer_id
        if (req.params.id == 'customer_id') {
            //Fetching customer_if from students table
            const customer = await db.query(
                `SELECT customer_id FROM student_tables WHERE student_id=${req.user.student_id}`,
                { type: db.QueryTypes.SELECT }
            );

            //Fetching tutor details
            TrainerData = await db.query(
                `SELECT 
                customer_profile_picture as trainer_image_url,
                CONCAT(customer_first_name,customer_last_name) trainer_full_name,
                customer_occupation  as trainer_occupation,
                customer_phone_number as trainer_phone_number,
                customer_email as trainer_email,
                customer_first_name as trainer_address,
                customer_website_url as trainer_website_url,
                customer_linkedin_url  as trainer_linkedin_id,
                customer_twitter_url as trainer_twitter_id,
                customer_facebook_url as trainer_facebook_id,
                customer_linkedin_url as trainer_instagram_id,
                customer_career_summary  as trainer_career_summary,
                customer_first_name  as trainer_experience
                FROM customer_tables WHERE customer_id=${customer[0].customer_id}`,
                { type: db.QueryTypes.SELECT }
            );
            console.log(TrainerData[0])
        } 
        else {
            //If :id is not customer_id then fetch data from trainer_profiles table
            const sql14 = `SELECT * from trainer_profiles WHERE trainer_id=${req.params.id}`;
            TrainerData = await db.query(
                sql14, { type: db.QueryTypes.SELECT });

            console.log(TrainerData[0])
        }
        if (!TrainerData[0]){
            return res.status(400).json({
                success: 0,
                error: 'Unable to find trainer data',
            });
        }
        return res.status(200).json({
            success: 1,
            trainerData: TrainerData[0],
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: 0,
            error: 'Unable to find sessions',
            errorReturned: JSON.stringify(error),
        });
    }
});

//Fetching session details
router.get('/details/:id', verifyToken, async (req, res) => {
    try {
        if (!req.params.id){
            return res.status(400).json({
                success: 0,
                error: 'Session id not provided',
            });
        }
        const sql = `SELECT
        c.chapter_id,
        chapter_number,
        chapter_name,
        chapter_learnings,
        l.lesson_id,
        lesson_number,
        lesson_name ,
        lesson_video_id,
        lesson_assignment_id,
        lesson_quiz_id,
        lesson_handouts_id
        FROM  chapter_tables as c
        INNER JOIN lesson_tables as l
        ON c.session_id=l.session_id AND c.session_id=${req.params.id} AND c.chapter_id=l.chapter_id AND c.chapter_id=l.chapter_id`;

        const result = await db.query(sql, { type: db.QueryTypes.SELECT });
        if (!result)
        return res.status(400).json({
            success: 0,
            error: 'could not fetch details',
        });

        const sql2 = `SELECT session_id,session_name,customer_id,session_trainer_id,
        session_description,session_trainer_name,session_duration,session_fee,
        session_trainer_id,session_thumbnail,session_tagline
        from session_tables WHERE session_id=${req.params.id}`;
        const sessionData = await db.query(sql2, { type: db.QueryTypes.SELECT });

        if (!sessionData)
        return res.status(400).json({
            success: 0,
            error: 'Could not fetch session details',
        });
        let TrainerData;
        if (sessionData[0].session_trainer_id == 'customer_id') {
        TrainerData = await db.query(
            `SELECT
            customer_career_summary as trainer_career_summary,
            CONCAT(customer_first_name,' ',customer_last_name) as trainer_full_name,
            customer_occupation as trainer_occupation
            FROM customer_tables WHERE customer_id=${sessionData[0].customer_id}`,
            { type: db.QueryTypes.SELECT }
        );
        } else {
            const sql14 = `SELECT trainer_full_name,trainer_experience,trainer_career_summary,trainer_occupation FROM trainer_profiles WHERE customer_id=${sessionData[0].customer_id} AND trainer_id=${sessionData[0].session_trainer_id}`;
            TrainerData = await db.query(sql14, { type: db.QueryTypes.SELECT });
        }
        console.log(TrainerData[0])
        if (!TrainerData)
        return res.status(400).json({
            success: 0,
            error: 'Unable to find trainer data',
        });


        const sql3 = `SELECT item_id,item_name from library_items WHERE session_id=${req.params.id}`;
        const LibraryItems = await db.query(sql3, { type: db.QueryTypes.SELECT });

        const sql4 = `SELECT cart_item_status FROM cart_tables WHERE session_id=${req.params.id} AND student_id=${req.user.student_id}`;
        const status = await db.query(sql4, {
            type: db.QueryTypes.SELECT,
        });
        let cart_item_status = null;

        // check enrollment
        const sql5=`
        SELECT
        student_cart_items,
        student_wish_list_items
        FROM 
        student_tables
        WHERE
        student_id=${req.user.student_id}
        `
        const enrollment=await db.query(sql5,{
            type: db.QueryTypes.SELECT,
        })

        if (status && status[0] && status[0].cart_item_status){
            cart_item_status = status[0].cart_item_status;
        }

        // course content
        const ans = [];

        const getIndex = (doc) => {
            for (let i = 0; i < ans.length; i++)
                if (ans[i].chapter_number === doc.chapter_number) return i;
            return -1;
        };

        const getItemName = (item_id) => {
        for (let i = 0; i < LibraryItems.length; i++)
            if (LibraryItems[i].item_id == item_id) {
                console.log(LibraryItems[i], LibraryItems[i].item_name);
                return LibraryItems[i].item_name;
            }
        };

        result.forEach((doc) => {
        const index = getIndex(doc);
        if (index === -1) {
            const lessons = {
                id: doc.lesson_number,
                lesson_id: doc.lesson_id,
                name: doc.lesson_name,
                video: getItemName(doc.lesson_video_id),
                assignment: getItemName(doc.lesson_assignment_id),
                quiz: doc.lesson_quiz_id,
                thumbnail: doc.session_thumbnail,
                handouts: getItemName(doc.lesson_handouts_id),
            };
            ans.push({
                chapter_id: doc.chapter_id,
                chapter_number: doc.chapter_number,
                learning: doc.chapter_learnings,
                name: doc.chapter_name,
                lesson: [lessons],
            });
        } else {
            ans[index].lesson.push({
                id: doc.lesson_number,
                lesson_id: doc.lesson_id,
                name: doc.lesson_name,
                video: getItemName(doc.lesson_video_id),
                assignment: getItemName(doc.lesson_assignment_id),
                quiz: doc.lesson_quiz_id,
                thumbnail: getItemName(doc.lesson_handouts_id),
            });
        }
        });

        //sort chapters
        ans.sort((a, b) => a.chapter_number - b.chapter_number);
        // Sort lessons
        ans.forEach((doc) => doc.lesson.sort((a, b) => a.id - b.id));

        const chapter_learnings = ans.map((doc) => doc.learning);
        const session = sessionData[0];
        session.chapter_learnings = chapter_learnings;

        console.log(sessionData[0])
        console.log(ans)
        
        return res.status(200).json({
            success: 1,
            session: sessionData[0],
            trainerData: TrainerData[0],
            ans,
            //enrollment,
        });
    }
  
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: 0,
            error: 'Unable to fetch details',
            errorReturned: err,
        });
    }
});
module.exports = router;
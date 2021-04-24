const router = require('express').Router();
const verifyToken = require('../middleware/verify_token');
const { db } = require('../db/sql');

router.get('/:id', verifyToken, async (req, res) => {
    try {
        if (!req.params.id){
            return res.status(500).json({
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
        
        if (!result){
            return res.status(500).json({
                success: 0,
                error: 'Could not fetch details',
            });
        }

        const sql2 = `SELECT * from session_tables WHERE session_id=${req.params.id}`;
        const sessionData = await db.query(sql2, { type: db.QueryTypes.SELECT });

        if (!sessionData)
        return res.status(400).json({
            success: 0,
            error: 'could not fetch details',
        });
        const sql3 = `SELECT item_id,item_name,item_url from library_items WHERE session_id=${req.params.id}`;
        const LibraryItems = await db.query(sql3, { type: db.QueryTypes.SELECT });

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

        const getItemUrl = (item_id) => {
        for (let i = 0; i < LibraryItems.length; i++)
            if (LibraryItems[i].item_id == item_id) {
            return LibraryItems[i].item_url;
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

            videoUrl: getItemUrl(doc.lesson_video_id),
            assignmentUrl: getItemUrl(doc.lesson_assignment_id),
            quizUrl: doc.lesson_quiz_id,
            thumbnailUrl: doc.session_thumbnail,
            handoutsUrl: getItemUrl(doc.lesson_handouts_id),
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

            videoUrl: getItemUrl(doc.lesson_video_id),
            assignmentUrl: getItemUrl(doc.lesson_assignment_id),
            quizUrl: doc.lesson_quiz_id,
            thumbnailUrl: doc.session_thumbnail,
            handoutsUrl: getItemUrl(doc.lesson_handouts_id),
            });
        }
        });

        //sort chapters
        ans.sort((a, b) => a.chapter_number - b.chapter_number);
        // Sort lessons
        ans.forEach((doc) => doc.lesson.sort((a, b) => a.id - b.id));

        return res.status(200).json({
        success: 1,
        sessionData: sessionData[0],
        ans,
        id:req.params.id
        });
    } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      error: 'Unable to fetch details',
      errorReturned: err,
    });
  }
});
module.exports = router;

const express = require('express');
const {PORT} = require('./env');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mysql = require('mysql');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

require('./src/db/sql');


const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());

app.use(morgan('dev'));

//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Swagger initialization
const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Student Backend',
            description: 'Student Backend Documentation',
            contact: {
                name: "Priyanka Asrani",
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs-student", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Swagger definition

/**
 * @swagger
 * /student/auth/register:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Registering student
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Registering student
 *        required: true
 *        example: {"values":{"student_first_name":"test","student_last_name":"test","student_phone_number":0123456789,"student_email":"testt@testt.testt","student_password":"12345678","customer_id":1}}
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /student/auth/login:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Logging in student
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Logging in student
 *        required: true
 *        example: {"values":{"student_email":"testt@testt.testt","student_password":"12345678"}}
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /student/auth/logout:
 *  get:
 *      tags:
 *      - Authentication
 *      description: Logging out student
 *      responses:
 *         '200':
 *              description: Logging out student
 */

/**
 * @swagger
 * /student/auth/forgotPassword:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Emailing password reset
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Emailing password reset
 *        required: true
 *        example: {"values":{"student_email":"testt@testt.testt"}}
 *    responses:
 *      '200':
 *        description: successful operation
 */

/**
 * @swagger
 * /student/auth/resetPassword:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Password reset
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Password reset
 *        required: true
 *        example: {"values":{"student_email":"testt@testt.testt","new_password":"01234"}}
 *    responses:
 *      '200':
 *        description: successful operation
 */


/**
 * @swagger
 * /student/auth/profile:
 *  get:
 *      tags:
 *      - Student profile
 *      description: Student Profile
 *      responses:
 *         '200':
 *              description: Student Profile
 */

/**
 * @swagger
 * /student/sessions/:
 *  get:
 *      tags:
 *      - All courses
 *      description: Fetching all courses
 *      responses:
 *         '200':
 *              description: Fetching all courses
 */


/**
 * @swagger
 * /student/sessions/live:
 *  get:
 *      tags:
 *      - All courses
 *      description: Fetching all live courses
 *      responses:
 *         '200':
 *              description: Fetching all live courses
 */



/**
 * @swagger
 * /student/sessions/trainer/{id}:
 *  get:
 *      description: fetching tutor details
 *      tags:
 *      - Trainer profile
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Tutor id
 *        required: true
 *        type: string
 *        example: 1
 *      responses:
 *         '200':
 *              description:  fetching tutor details
 */

/**
 * @swagger
 * /student/sessions/details/{id}:
 *  get:
 *      description: fetching session details
 *      tags:
 *      - Session details
 *      parameters:
 *      - name: id
 *        in: path
 *        description: session id
 *        required: true
 *        type: string
 *        example: 1
 *      responses:
 *         '200':
 *              description:  fetching session details
 */

/**
 * @swagger
 * /student/courses/:
 *  get:
 *      description: fetching purchased session details
 *      tags:
 *      - Session details
 *      responses:
 *         '200':
 *              description:  fetching purchased session details
 */

/**
 * @swagger
 * /student/referal/:
 *  get:
 *      description: fetching referel link details
 *      tags:
 *      - Referel link
 *      responses:
 *         '200':
 *              description:  fetching referel link details
 */


/**
 * @swagger
 * /student/mycourses/{id}:
 *  get:
 *      description: fetching courses purchased by student
 *      tags:
 *      - Student courses
 *      parameters:
 *      - name: id
 *        in: path
 *        description: session id
 *        required: true
 *        type: string
 *        example: 1
 *      responses:
 *         '200':
 *              description:  fetching courses purchased by student
 */

/**
 * @swagger
 * /student/affiliates/:
 *  get:
 *      description: fetching affiliate details
 *      tags:
 *      - Affiliate
 *      responses:
 *         '200':
 *              description:  fetching affiliate details
 */

/**
 * @swagger
 * /student/info/to_from:
 *  get:
 *      description: fetching student and customer details
 *      tags:
 *      - Info
 *      responses:
 *         '200':
 *              description:  fetching student and customer details
 */

/**
 * @swagger
 * /student/comment/{id}:
 *  get:
 *      description: fetching comments
 *      tags:
 *      - Comments
 *      parameters:
 *      - name: id
 *        in: path
 *        description: lesson id
 *        required: true
 *        type: string
 *        example: 1
 *      responses:
 *         '200':
 *              description: fetching comments
 */




app.use('/student', require('./routes'));

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}...`));
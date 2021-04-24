//Importing all dependencies
const express=require("express");
const bodyParser=require("body-parser");
require('./src/db/sql');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const{ACCESS_TOKEN_SECRET,PORT}=require('./env');
const routes=require('./src/routes/routes');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const app=express();

//Middleware
app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'Email API',
            description: 'Email API Documentation',
            contact: {
                name: "Priyanka Asrani",
            },
            servers: ["http://localhost:5000"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /email/{code}:
 *  get:
 *      description: Various email APIs
 *      tags:
 *      - Email
 *      parameters:
 *      - name: code
 *        in: path
 *        description: JWT code
 *        required: true
 *        type: string
 *        example: Mailgun-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0byI6Im5vbmVub25lMzY3NkBnbWFpbC5jb20iLCJmcm9tIjoicHJpeWFua2Fhc3JhbmkwMTIzNEBnbWFpbC5jb20iLCJzZW5kZXJfbmFtZSI6Im95ZXN0ZXJzX3RyYWluaW5nIiwic3ViamVjdCI6IlRyaWFsIiwiYm9keSI6IlRoaXMgaXMgdHJpYWwgYm9keSIsIm1ldGhvZCI6Im1haWxndW4iLCJzZW5kZXJfaWQiOjIsImN1c3RvbWVyX2lkIjoyfQ.uUZSMawPhdHBCAhxwfCD17ZRKUr_ovyKnyNMdiQGp-4
 *                 Sendgrid-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0byI6Im5vbmVub25lMzY3NkBnbWFpbC5jb20iLCJmcm9tIjoiaW5mb0BveWVzdGVycy5pbiIsInNlbmRlcl9uYW1lIjoib3llc3RlcnNfdHJhaW5pbmciLCJzdWJqZWN0IjoiVHJpYWwiLCJib2R5IjoiVGhpcyBpcyB0cmlhbCBib2R5IiwibWV0aG9kIjoic2VuZGdyaWQiLCJzZW5kZXJfaWQiOjIsImN1c3RvbWVyX2lkIjoyfQ.uI4j63cN-J0bStp5Ohv4nsFMvaOgPG5bAGBRQiPgGYI
 *                 Zoho-eyJhbGciOiJIUzI1NiJ9.eyJ0byI6Im5vbmVub25lMzY3NkBnbWFpbC5jb20iLCJmcm9tIjoidHJhaW5tYWlsQG95ZXN0ZXJzLmluIiwic2VuZGVyX25hbWUiOiJveWVzdGVyc190cmFpbmluZyIsInN1YmplY3QiOiJUcmlhbCIsImJvZHkiOiJUaGlzIGlzIHRyaWFsIGJvZHkiLCJtZXRob2QiOiJkZWZhdWx0Iiwic2VuZGVyX2lkIjoyLCJjdXN0b21lcl9pZCI6Mn0.jxnd3DMpaFJmJSbUxaNB0iZNUGIbku-2vSnfDt2-XBE
 *      responses:
 *         '200':
 *              description: Successfully sent email
 */
//Using routes
app.use('/', routes)

app.listen(5000,()=>{
    console.log("Server Started");
});
//You can delete this
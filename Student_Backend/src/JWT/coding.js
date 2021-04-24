//Importing dependencies
const jwt=require("jsonwebtoken");
const{JWT_KEY}=require('../../env');

const codingJWT = (token) => 
{
    console.log("Encrypting data...");

    const encryptedData = jwt.sign(
        token,
        JWT_KEY,
        { expiresIn: '1d',}
    );

    return encryptedData
};

module.exports=codingJWT;
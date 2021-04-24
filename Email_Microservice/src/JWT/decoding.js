const jwt=require("jsonwebtoken");
const{ACCESS_TOKEN_SECRET}=require('../../env');

err_key="";

const decodingJWT = (token) => 
{
    console.log("Decrypting data...");
    jwt.verify(token,ACCESS_TOKEN_SECRET,(err,res)=>{
        if(err){
            console.log("Access key doesn't match");
            err_key="yes";
        }
    })
    if(err_key=="yes"){
        return null
    }
    if(token !== null || token !== undefined){
        const base64String = token.split(".")[1];
        const decodedValue = JSON.parse(Buffer.from(base64String,    
                            "base64").toString("ascii"));
        return decodedValue;
    }
    return null;
};

module.exports=decodingJWT;
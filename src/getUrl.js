const express = require("express");
const serverless = require("serverless-http");
const alexColectionAPI = express();
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const https = require("https");
const nodemailer = require("nodemailer")

alexColectionAPI.use(bodyParser.json());
alexColectionAPI.use(bodyParser.urlencoded({ extended: true }));

alexColectionAPI.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



router.get("/*",function(request,response){
    url= request.originalUrl.toString();
    for(var i=url.length;i>0;i--){
        aux=url.substring(i,url.length);
        if(aux.includes("/getUrl/")){
            url=url.substring(i+8,url.length);
            break;
        }
    }
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const instance = axios.create({
        httpsAgent: new https.Agent({  
          rejectUnauthorized: false
        })
      });
    instance.get(url)
    .then(body=>{
        response.write(body.data.toString());
        response.end();
    })

});


alexColectionAPI.use("/.netlify/functions/getUrl",router);

module.exports.handler = serverless(alexColectionAPI);


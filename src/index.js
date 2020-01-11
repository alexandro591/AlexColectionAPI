const express = require("express");
const serverless = require("serverless-http");
const alexColectionAPI = express();
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const nodemailer = require("nodemailer")

alexColectionAPI.use(bodyParser.json());
alexColectionAPI.use(bodyParser.urlencoded({ extended: true }));

alexColectionAPI.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'notifymelocalhost@gmail.com', // generated ethereal user
      pass: 'elhuevo591' // generated ethereal password
    }
  });

router.get("/",function(request,response){
    transporter.sendMail({
        from: 'notifymelocalhost@gmail.com',
        to: 'alexandrotapiaflores@gmail.com',
        subject: 'notifymelocalhost@gmail.com',
        text: 'hola mundo'
    }, function(error, info) {
    	if (error) {
    		callback(error);
    	} else {
    		callback(null, {
			    statusCode: 200,
			    body: "Ok"
	    	});
    	}
    });
    response.write("hola mundo");
    response.end();
});


alexColectionAPI.use("/.netlify/functions/index",router);

module.exports.handler = serverless(alexColectionAPI);


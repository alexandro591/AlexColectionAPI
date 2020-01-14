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



router.get("/",function(request,response){
    axios.get("https://sistemaunico.ant.gob.ec:5038/PortalWEB/paginas/clientes/clp_grid_citaciones.jsp?ps_tipo_identificacion=CED&ps_identificacion=1500655533&ps_placa=")
    .then(body=>{
        response.write(body.data)
        response.end();
    })
});


alexColectionAPI.use("/.netlify/functions/index",router);

module.exports.handler = serverless(alexColectionAPI);


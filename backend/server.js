var http = require('http');
var express = require('express');
var nodemailer = require("nodemailer");
var app=express();
var serverVars = require('./serverVars');
var fs = require('fs');

var generator = require('xoauth2').createXOAuth2Generator({
    user: serverVars.mySendingEmail,
    clientId: serverVars.kfwebsiteClientId,
    clientSecret: serverVars.kfwebsiteClientSecret,
    refreshToken: serverVars.kfwebsiteRefreshToken,
});

app.get('/',function(request,response) {
    response.sendfile('../html/main.html');
});

app.get('/send',function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    var mailOptions = {
        from: serverVars.mySendingEmail,
        to: serverVars.myEmail,
        subject : request.query.subject,
        text : request.query.text
    }
    var content = "FROM: " + request.query.name + "\n" + "EMAIL: " + request.query.email + "\n" + mailOptions.text;
    mailOptions.text = content;

    // login
    var transporter = nodemailer.createTransport(({
        service: 'gmail',
        auth: {
            xoauth2: generator
        }
    }));
    //send mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            response.end("error");
        }else{
            console.log("Message sent: " + info.response);
            response.end("sent");
        }
        transporter.close();
    });
});

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});
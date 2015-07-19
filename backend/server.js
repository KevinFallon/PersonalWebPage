var http = require('http');
var express = require('express');
var nodemailer = require("nodemailer");
var app=express();
var serverVars = require('./serverVars');
// var myServer = http.createServer(function (request, response) {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Hello World\n');
// }).listen(8124, "127.0.0.1");

// console.log('Server running at http://127.0.0.1:8124/');

// myServer.on('connection', function (stream) {
//   console.log('someone connected!');
// });

// function httpRequestTest(callback) {
// 	return http.get({})
// }

console.log(serverVars.myUser);
// console.log(serverVars);
var generator = require('xoauth2').createXOAuth2Generator({
    user: serverVars.myUser,
    clientId: serverVars.myClientId,
    clientSecret: serverVars.myClientSecret,
    refreshToken: serverVars.myRefreshToken,
});

// listen for token updates
// you probably want to store these to a db
// generator.on('token', function(token){
//     console.log('New token for %s: %s', token.user, token.accessToken);
// });

app.get('/',function(request,response) {
    response.sendfile('../html/main.html');
});

app.get('/send',function(request,resonse){
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
            //resp.end("error");
        }else{
            console.log("Message sent: " + info.response);
            //resp.end("sent");
        }
    });
});

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});


// // send mail
// transporter.sendMail({
//     from: 'kevinfallonwebsite@gmail.com',
//     to: 'kfallon2010@gmail.com',
//     subject: mailOptions.subject,
//     text: mailOptions.text
// });
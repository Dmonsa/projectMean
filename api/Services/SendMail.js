'use strict'
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

exports.sendMail = function () {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "dmonsac@gmail.com",
            pass: "1036641754dmc"
        },
        tls: {
            rejectUnauthorized: false
        }

    })

    var mailOptions = {
        from: 'dmonsac@gmail.com',
        to: 'dmonsac@gmail.com',
        subject: 'Initial Meeting',
        text: 'The initial meeting is on Tuesday, June 5 at 10:00 a.m. Join the link https://www.skype.com/en/'
    }

    transporter.sendMail(mailOptions, function (err, res) {
        console.log("Entro a la funcion enviar email");
        if (err) {
            console.log(err);
        }
        else {
            console.log('Sent Email');
        }
    })
}
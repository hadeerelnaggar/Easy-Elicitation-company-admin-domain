var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports.sendToNewAdmin = function (email,subject,text) {
  
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'EasyElicitationtTest@gmail.com',
            pass: 'test123test'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: 'hadeerelnaggar98@gmail.com',
        to: email,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions,function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent');
        }
    });

}
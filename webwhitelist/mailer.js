const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    sercure: false,
    secureConnection: true,
    auth: {
        user: "2631129440@qq.com",
        pass: "awsrreanwdgseaih",
    }
});

function sendVerificationEmail(receiver, code) {
    const mailOptions = {
        from: '2631129440@qq.com',
        to: receiver,
        subject: 'Verify Your Email',
        text: `Your verification code is: ${code}`
    };

    return mailTransport.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };

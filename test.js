const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "nxwang00@gmail.com",
        pass: "suycpzjcuopcrjkl"
    }
});

var mailOptions = {
    from: '"Example Team" <nxwang00@gmail.com',
    to: 'logos106@outlook.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer 😉 ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});
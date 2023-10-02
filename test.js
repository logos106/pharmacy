
nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp2go.com',
    port: 2525,
    auth: {
        user: 'nxwang',
        pass: '5DFCT8sVyn32FVg9'
    }
});

async function main() {
    // send email
    await transporter.sendMail({
        from: 'logos106@outlook.com',
        to: 'nxwang00@gmail.com',
        subject: 'Test Email Subject',
        html: '<h1>Example HTML Message Body</h1>'
    });
}

main().catch(console.error);


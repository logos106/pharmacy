require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

db = require("../models");

module.exports = {
  create,
  authenticate,
  logout
};

async function authenticate({ email, password }) {
  const user = await db.User.scope('withPassword').findOne({
    where: { email },
  });

  if (!user) throw '1'; //'Email Address does not exist.';
  if (!user.isActive) throw '2'; //'Administrator did not allow you yet.';
  if (!(await bcrypt.compare(password, user.password)))
    throw '3'; //'Password is incorrect';

  // authentication successful
  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  user.token = token;
  await user.save();

  return { ...omitPassword(user.get()), token };
}

function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

async function create(params) {
  if (
    await db.User.findOne({
      where: { email: params.email },
    })
  )
    throw '1'; //'This Email Address is already taken.';
    
  params.password && (params.password = await bcrypt.hash(params.password, 10));
  
  // save user
  const user = await db.User.create(params);
  
  // Send confirmation email
  await sendConfirmationEmail();

}

async function sendConfirmationEmail(){
    // generate token and save
    var token = new db.Token({ userID: user._id, token: crypto.randomBytes(16).toString('hex') });
    token.save(function (err) {
      if(err) {
          return res.status(500).send({msg:err.message});
      }
  
      // Send email (use verified sender's email address & generated API_KEY on SendGrid)
      const transporter = nodemailer.createTransport(
          sendgridTransport({
              auth:{
                  api_key:'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',
              }
          })
      )
      var mailOptions = { from: 'gerardkasemba@gmail.com', to: user.email, subject: 'Account Verification Link', text: 'Hello '+ req.body.name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
      transporter.sendMail(mailOptions, function (err) {
          if (err) { 
              return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
          }
          return res.status(200).send('A verification email has been sent to ' + user.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
      })
    })
}

async function logout(email) {
  const user = await db.User.scope('withPassword').findOne({
    where: { email },
  });

  user.token = ''
  await user.save();
}
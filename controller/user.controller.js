require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
  
db = require("../models");

module.exports = {
  create,
  confirm,
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

async function create(req) {
  const params = req.body
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
  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  user.token = 'token';
  user.save();
  
  const to = params.email;
  const subject = 'Account Verification Link';
  const text = 'Hello, ' + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/user/confirmation\/' + user.email + '\/' + token + '\n\nThank You!\n'
  
  const rv = await sendEmail(to, subject, text);
  if (rv == 'success')
    return 1;
  else
    throw '2'
}

async function sendEmail(to, subject, text) {
  const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "nxwang00@gmail.com",
          pass: "suycpzjcuopcrjkl"
      }
  });
  
  var mailOptions = {
      from: '"Pharmacy administrator" <nxwang00@gmail.com',
      to: to,
      subject: subject,
      text: text,
      html: '<p>' + text + ' </p>'
  };
    
  transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          return 'failure'
      }
      return 'success'
  });
}

async function confirm(params) {
  db.User.findOne({ email: params.email, token: params.token }, function (err, user) {
    // token is not found into database i.e. token may have expired 
    if (!user)
      throw '1'; // Invalid email or token
    
    // Check if not expired
    const token = user.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const expiresAt = decoded.getExpiresAt();
    if (!expiresAt.before(new Date()))
      throw '3';  // Token expired

    // user is already verified
    if (user.isVerified)
      throw '2'; // Already verified
        
    user.isVerified = true;
    user.save(function (err) {
      // error occur
      if(err)
          throw '3'

      // account successfully verified
      return 1;
    });
  });
}

async function logout(email) {
  const user = await db.User.scope('withPassword').findOne({
    where: { email },
  });

  user.token = ''
  await user.save();
}
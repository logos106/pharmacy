const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
  
const test = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ "msg": "ok" });  
});

module.exports = {
  test
};

const bcrypt = require('bcryptjs');

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
  const text = 'Hello, ' + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/user/confirm\/' + user.email + '\/' + token + '\n\nThank You!\n'
  
  const rv = await sendEmail(to, subject, text);
  console.log(rv)
  if (rv == 'success')
    return 1;
  else
    throw '2'
}

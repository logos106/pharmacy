require("dotenv").config();
const jwt = require('jsonwebtoken');

const token = jwt.sign({ sub: 'user.id', email: 'user.email' }, 'hellosecret', {
    expiresIn: '7d',
});

console.log(token)

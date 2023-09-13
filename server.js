const express = require('express');
const router = express.Router();
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

router.use('/user', require('./routes/user.routes'));
app.use("/api", router);

const port = 4000; //process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
app.listen(port, () => console.log('Pharmacy backend is listening on port' + port));
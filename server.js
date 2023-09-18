const express = require('express');
const routes = require('./routes/v1');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const { errorConverter, errorHandler } = require('./middlewares/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.use("/api", routes);

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => console.log('Pharmacy backend is listening on port' + port));
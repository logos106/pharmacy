const express = require('express');
const path = require("path");
const routes = require('./server/routes/v1');
const cors = require('cors');
const passport = require('passport');
const { jwtStrategy } = require('./server/config/passport');
const app = express();
const bodyParser = require("body-parser");
const { errorConverter, errorHandler } = require('./server/middlewares/error');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Routes for backend API
app.use("/api", routes);

// convert error to ApiError, if needed
app.use(errorConverter);
app.use(errorHandler);

// For client static files
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT;
app.listen(port, () => console.log('Pharmacy backend is listening on port' + port));
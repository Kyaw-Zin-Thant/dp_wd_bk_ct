const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const glob = require('glob');
const { checkToken } = require('./controllers/middleware.controller');
const { config } = require('./config/config');
const { errorHandler } = require('./services/error.handler.service');

//db connection
mongoose.Promise = global.Promise;
const { user, pass, dbName, dbPort, host } = config.db;
const mongooseOption = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    sslValidate: false,
};
let encodepassword = encodeURIComponent(pass);

mongoose.connect(
  `mongodb://${host}:${encodepassword}@${user}:${dbPort}/${dbName}`,
  mongooseOption
);

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error:${err}`);
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'AUTHORIZATION, Origin, X-Requested-With, Content-Type, Accept, USERNAME, PASSWORD, APIKEY, SECRETKEY, API_KEY, SECRET_KEY, OWNERID, BookID, File,USERACCESSTOKEN'
  );
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//miidleware
app.use(checkToken);

app.use('/public', express.static('public'));

const routes = glob.sync('./routes/*.js');
routes.forEach((route) => {
  require(route).default(app);
});
//error handling
app.use(errorHandler);

app.set('trust proxy', true);
app.listen(config.port, () => {
  console.log(`A NOde js API is listening in port:${config.port}`);
});
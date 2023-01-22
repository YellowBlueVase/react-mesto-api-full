const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const helmet = require('helmet');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
// const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralError = require('./errors/centralError');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

// app.use(helmet);
// app.use(limiter);
console.log('starting requestLogger');
app.use(requestLogger);
console.log('starting bodyParser1');
app.use(bodyParser.json());
console.log('starting bodyParser2');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('starting cookieParser');
app.use(cookieParser());
console.log('starting routerUsers');
app.use('/', routerUsers);
console.log('starting routerCards');
app.use('/', routerCards);
console.log('starting errorLogger');
app.use(errorLogger);
console.log('starting errors');
app.use(errors());
console.log('starting centralError');
app.use(centralError);
console.log('starting app.listen');

app.listen(PORT, () => {
});

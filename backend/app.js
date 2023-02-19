const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const helmet = require('helmet');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
// const limiter = require('./middlewares/limiter');
const centralError = require('./errors/centralError');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const options = {
  origin: [
    'localhost:3000',
    'http://kirill-mesto-cloud.nomoredomains.rocks',
    'https://kirill-mesto-cloud.nomoredomains.rocks',
    'http://api.kirill-mesto-cloud.nomoredomains.rocks',
    'https://api.kirill-mesto-cloud.nomoredomains.rocks',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
app.use('*', cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', routerUsers);
app.use('/', routerCards);
app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
});

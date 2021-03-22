const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const VideoLib = require('node-video-lib');

// const mongosanitize = require('express-mongo-sanitize');

const tourRouter = require('./routes/tourRoute');
const viewRouter = require('./routes/viewRoute');

dotenv.config({ path: 'config.env' });

const DB = process.env.DB.replace('<password>', process.env.password);

 //const DB = process.env.DB_LOCAL;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
// app.use(mongosanitize());

app.use(express.static(path.join(__dirname, '/public')));

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Database conection successful...');
  });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

app.use('/api/tour', tourRouter);

app.use('/', viewRouter);

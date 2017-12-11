const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/samplestore',{useMongoClient:true});
const db = mongoose.connection;

const app = express();

const categories = require('./routes/categories');

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/categories', categories);


// 404
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
  	error: {
  		message: error.message
  	}
  });

  //for us
  console.error(err);
});



//Start server
const port = app.get('port') || 3000;
app.listen(port, () => console.log('Server is running on port 3000'));
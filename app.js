var Twitter          = require('twitter');
var fs               = require('fs');
const express        = require('express');
const favicon        = require('serve-favicon');
const load           = require('express-load');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');

var app = express();

load('models').then('middleware').then("service").into(app);

var mongodb = app.middleware.mongodb;
var service = app.service.service;

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

mongodb.connect();
service.saveParlamentar();
service.getParlamentar();
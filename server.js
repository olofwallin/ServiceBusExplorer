// modules =================================================
var express = require('express');
var app = express();
var routes = require('./app/routes');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================

// environment variables

// config files
//var azureCfg = require('./config/azure');

// set our port
var port = process.env.PORT || 8080;

// set root path 
rootPath = __dirname;

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/app')); 

// routes ==================================================
//require('./app/routes')(app); // configure our routes
app.get('/', routes.index);

app.get('/api/queues', routes.queues);
app.get('/api/queue', routes.queue);
app.get('/api/queueMessage', routes.receiveQueueMessage);
app.post('/api/queueMessage', routes.createQueueMessage);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
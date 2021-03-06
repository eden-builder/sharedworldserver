
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , whitelist = 'whiskers75'
  , version = 'Beta 0.0.2'
  , fs = require('fs');

var app = express();


var write = function(msg, res) {
    res.write('null.eden\n');
    res.write(msg + '.name');
};

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) { 
    res.redirect('http://github.com/whiskers75/sharedworldserver');
});
app.get('/list2.php', function(req, res) {
    console.log('Eden ' + req.method + ' request');
    res.writeHead(200);
    if (req.query.search) {
        req.console = req.query.search.split(' ');
        console.log(req.console);
        if (req.console[0] == 'USER') {
                fs.stat('./public/users/' + req.console[1], function(err, stats) {
                    if (err) {
                        write('Error accessing userfile', res);
                    }
                    else {
                        if (stats.isFile()) {
                            write('Welcome back, ' + req.console[1], res);
                        }
                        else {
                            fs.appendFile('./public/users/' + req.console[1], '', function(err, response) {
                                if (err) {
                                    write('Error creating userfile', res);
                                }
                                else {
                                    write('New user created: ' + req.console[1], res);
                                }
                            });
                        }
                    }
                });
        }
    }
    else {
        res.write('null.eden\n');
        res.write("sharedworldserver by whiskers75 version " + version + ".name\n");
        res.write('null.eden\nPlease go to Search by name and enter command..name');
    }
    res.end();
});
app.post('/upload2.php', function(req, res) {
    res.writeHead(200);
    res.end();
    console.log(req.files);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

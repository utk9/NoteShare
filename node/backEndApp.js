var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var multiparty = require('multiparty');

var app = express();

// mongoose.connect("mongodb://localhost/UsersDB", function(err){
// 	if (err){
// 		console.log(err);
// 	} else {
// 		console.log('Connection Successful');
// 	}
// });

var noteSchema = new mongoose.Schema({
	poster: String,
	date: String,
	course: String,
	topic: String,
	filePaths: [String]
});

var Note = mongoose.model('Note', noteSchema);

app.get('/', function(req, res){
	res.writeHead(200, {'Content-type':'text/html'});
	fs.createReadStream("../index.html").pipe(res);
});

app.get('/modules/app.js', function(req, res){
	res.writeHead(200, {'Content-type':'text/javascript'});
	fs.createReadStream("../modules/app.js").pipe(res);
});

app.get('/controllers/:name', function(req, res){
	var name = req.params.name;
	res.writeHead(200, {'Content-type':'text/javascript'});
	fs.createReadStream("../controllers/"+name).pipe(res);
});

app.get('/views/:name', function (req, res) {
  var name = req.params.name;
  //res.render('partials/' + name);
  fs.createReadStream("../views/"+name).pipe(res);
});

app.listen(process.env.PORT || 8888);


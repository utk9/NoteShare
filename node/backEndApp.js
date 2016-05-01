var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var multiparty = require('multiparty');

var app = express();


app.use("/directives", express.static(__dirname + '/../directives'));
app.use("/services", express.static(__dirname + '/../services'));
app.use("/modules", express.static(__dirname + '/../modules'));
app.use("/controllers", express.static(__dirname + '/../controllers'));
app.use("/views", express.static(__dirname + '/../views'));
app.get("/", function(req, res){
	res.writeHead(200, {'Content-type':'text/html'});
	fs.createReadStream("../index.html").pipe(res);
})


mongoose.connect("mongodb://localhost/UsersDB", function(err){
	if (err){
		console.log(err);
	} else {
		console.log('Connection Successful');
	}
});

var noteSchema = new mongoose.Schema({
	poster: String,
	date: String,
	course: String,
	topic: String,
	filePaths: [String]
});

var Note = mongoose.model('Note', noteSchema);

//RESTful API:
app.get('/allNotes', function(req, res){
	Note.find(function(err, notes){
		if (err) {
			console.log(err);
		} else{
			res.send(notes);
		}
	});
});

app.post('/uploadData', function(req, res){
	var mPoster, mDate, mCourse, mTopic;
	var mfilePaths = [];
	var form = new multiparty.Form();
	form.on('field', function(name, value){
		if (name== "poster"){
			mPoster = value;
		} else if (name == "date"){
			mDate = value;
		} else if (name == "course"){
			mCourse = value;
		} else if (name == "topic"){
			mTopic = value;
		}
	});

	form.on('file', function(name, file){
		mfilePaths.push(file.path);
	});

	form.on('close', function() {
		var newNote = new Note({
			poster: mPoster,
			date: mDate,
			course: mCourse,
			topic: mTopic,
			filePaths: mfilePaths
		});
		newNote.save(function(err, newNote){
			if (err){
  				console.log("Error adding to database");
  			} else{
  				console.log("Added to database.");
  			}
		});
  		res.end("hello");
  	});

  	form.on('error', function(err){
  		console.log(err);
  	})
  	form.parse(req);
});

app.listen(process.env.PORT || 8888);


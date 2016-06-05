var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NoteShare' });
});

router.get(("/uploadedFiles/:name"), function(req, res){
	
	var name = req.params.name;
	var filePath = path.resolve("uploadedFiles");
	fs.readFile(filePath+'/'+name, function (err, content) {
		if (err) {
			res.writeHead(400, {'Content-type':'text/html'})
			console.log(err);
			res.end("No such file");    
		} else {
			res.writeHead(200);
			res.end(content);
		}
	});
	
});

router.get(("/uploadedImages/:name"), function(req, res){
	
	var name = req.params.name;
	var imagePath = path.resolve("uploadedImages");
	fs.readFile(imagePath+'/'+name, function (err, content) {
		if (err) {
			res.writeHead(400, {'Content-type':'text/html'})
			console.log(err);
			res.end("No such image");    
		} else {
			res.writeHead(200);
			res.end(content);
		}
	});
	
});


mongoose.connect("mongodb://localhost/NotesDB", function(err){
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
	filePaths: [String],
	imagePaths: [String]
});

var Note = mongoose.model('Note', noteSchema);

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
	
		if (file.mimetype.indexOf("image") > -1){
			var imagePath = path.resolve("uploadedImages");
			console.log(imagePath);
			callback(null, imagePath); 
		} else {
			var filePath = path.resolve("uploadedFiles");
			callback(null, filePath); 
		}

	},
	filename: function (req, file, callback) {
		var filename = file.fieldname + Date.now();
		callback(null, filename);
	}
});
var upload = multer({ storage: storage }).any();

//RESTful API:
router.get('/allNotes', function(req, res){
	Note.find(function(err, notes){
		if (err) {
			console.log(err);
		} else{
			res.status(200);
			notes.reverse();
			res.json(notes);
		}
	});
});

router.post('/uploadData', function(req, res){

	console.log("uploading data");

	upload(req, res, function(err){
		if (err){
			console.log(__dirname);
			console.log(err);
			
		} else {
			console.log(req.files.length);
			var mPoster = req.body.poster;
			var mDate = req.body.date;
			var mCourse = req.body.course;
			var mTopic = req.body.topic;
			var mFilenames= [];
			var mImagenames = [];

			req.files.forEach(function(file, index){
				if (file.mimetype.indexOf("image") > -1){
					mImagenames.push(file.filename);
				} else {
					mFilenames.push(file.filename);
				}
			});

			var newNote = new Note({
				poster: mPoster,
				date: mDate,
				course: mCourse,
				topic: mTopic,
				filePaths: mFilenames,
				imagePaths: mImagenames
			});


			newNote.save(function(err, newNote){
				if (err){
					console.log("Error adding to database");
				} else{
					console.log("Added to database.");
				}
			});
			res.end("Uploaded");

		}
	});
	
});

module.exports = router;


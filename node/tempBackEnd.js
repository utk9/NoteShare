var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');

var app = express();


app.use("/directives", express.static(__dirname + '/../directives'));
app.use("/services", express.static(__dirname + '/../services'));
app.use("/modules", express.static(__dirname + '/../modules'));
app.use("/controllers", express.static(__dirname + '/../controllers'));
app.use("/views", express.static(__dirname + '/../views'));
//app.use("/uploadedFiles", express.static(__dirname + '/../uploadedFiles'));

app.get("/", function(req, res){
	res.writeHead(200, {'Content-type':'text/html'});
	fs.createReadStream("../index.html").pipe(res);
})
app.get(("/uploadedFiles/:name"), function(req, res){
	
	var name = req.params.name;
	fs.readFile("../uploadedFiles/"+name, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");    
            } else {
                res.writeHead(200,{'Content-type':'image/png'});
                res.end(content);
            }
        });
	
});


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

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploadedFiles'); 
  },
  filename: function (req, file, callback) {
    var filename = file.fieldname + Date.now();
    callback(null, filename);
}
  });
var upload = multer({ storage: storage }).single('file');

//RESTful API:
app.get('/allNotes', function(req, res){
	Note.find(function(err, notes){
		if (err) {
			console.log(err);
		} else{
			res.status(200);
			res.json(notes);
		}
	});
});

app.post('/uploadData', function(req, res){

	upload(req, res, function(err){
		if (err){
			console.log("ERRRORRRR");
			console.log(err);
			
		} else {
			var mPoster = req.body.poster;
	var mDate = req.body.date;
	var mCourse = req.body.course;
	var mTopic = req.body.topic;
	var mFilenames= [];
	mFilenames.push(req.file.filename);
	console.log(mFilenames);

	var newNote = new Note({
			poster: mPoster,
			date: mDate,
			course: mCourse,
			topic: mTopic,
			filePaths: mFilenames
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

app.listen(process.env.PORT || 8888);


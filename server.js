'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');

// require and use "multer"...

var app = express();
var upload = multer().single('upfile');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', function (req, res) {
  if (req.file) {
  upload(req, res, function(err){
    if (err instanceof multer.MulterError) {
      console.error(err);
      res.json({"error": "An error has ocurred while uploading"});
    } else if (err) {
      console.error(err);
      res.json({"error": "An error has ocurred"});
    } else {
      // The file was uploaded successfully
      res.json({
        "name": req.file.originalname,
        "type": req.file.mimetype,
        "size": req.file.size
      });
    }
  });
  } else {
    res.json({"error": "file field is empty"});
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

var express = require('express');   //Express Web Server
var bodyParser = require('body-parser'); //connects bodyParsing middleware
var formidable = require('formidable');
var path = require('path');     //used for file path
var fs =require('fs-extra');    //File System-needed for renaming file etc

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

/* ==========================================================
 bodyParser() required to allow Express to see the uploaded files
 ============================================================ */
app.use(bodyParser({defer: true}));
app.route('/upload')
    .post(function (req, res, next) {

        var form = new formidable.IncomingForm();
        //Formidable uploads to operating systems tmp dir by default
        form.uploadDir = "./img";       //set upload directory
        form.keepExtensions = true;     //keep file extension

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('Upload Successful');
            //Formidable changes the name of the uploaded file
            //Rename the file to its original name
            fs.rename(files.fileUploaded.path, './img/'+files.fileUploaded.name, function(err) {
                if (err)
                    throw err;
                console.log('renamed complete');
            });
            res.end();
        });
    });



app.get('/', function(req, res) {
    res.sendfile('./public/views/index.html');
});

app.listen(8080);

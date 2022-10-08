const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileUpload({
    //useTempFiles: true,
    //tempFileDir: '/tmp/'
}));

app.post('/upload', function(req, res) {
    console.log(req.files.foo); // the uploaded file object
    req.files.foo.mv("files/test.ipynb")

    console.log(req.body.subject); // the uploaded file object

    // req.files.foo.name
});

app.listen(process.env.port || 3000);
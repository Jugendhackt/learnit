const fileUpload = require('express-fileupload');
const express = require('express');
const bodyParser = require('body-parser');
const my_sql = require('./sqlite.js')
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileUpload({
    //useTempFiles: true,
    //tempFileDir: '/tmp/'
}));

app.use(express.static('files'))

app.post('/upload', function(req, res) {
    console.log(req.files.foo); // the uploaded file object

    console.log(req.body.subject); // the uploaded file object
    console.log(req.body.title); // the uploaded file object

    my_sql.insert_data_sheets("base1.db", req.body.title, req.body.subject, (id) => {
        req.files.foo.mv(`files/${id}.pdf`)
            //res.send("<h2>Deine Datei wurde hochgeladen<\h2>")
        res.sendFile(process.cwd() + "/src/succes.html")

    });

});

app.get('/sheets', function(req, res) {
    my_sql.all_sheets_json("base1.db", (rows) => {
        res.json(rows)
    })
})

app.listen(process.env.port || 3000);
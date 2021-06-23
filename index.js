const express = require('express')
var multer = require('multer')
const path = require('path')
const app = express()
const port = 3000 || process.env.port;

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/public/images/'))
    },
    filename: function(req, file, cb) {
        cb(null, 'avatar' + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
})

app.use(express.static('public'));

app.post('/photos/upload', upload.array('photos', 12), function(req, res, next) {


    console.log(req.files);



    res.json({ success: req.body.photos })
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
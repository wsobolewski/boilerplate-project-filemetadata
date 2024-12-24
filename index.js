var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Set up storage for multer
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file uploads and return metadata
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  
  const { originalname: filename, mimetype: filetype, size } = req.file;
  
  res.json({
    name: filename,
    type: filetype,
    size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
const PORT = 8000;

var express = require('express');
var app = express();

const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:5000/'
}));

app.use(express.static('.'));

//app.use('.', express.static(__dirname + '.'));

app.get('.', function(req, res) {
    res.sendFile(path.join(public, '.'));
});

var server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

//console.log('Listening on port 80');
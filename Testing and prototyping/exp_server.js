var express = require('express');
var app = express();

const cors = require("cors");
app.use(cors({
    origin: 'null'
}));

app.use(express.static('.'));

//Serves all the request which includes /images in the url from Images folder
app.use('/data.csv', express.static(__dirname + '/data.csv'));

/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ".");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})*/

var server = app.listen(8000);
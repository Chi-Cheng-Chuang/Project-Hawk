const http = require('http');
const { waitFile }= require('wait-file');
const url = require('url');
const fs = require('fs');
const cors = require("cors");
const path = require('path');
const PORT1 = 8000;
const PORT2 = 9000;

//establishes localhost:8000 => serves files in root directory to browser
http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'null');
  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extension. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extension to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  const opts = {
    resources: [pathname],
    delay: 0, // initial delay in ms, default 0ms
    interval: 25, // poll interval in ms, default 250ms
    log: false, // outputs to stdout, remaining resources waited on and when complete or errored, default false
    reverse: false, // resources being NOT available, default false
    //timeout: 30000, // timeout in ms, default Infinity
    verbose: false, // optional flag which outputs debug output, default false
    window: 1000, // stabilization time in ms, default 750ms
  };

  fs.exists(pathname, async function (exist) {
/*    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }*/
/*
    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });*/

    try {
      await waitFile(opts);
      // once here, all resources are available
      fs.readFile(pathname, function(err, data){
        if(err){
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader('Content-type', map[ext] || 'text/plain' );
          res.end(data);
        }
      });
      } catch (err) {
        console.error(err);
      }
  });


}).listen(parseInt(PORT1));

//establishes localhost:9000 => removes files from root directory upon request from browser
http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'null');
  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extension. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extension to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  fs.exists(pathname, function (exist) {
    if(exist) {
      try {
        fs.unlinkSync('data.csv');

        console.log("Delete File successfully.");
      } catch (error) {
        console.log(error);
      }
    }

    fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      }
    });
  });


}).listen(parseInt(PORT2));

console.log(`Server listening on port ${PORT1} and ${PORT2}`);
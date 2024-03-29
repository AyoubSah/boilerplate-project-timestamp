// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function getFormattedDate(dateString) {
  let date;
  // Try parsing the date string in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const [year, month, day] = dateString.split('-');
    date = new Date(Date.UTC(year, month - 1, day));
  } else {
    // Try parsing the date string as a Unix timestamp
    date = new Date(parseInt(dateString));
  }
  return date;
}

function handleRequest(req, res) {
  const dateString = req.params.dateString || '';  // Handle empty parameter

  let formattedData;
  if (dateString) {
    formattedData = getFormattedDate(dateString);
  } else {
    formattedData = new Date(); // Use current time for empty parameter
  }

  if (!formattedData) {
    return res.status(400).json({ error: 'Invalid Date' });
  }



  res.json({
    unix: formattedData.getTime(),
    utc: formattedData.toUTCString()
  });
}
app.get('/api/:dateString?', handleRequest);


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;

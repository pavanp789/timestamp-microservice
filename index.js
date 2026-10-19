
/* index.js */

// Initialize project
var express = require('express');
var app = express();

// Enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Home page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp Microservice API
app.get("/api/:date?", function (req, res) {
  const input = req.params.date;

  let date;

  if (input === undefined) {
    // No date provided: return current time
    date = new Date();
  } else if (/^\d+$/.test(input)) {
    // Numeric input: treat as milliseconds
    date = new Date(Number(input));
  } else {
    // Otherwise, parse as a date string
    date = new Date(input);
  }

  // Check whether the date is valid
  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the timestamp and UTC date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port 3000 or the environment's PORT
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

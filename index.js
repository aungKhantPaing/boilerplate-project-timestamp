// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");

const logMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
};

app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(logMiddleware);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  console.log({ params: req.params });
  const input = req.params.date || "";
  const isUnixInput =
    Number.parseFloat(input).toString().length === input.length;
  let date = input
    ? new Date(isUnixInput ? Number.parseInt(input) : input)
    : new Date();

  console.log({ date });
  if (date instanceof Date && !isNaN(date)) {
    res.json({
      unix: isUnixInput ? Number.parseInt(input) : Math.round(date.getTime()),
      utc: date.toUTCString(),
    });
  } else {
    res.json({
      error: "Invalid Date",
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

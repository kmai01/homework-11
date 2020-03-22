var express = require("express");
var fs = require("fs");
var path = require("path")


// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener  
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});



// Listen on port 8080
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

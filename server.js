var express = require("express");
var fs = require("fs");
var path = require("path")

// Empty array to store note
var db = [];


// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener  
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware use static file
app.use(express.static('public'));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});






// Function to post note

 app.post("/api/notes", function (req, res) {

  var note = req.body;
  
  // Push note from body to empty array
  db.push(note)

  // Read array from json file
  fs.readFile(__dirname +'/db/db.json', function (err, data) {

    // Parse the read array
  var json = JSON.parse(data)

  // Push array object or array at index 0 to the read JSON array
    json.push(db[0])

  // Write it back to json file with added notes
   fs.writeFile(__dirname + '/db/db.json', JSON.stringify(json), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success post message");
   })
  
   })

  res.json(note)

})



app.get("/api/notes", function (req, res) {

  var jsondata = {}

  fs.readFile(__dirname + '/db/db.json', 'utf-8', function (err, data) {
    if (err) {
      return console.log(err);

    }
    console.log("Success get note!");


    jsondata = JSON.parse(data)
    console.log(jsondata);
     res.json(jsondata)
  });

});


  app.delete("/api/notes/:id", function(req, res) {
  const delNotes = req.params.id;
  console.log(delNotes)



});


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listen on port 8080
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});



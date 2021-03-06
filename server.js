var express = require("express");
var fs = require("fs");
var path = require("path")

// Empty array to store note
var db = [];



// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener  
var PORT = process.env.PORT || 3000;

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



// Function to post note

app.post("/api/notes", function (req, res) {

  var note = req.body;

  // Push note from body to empty array


  // Read array from json file
  fs.readFile(__dirname + '/db/db.json', function (err, data) {

    // Parse the read array
    db = JSON.parse(data)
 
    // set lenght to array id
    note.id=db.length

    // Push new note to array
    db.push(note);


    // Write it back to json file with added notes
    fs.writeFile(__dirname + '/db/db.json', JSON.stringify(db), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success post message");
    })

  })

  res.json(db)


})



app.delete("/api/notes/:id", function (req, res) {

  const delNotes = req.params.id;
  console.log(delNotes)
  // Read array from json file
  fs.readFile(__dirname +'/db/db.json', function (err, data) {

    // Parse the read array
  let json = JSON.parse(data)

  
    //json.splice(delNotes,1)

    json = json.filter(function(note) {
            return note.id != req.params.id;
          });

    console.log(delNotes)

  // Write it back to json file with added notes
   fs.writeFile(__dirname + '/db/db.json', JSON.stringify(json), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success delete message");
   })
  
   })

  res.json(delNotes)
  

})


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listen on port 8080
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});



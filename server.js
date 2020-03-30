var express = require("express");
var fs = require("fs");
var path = require("path")
var db=[] ;


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
app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname , "/public/notes.html"));
});



app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname ,"/public/index.html"));
});



app.post("/api/notes" , function (req, res) {

var note = req.body;
console.log(note)

db.push(note)

fs.writeFile(__dirname + '/db/db.json', JSON.stringify(db), function (err) {
if (err) {
  return console.log(err);
    }
  console.log("Success!");
    
 })

 res.json(note)
  

})



app.get("/api/notes", function(req, res) {
  res.json(db)
  
 // var notes = req.body;
// console.log(notes)



//fs.readFile(__dirname + '/db/db.json', db, function (err) {
//if (err) {
 // return console.log(err);
    //}
 // console.log("Success1!");
    
 //})

 //return res.json(notes)
});

app.delete("/api/notes/:id", function(req, res) {


});

// Listen on port 8080
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});



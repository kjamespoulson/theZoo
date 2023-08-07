// App.js

/*
    SETUP
*/


//********************************************************************/
// Webserver - Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


//********************************************************************/
// Database - mySQL
var db = require('./database/db-connector')
PORT = 3124;                 // Set a port number at the top so it's easy to change in the future


//********************************************************************/
// Template Engine - Handlebars

// Register `hbs` as our view engine using its bound `engine()` function.
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        res.render('index');     
    });                                         // requesting the web site.


//********************************************************************/
//  Animals Page

//  Create Operations
//      Create a new animal
app.post('/addAnimalForm', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    animalName = data['animalName']
    if (animalName === undefined) {
        animalName = NULL
    }

    console.log()

    // Create the query and run it on the database
    query1 = `INSERT INTO Animals (species, animalName, diet) VALUES ('${data['species']}', '${animalName}', '${data['diet']}')`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/Animals');
        }
    })
});

//  Read Operations
//      Render the page with all of the Animals
app.get('/Animals', function(req, res)
    {
        retrieveAnimals = 'SELECT * from Animals;';
        db.pool.query(retrieveAnimals, function(error, rows, fields){    // Execute the query

            res.render('Animals', {data: rows});
        });
    });


// Update Operations

// Delete Operations



//********************************************************************/
//  Foods Page

//      Render the page with all of the Foods
app.get('/Foods', function(req, res)
    {
        retrieveFoods = 'SELECT * from Foods;';
        db.pool.query(retrieveFoods, function(error, rows, fields){    // Execute the query
            res.render('Foods', {data: rows});
        })
    });

app.post('/addFoodForm', function(req, res) {
    
    let data = req.body;

    addFoodQuery = `INSERT INTO Foods (foodName, foodGroup) VALUES ('${data['input-foodName']}', '${data['input-foodGroup']}')`;
    db.pool.query(addFoodQuery, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }

        else {
            res.redirect('/Foods');
        }
    })
});

app.delete('/delete-food', function(req, res, next){
    let data = req.body;
    let foodID = parseInt(data.id);
    let deleteAFood = `DELETE FROM Foods WHERE foodID = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteAFood, [foodID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                res.sendStatus(204);
            }
})});

app.put('/put-food', function(req,res,next){
    let data = req.body;
  
    let oldFood = parseInt(data.foodID);
    let newFood = parseInt(data.foodName);
    let newGroup = parseInt(data.foodGroup);
  
    let queryUpdateFood = `UPDATE Foods SET foodName = ? AND foodGroup = ? WHERE oldFood = ?`;

          // Run the 1st query
          db.pool.query(queryUpdateFood, [newFood, newGroup, oldFood], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
              else {
                res.sendStatus(204);
              }
})});

//********************************************************************/
//  Keepers Page

//      Render the page with all of the animals
app.get('/Keepers', function(req, res)
{
    retrieveKeepers = 'SELECT * from Keepers;';
    db.pool.query(retrieveKeepers, function(error, rows, fields){    // Execute the query

        res.render('Keepers', {data: rows});
    });
});


//********************************************************************/
//  FeedingEvents Page

//      Render the page with all of the FeedingEvents
app.get('/FeedingEvents', function(req, res)
{
    retrieveFeedingEvents = 'SELECT * from FeedingEvents;';
    db.pool.query(retrieveFeedingEvents, function(error, rows, fields){    // Execute the query

        res.render('FeedingEvents', {data: rows});
    });
});

    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
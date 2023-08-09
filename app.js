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
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the ccs style sheet


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
app.put('/updateAnimalForm-ajax', function(req,res,next){
    let data = req.body;

    let animalID = parseInt(data.animalID);
    let species = parseInt(data.species);
    let animalName = parseInt(data.animalName);
    let diet = parseInt(data.diet);
    res.sendStatus(200);
    /*
    let queryUpdateAnimal = `UPDATE Animals SET species = ?, animalName = ?, diet = ? WHERE Animal.animalID = ?`;
    let selectAnimal = `SELECT * FROM Animals WHERE animalID = ?`
    
            // Run the 1st query
            db.pool.query(queryUpdateAnimal, [species, animalName, diet], function(error, rows, fields){
                if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                }
    
                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else
                {
                    // Run the second query
                    db.pool.query(selectAnimal, [animalID], function(error, rows, fields) {
    
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
    })*/
});


// Delete Operations
app.delete('/delete-animal', function(req,res,next){
    let data = req.body;
    let animalID = parseInt(data.animalID);
    let deleteFeedingEvent = `DELETE FROM FeedingEvents WHERE animalID = ?`;
    let deleteAnimal= `DELETE FROM Animals WHERE animalID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteAnimal, [animalID], function(error, rows, fields){
              if (error) {
  
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
              }
  
              else
              {
                /*  
                // Run the second query
                  db.pool.query(deleteAnimal, [animalID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                        console.log(fields)  
                        res.sendStatus(204);
                      }
                  })
                  */
                  res.sendStatus(204);
              }
  })});


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

app.put('/update-food', function(req,res,next){
    let data = req.body;
    
    let foodID = data.foodID;
    let foodName = data.foodName;
    let foodGroup = data.foodGroup;

    let updateFoodQuery = `UPDATE Foods SET foodName = ?, foodGroup = ? WHERE foodID = ?`;
    let selectFoods = `SELECT * FROM Foods WHERE foodID = ?`;

    db.pool.query(updateFoodQuery, [foodName, foodGroup, foodID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectFoods, [foodID], function(error,rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

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
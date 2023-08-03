// App.js

/*
    SETUP
*/


//********************************************************************/
// Webserver - Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code


//********************************************************************/
// Database - mySQL
var db = require('./database/db-connector')
PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future


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

//      Render the page with all of the Animals
app.get('/Animals', function(req, res)
    {
        retrieveAnimals = 'SELECT * from Animals;';
        db.pool.query(retrieveAnimals, function(error, rows, fields){    // Execute the query

            res.render('Animals', {data: rows});
        });
    });


//********************************************************************/
//  Foods Page

//      Render the page with all of the Foods
app.get('/Foods', function(req, res)
    {
        retrieveFoods = 'SELECT * from Foods;';
        db.pool.query(retrieveFoods, function(error, rows, fields){    // Execute the query

            res.render('Foods', {data: rows});
        });
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
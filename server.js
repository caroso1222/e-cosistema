// grab express
var express = require('express'); // create an express app
var app = express();
// create an express route for the home page // http://localhost:8080/

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));


// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    // use the instagram package to get popular media
    // render the home page and pass in the popular images
    res.render('pages/index');
});
// start the server on port 8080
app.listen(8080);
console.log('App started! Look at http://localhost:8080');
// send a message console.log('Server has started!');
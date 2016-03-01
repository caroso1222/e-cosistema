// grab express
var express = require('express'); // create an express app
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var request = require('request');
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

app.get('/gracias', function(req, res) {
    // use the instagram package to get popular media
    // render the home page and pass in the popular images
    res.render('pages/gracias');
});

app.post('/test',function(req,res){
	console.log("wheeeeeee");
	console.log(JSON.stringify(req.body.email));
	console.log(req.body.email);
});

app.post('/invite', function(req, res) {
    // use the instagram package to get popular media
    // render the home page and pass in the popular images
    console.log("llega para enviar");

    request.post({
    	url:'https://phco.slack.com/api/users.admin.invite',
    	form:{
    		email:req.body.email,
    		token: 'xoxp-19367719365-19371862470-23663375363-cb656ba887',
    		set_active: true
    	}
    },function(err,httpResponse, body){
    	console.log(body);
    	if (err) { 
    		return res.send('Error:' + err); 
    	}
    	if (body.ok) {
    		console.log("muy bien!");
    	} else {
    		var error = body.error;
    		if (error === 'already_invited' || error === 'already_in_team') {
    			console.log("already_invited");
    			return;
    		} else if (error === 'invalid_email') {
   				console.log("invalid_email");
    			error = 'The email you entered is an invalid email.'
    		} else if (error === 'invalid_auth') {
   				console.log("invalid_auth");
    			error = 'Something has gone wrong. Please contact a system administrator.'
    		}
    	}
    });

});
// start the server on port 8080
app.listen(15419);
console.log('App started! Look at http://localhost:15419');
// send a message console.log('Server has started!');
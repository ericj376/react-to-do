var express = require('express');//express is a JavaScript specific language
var app = express();
var bodyParser = require('body-parser');
var ToDo = require('./models/toDo');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use(express.static('public'));//config node to know what to do with all these files

app.set('view engine', 'ejs');//has to be above the app.get


app.get('/', function(req, res){//bearsDisplay server file
	ToDo.find(function(err, toDo){
		if(err){
			console.log(err);
		} else {
			console.log('setting todo', toDo)
		res.render('index', {toDo: toDo})		
		}
	})
	
});

app.get('/about', function(req, res){//about page server file
	var data = {};
	data.title = 'About Page';
	data.name = 'Salamander';
	data.time = new Date();
	res.render('about', data);
});



var port = process.env.PORT || 2000;

var router = express.Router();

var toDoRouter = require('./routes/toDo');//connects to bears.js

router.use(function(req, res, next){//adds middleware
	console.log('something is happening!');
	next();//making sure it keeps going and doesnt stop here
});

router.get('/', function(req, res){
	res.json({ message: 'Hooray! welcome to my API!' });
});




app.use('/api', toDoRouter);

app.listen(port);
console.log('Magic happens on port ' +port);

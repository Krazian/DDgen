var express = require('express')
var app = express()
var sql = require ('sqlite3')
var db = new sql.Database('dungeonsanddragons.db');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});

app.use(urlencodedBodyParser);
app.use(express.static('public'));
app.set('view_engine','ejs');

//single page only need
app.get("/",function(req,res){
	res.render('index.ejs');
	db.all('SELECT * FROM races'),function(err,race){
		if (err) {
			console.log(err)
		} else {
			console.log(race)
		}
	}
})

app.listen(3000, function(){
	console.log('Roll for initiative!')
})
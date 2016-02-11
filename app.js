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

var pickSomething = function(howMany,fromWhere,splitByWhat){
	if (howMany > 1){
		var chosenOnes=[]
		var pick=fromWhere.split(splitByWhat)
		for (var i = 0; i < howMany; i++){
			fromWhere=pick[Math.floor(Math.random() * pick.length)]
			chosenOnes.push(fromWhere)
			pick.splice(pick.indexOf(fromWhere),1)
			}
		return chosenOnes
	} else {
		var pick=fromWhere.split(splitByWhat)
		fromWhere=pick[Math.floor(Math.random() * pick.length)]
		return fromWhere
	}
}

app.get("/",function(req,res){
	db.all('SELECT * FROM races ORDER BY RANDOM() LIMIT 1',function(err,race){
		db.all('SELECT * FROM classes ORDER BY RANDOM() LIMIT 1',function(err,job){
			// res.render("index.ejs",{races:race[0],jobs:job[0]})
			var selection=[]
			for (var raceChar in race[0]){
				console.log("The "+raceChar+"is "+race[0][raceChar])
				selection.push(race[0][raceChar])
			}
			for (var jobChar in job[0]){
				selection.push(job[0][jobChar])
			}

			selection[6]=pickSomething(1,selection[6],",")
			selection[7]=pickSomething(1,selection[7],",")
			selection[8]=pickSomething(1,selection[8],",")
			var gear = selection[18].split(";")
			var chosenGear = []
			gear.forEach(function(options){
				var singleItem = options.split(",")
				chosenGear.push(singleItem[Math.floor(Math.random()*singleItem.length)])
			})
			selection[18] = chosenGear;


			res.render('index.ejs',{chosen:selection})
		})
	})
})

app.listen(3000, function(){
	console.log('Roll for initiative!')
})
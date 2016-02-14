var express = require('express');
var app = express();
var sql = require ('sqlite3');
var db = new sql.Database('dungeonsanddragons.db');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var func = require('functions');
var functions = new func();
var attr = require('attributes');

app.use(urlencodedBodyParser);
app.use(express.static('public'));
app.set('view_engine','ejs');

app.get("/",function(req,res){
	var stats = [];
	for (var i = 0; i < 7; i++){
		var number = functions.getStats();
		stats.push({score: number,modifier:functions.modifiers(number)});
		}
		stats.sort(function (a, b) {
	  if (a.score > b.score) {
	    return 1;
	  }
	  if (a.score < b.score) {
	    return -1;
	  }
	  return 0;
	}).shift();

	var abilityScores = new attr(functions.shuffle(stats));

	db.all('SELECT * FROM races ORDER BY RANDOM() LIMIT 1',function(err,race){
		db.all('SELECT * FROM classes ORDER BY RANDOM() LIMIT 1',function(err,job){
			race[0].male_name = functions.pickSomething(1,race[0].male_name,",");
			race[0].female_name = functions.pickSomething(1,race[0].female_name,",");
			race[0].clan_or_family_name = functions.pickSomething(1,race[0].clan_or_family_name,",");

			var chosenGear = [];
			job[0].starting_equipment.split(";").forEach(function(options){
				var singleItem = options.split(",");
				chosenGear.push(singleItem[Math.floor(Math.random()*singleItem.length)]);
			});
			job[0].starting_equipment = chosenGear;
			job[0].skills = functions.pickSomething(job[0].choose_skills,job[0].skills,",");
			res.render("index.ejs",{race:race[0],job:job[0],stat:abilityScores});
		});
	});
});

app.listen(3000, function(){
	console.log('Roll for initiative!');
});
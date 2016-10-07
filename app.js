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
	res.render("index.ejs");
});

app.get("/basic",function(req,res){
	function pickRandomAbility(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
	}

	//RANDOMLY SELECT A RACE AND CLASS
	db.all('SELECT * FROM races ORDER BY RANDOM() LIMIT 1',function(err,race){
		db.all('SELECT * FROM classes ORDER BY RANDOM() LIMIT 1',function(err,job){
			// GETS STATS FROM EXPORT MODULE
			var stats = [];
			debug("stop")
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

			// RANDOMLY ASSIGN STATS
			var abilityScores = new attr(functions.shuffle(stats));
			race[0].ability_score_bonus.split(",").forEach(function(bonus){
				var number = bonus.trim().split(" ")[0];
				var stat = bonus.trim().split(" ")[1];
				//ADDS RACIAL STAT BONUSES
				switch (stat){
					case "Strength":
						abilityScores.Strength.score += parseInt(number, 10);
						abilityScores.Strength.modifier = functions.modifiers(abilityScores.Strength.score);
						break;
					case "Dexterity":
						abilityScores.Dexterity.score += parseInt(number, 10);
						abilityScores.Dexterity.modifier = functions.modifiers(abilityScores.Dexterity.score);
						break;
					case "Constitution":
						abilityScores.Constitution.score += parseInt(number, 10);
						abilityScores.Constitution.modifier = functions.modifiers(abilityScores.Constitution.score);
						break;
					case "Intelligence":
						abilityScores.Intelligence.score += parseInt(number, 10);
						abilityScores.Intelligence.modifier = functions.modifiers(abilityScores.Intelligence.score);
						break;
					case "Wisdom":
						abilityScores.Wisdom.score += parseInt(number, 10);
						abilityScores.Wisdom.modifier = functions.modifiers(abilityScores.Wisdom.score);
						break;
					case "Charisma":
						abilityScores.Charisma.score += parseInt(number, 10);
						abilityScores.Charisma.modifier = functions.modifiers(abilityScores.Charisma.score);
						break;
					default:
						//SPECIFICALLY FOR HALF ELF WHICH ALLOWS +1 TO ANY 2 ABILITIES
						for (var times = 0; times < 2; times++){
							switch (pickRandomAbility(abilityScores)){
								case "Strength":
									abilityScores.Strength.score += 1;
									abilityScores.Strength.modifier = functions.modifiers(abilityScores.Strength.score);
									break;
								case "Dexterity":
									abilityScores.Dexterity.score += 1;
									abilityScores.Dexterity.modifier = functions.modifiers(abilityScores.Dexterity.score);
									break;
								case "Constitution":
									abilityScores.Constitution.score += 1;
									abilityScores.Constitution.modifier = functions.modifiers(abilityScores.Constitution.score);
									break;
								case "Intelligence":
									abilityScores.Intelligence.score += 1;
									abilityScores.Intelligence.modifier = functions.modifiers(abilityScores.Intelligence.score);
									break;
								case "Wisdom":
									abilityScores.Wisdom.score += 1;
									abilityScores.Wisdom.modifier = functions.modifiers(abilityScores.Wisdom.score);
									break;
								case "Charisma":
									abilityScores.Charisma.score += 1;
									abilityScores.Charisma.modifier = functions.modifiers(abilityScores.Charisma.score);
									break;
							}
						}
					}
			});
			race[0].male_name = functions.pickSomething(1,race[0].male_name,",");
			race[0].female_name = functions.pickSomething(1,race[0].female_name,",");
			race[0].clan_or_family_name = functions.pickSomething(1,race[0].clan_or_family_name,",");

			//RANDOMLY SELECT STARTING EQUIPMENT
			var chosenGear = [];
			job[0].starting_equipment.split(";").forEach(function(options){
				var singleItem = options.split(",");
				chosenGear.push(singleItem[Math.floor(Math.random()*singleItem.length)]);
			});
			job[0].starting_equipment = chosenGear;
			job[0].skills = functions.pickSomething(job[0].choose_skills,job[0].skills,",");
			console.log(job[0])
			res.render("basic.ejs",{race:race[0],job:job[0],stat:abilityScores});
		});
	});
});

app.get("/spells",function(req,res){
	res.render("spells.ejs");
});

app.listen(4000, function(){
	console.log('Roll for initiative!');
});
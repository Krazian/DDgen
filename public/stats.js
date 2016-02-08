function getStats(){
	var die = []
	for (var i = 1; i < 5; i++){
		die.push(Math.floor(Math.random() * 6) + 1)
	}
	var sorted = die.sort().pop()

	return die
}
console.log(getStats())
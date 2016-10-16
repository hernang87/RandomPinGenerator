const RandomPinGenerator = require('./RandomPinGenerator');

var rpg = new RandomPinGenerator(4, 3);

var pin = rpg.getRandomPin();
console.log(rpg.getBatch(10000));

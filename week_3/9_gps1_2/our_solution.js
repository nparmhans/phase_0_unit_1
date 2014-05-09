// GPS 1.2 - JavaScript

// YOUR FULL NAMES:
//  1.Stephen Estrada
//  2. Ernie Salazar


// 0. "YOU SIGNED... WHO?!"
function Client(name, age, quote) {
  this.name = name;
  this.age = age;
  this.quote = quote;
}


var will = new Client("Will Smith", 45, "I like candy");

// 1. "Here they Come!"

var adam = new Client("Adam Sandler", 45, "That's your home! Are you to good for your home?!");
var kristen = new Client("Kristen Bell", 33, "Do you wanna to build snowman?");
var jim = new Client("Jim Carrey", 52, "...so you're telling me there's a chance? YEAH!");

// 2. "TIME IS MONEY!"

var shooterMcGavin = new Client("Shooter McGavin", 48, "Just stay out of my way... or you'll pay. Listen to what I say.");
shooterMcGavin.constructor === Client;
shooterMcGavin.age === 48;
shooterMcGavin.quote === "Just stay out of my way... or you'll pay. Listen to what I say.";


//YOUR CODE HERE!


// 3. "SHOW 'EM OFF!"

var clients = [will, adam, kristen, jim, shooterMcGavin];
console.log(clients[1]);
console.log(clients);

// 4. "BUT WAIT THERE'S MORE"

will.showQuote = function() {
  console.log(this.quote);
}


// ** BONUS **


//  Your Reflection:


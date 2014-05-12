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
// * During the GPS I think a strategy that works very well which I consistently use is go by the DBC guidelines to start
// off the GPS session. This allows all three parties to become comfortable together and break the ice. Consisting of those
// guidelines is figuring out which personel will be the navigator and driver. After that its all uphill from there because
// we're able to corroborate based on our position. During GPS I also like to make sure my partner is motivated and on point
// with me, meaning if he is lagging behind I need to slow down or speed up. 

// * During the coding session we discovered that when we ran our JS code in the terminal and it wasn't working. After which
// we asked ourselves whats wrong with our code? I think this is the same question we have to keep proposing when coding because
// when we stop asking questions either we're professional or we're not doing something correctly. 

// * Sometimes I was struggling on understanding the question that the challenge wanted us to understand, so I read aloud to my
// partner so that I was able to acheive two tasks, one see if he noticed what I missed or two try to catch my misunderstanding. 

// * I am very confident with my learning competencies. 

// * I always enjoy working on GPS. They're invigorating and advocating for the success of learning. 
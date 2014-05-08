// I paired by myself, on this challenge.




// Pseudocode
// 1. The value of secretNumber should be a 'number'. 
// 2. The value of secretNumber should be 7. 
// 3. The value of password should be a 'string'. 
// 4. The value of password should be 'just open the door'. 
// 5. The value of allowedIn should be a 'boolean'. 
// 6. The value of allowedIn should be 'false'. 
// 7. The value of members should be an array. 
// 8. The first element in the value of members should be 'john'. 
// 9. The fourh element in the value of members should be 'Mary'. 
// 
// 


// __________________________________________
// Write your code below.
var secretNumber = 3;
var secretNumber = 7;
var password = "string";
var password = "just open the door";
var allowedIn = "boolean";
var allowedIn = false;
var members = [0, 1, 2, 3, 4, 5]
members[0] = "John";
members[3] = "Mary";






// __________________________________________
// Refactored Code: Include a refactored version (or justification of your original code) here. 
secretNumber = 3;
secretNumber = 7;
password = "string";
password = "just open the door";
allowedIn = "boolean";
allowedIn = false;
members = [0, 1, 2, 3, 4, 5]
members[0] = "John";
members[3] = "Mary";

// For the purpose of running passing these variable to the fucntion it didn't require placing 'var' in the code so 
// I removed it. What I am uncertain of is if we will need this for later purposes. 


// __________________________________________
// Reflection: Use the reflection guidelines to write a reflection here. 
// 
// * I referred back to the 'JavaScript Intro' so that I was able to learn the coding. 
// * Everything worked well. I installed JavaScript to my terminal so its was very easy check whether or not the code
// would return true or false. 
// * I was uncertain for this exercise why we didn't need to place 'var' in front of the variable name? Still searching
// for an answer. 
// * No new tricks, everything was straight from the notes. 
// * I'm very confident with my learning competencies when given challeneges that review my prior not taking. 
// * I enjoyed the simplicity of this exercise. Its been a long week, so to be able to run through a challenge with 
// minimal to no problems is always good news. 



// __________________________________________
// Driver Code:  Do not alter code below this line.

function assert(test, message, test_number) {
  if (!test) {
    console.log(test_number + "false");
    throw "ERROR: " + message;
  }
  console.log(test_number + "true");
  return true;
}

assert(
  (typeof secretNumber === 'number'),
  "The value of secretNumber should be a number.",
  "1. "
)

assert(
  secretNumber === 7,
  "The value of secretNumber should be 7.",
  "2. "
)

assert(
  typeof password === 'string',
  "The value of password should be a string.",
  "3. "
)

assert(
  password === "just open the door",
  "The value of password should be 'just open the door'.",
  "4. "
)

assert(
  typeof allowedIn === 'boolean',
  "The value of allowedIn should be a boolean.",
  "5. "
)

assert(
  allowedIn === false,
  "The value of allowedIn should be false.",
  "6. "
)

assert(
  members instanceof Array,
  "The value of members should be an array",
  "7. "
)

assert(
  members[0] === "John",
  "The first element in the value of members should be 'John'.",
  "8. "
)

assert(
  members[3] === "Mary",
  "The fourth element in the value of members should be 'Mary'.",
  "9. "
)


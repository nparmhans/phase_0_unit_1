// This is a Solo Challenge. 

// There is a section below where you will write your code.
// Do not alter this object here.


var terah = {
  name: "Terah",
  age: 32,
  height: 66,
  weight: 130,
  hairColor: "brown",
  eyeColor: "brown"
}
/* Pseudocode Section - write pseudocode for each challenge below.
1. Define a variable adam and use object literal notation to assign this variable 
   the value of a JavaScript Object object with no properties.

2. Give adam a name property with the value "Adam".

3. Add a spouse property to terah and assign it the value of adam.

4. Change the value of the terah weight property to 125.

5. Remove the eyeColor property from terah.

6. Add a spouse property to adam and assign it the value of terah.

7. Add a children property to terah and and use object literal notation to assign 
   this variable the value of a JavaScript Object object with no properties

8. Add a carson property to the value of the terah children property and assign it 
  the value of an object with the property name with a value of "Carson".

9. Add a carter property to the value of the terah children property and assign it 
   the value of an object with the property name with a value of "Carter".

10. Add a colton property to the value of the terah children property and assign it 
    the value of an object with the property name with a value of "Colton".

11. Add a children property to adam and assign it the value of terah children.


*/

// __________________________________________
// Write your code below.
// 1. var adam = {};

// 2. var adam = {name: "Adam"};

// 3. terah = {spouse: adam};

// 4. terah.weight = 125;

// 5. delete terah.eyeColor;

// 6. adam.spouse = terah;

// 7. terah.children = {};

// 8. terah.children.carson = {name: "Carson"};

// 9. terah.children.carter = {name: "Carter"};

// 10. terah.children.colton = {name:"Colton"};

// 11. adam.children = {};
// adam.children = terah.children











// __________________________________________
// Reflection: Use the reflection guidelines
// * Today's solo challenge started off very smooth; however, once I started on question 8 to 11 I began to struggle a little 
// bit have to implement new syntax so that my code would work in the terminal. 

// * What made solo questions 8 - 11 the most difficult was trying to add multiple properties and values to a property
// that had already been define. What helps was the object literal notation notes that DBC provided in challenge 3. Also I 
// referred back to code combat when I hovered over the keyword 'this' and noticed that it contained multiple properties and
// values. 

// * I understood the concepts of what I am doing. What makes it easier is going through the challenge three links so that
// you're able to properly learn JavaScript. I spent about 30 minuters on questions 11. Which isn't the best time management
// but I will know better for next time. 

// * Today I learned Object literal notation at a much higher level than I had previously known as far as utilizing objects and
// properties with values. Before, I went over object literal notation, but now I am actually putting it to good use which is 
// definitely something I need to take into consideration while learning because it clearly works for me. 


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
  (adam instanceof Object),
  "The value of adam should be an Object.",
  "1. "
)

assert(
  (adam.name === "Adam"),
  "The value of the adam name property should be 'Adam'.",
  "2. "
)

assert(
  terah.spouse === adam,
  "terah should have a spouse property with the value of the variable adam.",
  "3. "
)

assert(
  terah.weight === 125,
  "The terah weight property should be 125.",
  "4. "
)

assert(
  terah.eyeColor === undefined,
  "The terah eyeColor property should be removed.",
  "5. "
)

assert(
  terah.spouse.spouse === terah,
  "The terah spouse property's value spouse property should be terah.",
  "6. "
)

assert(
  (terah.children instanceof Object),
  "The value of the terah children property should be an Object.",
  "7. "
)

assert(
  terah.children.carson.name === "Carson",
  "The terah children property should have a carson property with its own property name with a value of 'Carson'.",
  "8. "
)

assert(
  terah.children.carter.name === "Carter",
  "The terah children property should have a carter property with its own property name with a value of 'Carter'.",
  "9. "
)

assert(
  terah.children.colton.name === "Colton",
  "The terah children property should have a colton property with its own property name with a value of 'Colton'.",
  "10. "
)

assert(
  adam.children === terah.children,
  "The value of the adam children property should be the value of the terah children property",
  "11. "
)

console.log("\nHere is your final terah object:")
console.log(terah)
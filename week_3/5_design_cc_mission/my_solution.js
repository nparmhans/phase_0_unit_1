// I worked Avi Fox-rosen & Stephen Estrada on this challenge:

// Your mission description:
// Title: Put a Diaper on Baby
// Baby is diaperless. Your character is big papa. Our mission is to get a 
// diaper on the baby before the timer goes off. 
// You have one minute to place a diaper on the baby. 
// Your character is on one side of the screen and you must take the diaper 
// through the maze and to the baby. 

// Pseudocode
// 1) Define area play as a box, width: 1000px, height: 1000px. 
// 2) Create column  structure of 5 x 5 by created divs of 200 by 200 px. 
// 3) Give individual Id to each div. 
// 4) Create our objects: baby, diaper, and big poppa. We want to create a variable for big papa 
// var bigPapa = { name: "big popa "}. 
// 5) Add the properties of name & position to all of our variables 
// 6) Add property of peeing, (yes or no for peeing and different states for
// each on) to Baby.
// 7) Start Big Poppa at the bottom right hand corner, on coordinates (e,6)
// 8) start diaper on coordinates (a, 6)
// 9) place baby on (a,1) 
// 10) move Big Poppa left to coordinates (e,3)
// 11) move Big poppa left again to coord (e,1)
// 12) move up to coordinates (d,1) 
// 13) move right to coord (d,4)
// 14) move up to coord (b,4) 
// 15) move right to coord (b,6) 
// 16) move up to diaper (a,6)
// 17) Big poppa pick up diaper
// 18) move to coord (a,4) 
// 19) move to coord (a,2) 
// 20) move to baby
// 21) kiss baby
// 22) put diaper on baby 

// Initial Code
// this.moveXY(e,3);
// this.moveXY(e,1);
// this.moveXY(d,1);
// this.moveXY(d,4);
// this.moveXY(b,4);
// this.moveXY(b,6);
// this.moveXY(a,6);
// this.grab(diaper);
// this.moveXY(a,4);
// this.moveXY(a,2);
// this.moveXY(a,6);
// this.kiss(baby);
// this.placeOnBaby(diaper);





// Refactored Code
// this.moveXY(e,1);
// this.moveXY(d,1);
// this.moveXY(d,4);
// this.moveXY(a,4);
// this.moveXY(a,6);
// this.grab(diaper);
// this.moveXY(a,1);
// this.kiss(baby);
// this.placeOnBaby(diaper);






// Reflection
// 
// 
// 
// 
// 
// 
// 
// 
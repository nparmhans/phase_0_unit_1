// I worked on this challenge [by myself, with:]
 
// For each mission, write the title as a comment. (Shown here). Also include pseudocode as a comment. 
// Note: to make commenting easier, you can highlight the section you want to comment and hold 
// command + / This will comment the line. 
 
// Rescue Mission:
// move down x2
// move right
// move up x2
// move right x2
// move down
// Attack!
//
// Solution:
// this.moveDown();
// this.moveDown();
// this.moveRight();
// this.moveUp();
// this.moveUp();
// this.moveRight();
// this.moveRight();
// this.moveDown();
// this.attackNearbyEnemy();
 
// Grab the Mushroom:
// move up
// move right
// move left
// move up
// Attack!

// Solution:
// this.moveUp();
// this.moveRight();
// this.moveLeft();
// this.moveUp();
// this.attackNearbyEnemy();

//  Drink Me:
//  Attack!
//  move right
//  move down
//  move up
//  move right
//  Attack!

//Solution:
// this.attackNearbyEnemy();
// this.moveRight();
// this.moveDown();
// this.moveUp();
// this.moveRight();
// this.attackNearbyEnemy();

//  Taunt the Guards:
// move right
// say "Follow me."
// move right x2
// move up
// move right
// say "Hey there!""
// say "Attack!" x2
// move right
// say "Follow me."
// move right 


//  Solution:
// this.moveRight();
// this.say("Follow me.");
// this.moveRight();
// this.moveRight();
// this.moveUp();
// this.moveRight();
// this.say("Hey there!");
// this.say("Attack!");
// this.say("Attack!");
// this.moveRight();
// this.say("Follow me.");
// this.moveRight();

// It's a Trap!:
// move down x2
// say "Hey there!"  
// move up x2
// say "Attack!"

// Solution:
// this.moveDown();
// this.moveDown();
// this.say("Hey there!");
// this.moveUp();
// this.moveUp();
// this.say("Attack!");

// Taunt:
// say "Hey ugly!"
// say "Hey fatty!"
// say "Hey stupid!"
// say "Hey dummy!"


// Solution:
// this.say("Hey ugly!");
// this.say("Hey fatty!");
// this.say("Hey stupid!");
// this.say("Hey dummy!");

// Cowardly Taunt:
// move to coordinates (56, 27)
// say "Hey, Ugly!"
// move to coordinates (70, 10)

// Solution:
// this.moveXY(56,27);
// this.say("Hey Ugly!");
// this.moveXY(70, 10);

// Commanding Followers:
// say "Follow me"
// move to these coordinates (67, 45)
// say "Hey, uglies!"
// say "Attack!"

// Solutions:
// this.say("Follow me.");
// this.moveXY(67,47); 
// this.say("Hey, uglies!");
// this.say("Attack!");

// Mobile Artillary:
// move to coordinates (45,36)
// attack coordinates (66, 54)
// attack coordinates (57,46)
// attack coordinates (48, 64)
// attack coordinates (44, 50)

// Solution:
// this.moveXY(45,36);
// this.attackXY(66, 54);
// this.attackXY(57, 46);
// this.attackXY(48, 64);
// this.attackXY(44, 50);
 
 
 
 
// Reflection:
// Write your reflection here.
// * The paretheses are used for the function to execute the context in the '()', if there isn't a 
//   string within the '()' the method will still execute itself.
// * The keyword 'this' is used to evaluate the current context in the '()' needed to be executed. 
// * The semicolons are used to parse statements. A single semicolon at the end of the method 
//	 it begins a do-while loop (do statement while (expression);). Also, a semicolon at the end of a
//   ends the statement.
// * I only strategy I used was copy and pasted my solution after I completed each game challenege to
//   minimize the typing needed to my reflection solutions. I faced a problem when I couldn't get someone
//   to follow me out of the exit. 
// * I kept asking myself what the parenthese were used for? I used stack overflow to help answer this.
// * None so far. 
// * I learned how to used Javascript methods to manipulate the player in the game. 
// * It was really easy learning through the video's. 
// * I enjoyed playing the game and watching the methods successfully execute. 
// * I found that repeating the same exercise for simple concepts tedious, when difficult 
//   concepts are better served practicing. 



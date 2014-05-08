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
// When designing a mission challenege I worked with Avi Fox-rosen. Before we got into any detail on how we wanted to assess the challenge we went over
// the essentials first which was checking in with one another and asking how everything is going as far as in our lives and in DBC. Next Avi and I 
// brainstormed some solid ideas and his mission to want to have a character go through a labyrinth design to get a diaper then find the baby in the maze
// and put the diaper on a baby is what really stuck out for both of us. We aimed to make this assignment as fun for us as possible. Here at DBC, while the
// work-load can be overwhelming at times there is always time for enjoyment. Since Avi had a good idea on what we were building he started off as the navigator, 
// from here we constructed a wireframe for how we wanted the labyrinth to appear and what the goals of our objects and properties were. After which we began
// our mission design, quickly moving into the Pseudocode. Half way through once we had a solid understanding of the basics we switched rolls and Avi began
// the driver while I started to navigate. Avi and I worked through the assignment strong. Once again it was a lot of fun working with Avi. 

// * Our strategy was reading over the directions together and trying to get a full understanding for what we were dealing with. Problems we faced were trying
// to figure out if we really needed to have JavaScript 4 on our computers and if we needed to utilize it. We never figured it out but we did compelte the 
// assignment. 

// * We asked ourselves what objects are we using in our mission design? What properties will the objects possess? What is 'this' referring to in the directions?
// Are we hovering over the combat code 'this'? We used code combat to hover over 'this' when we discovered that it possessed multiple properties and values. 

// * I don't know that Avi and I struggled too much with any concepts other than trying to distinguish how to utilize the objects and thier properties. 

// * I have been struggling on question 7 of the solo challenge and trying to relay to myself how to answer this question; however, last night while 
// working with Avi, after we learned to hover over 'this', I got a better understanding that it was to create multiple properties for values, and I'm now
// going to try to utilize that understanding today. 

// * As long as I'm working hard and focusing I am fully confident with my learning competencies. Ocassionally, as anyone else does, I will struggle with some
// concepts or questions, but its just another feat for me :). 

// * The challenge itself was made enjoyable because we were able to work with one another, while also brainstorming wild ideas on what we wanted to display to
// users when they read over our code. 

// * Nothing was tedious. I think because JavaScript is new to this DBC class or at least most of us, finding something tedious would be fairly difficult
// as of now. 























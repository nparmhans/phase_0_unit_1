function Sum(array) { n 						// Created a sum method with a parameter of 'array'
	var count = 0								//counter starts at 0
	for(var i = 0, n=array.length; i < n; i++)  //take an array then increments based on inserted values
	{
		count +=array[i]; 						//adds the sum of the array. 
	}

	return count;								//returns the sum of the array.
};

console.log(Sum([2,3,4]));						//prints string of array to console. 


function Mean(x) {								//created a mean method called mean with a parameter of 'x'.
	var average = Sum(x)/x.length;				//set variable to previousley called Sum method then divide 
	{											//by length of array list.
	return average;								//return variable that contains method
}
};


console.log(Mean([1, 2, 4, 5]));				//Call/print method


function Median(x) {
	var cut = x.length / 2;
	var x = x.sort();
	if (x.length % 2 === 0){
		return x[cut] + x[cut - 1 ]/ 2; 
	} else {
		return x[cut];
	}
};

console.log(Median([1, 2, 3, 3, 5, 4]));

//Reflection
* The stategy that I keep utilizing is pomodoro technique. It is a solid strategy that has
been consistently working for me and I love it. 

* When I start to code and begin to use loops I like to ask myself what the program is doing
once its starts running, rather function in this case. During which I am able to assess what
the function does and what other components I maybe missing from the program. 

* I learned a more efficent way of looping through a method. 

* I am confident with my learning strategies in JS so far, but I still need some practice to solidify 
my knowledge. 

* I actually enjoyed the idea of having a group send multiple parts to one another and accomplishing 
multiple tasks. Really awesome DBC!


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





"use strict";
//-------------------------------------------------------------------------------------
console.log("Answer 1");

function max(num1,num2)
{
    if(num1>num2)
    {
        return num1
    }
    return num2;
}

console.log("Max value is: "+max(12, 3)); // Output: 12
console.log(max(20, 25)); // Output: 25

//-------------------------------------------------------------------------------------
console.log("Answer 2");

function maxOfThree()
{
    let maxVal=-Infinity;
    for(let i=0;i<arguments.length;i++)
    {
     if(maxVal<arguments[i])  
     {
        maxVal=arguments[i];
     } 
    }
    return maxVal;
}
console.log("Max value in three value: "+maxOfThree('aa',4,10))

//-------------------------------------------------------------------------------------
console.log("Answer 3");

function isVowel(char) {
    let vowels = "aeiouAEIOU";
    if (vowels.includes(char)) {
      return true;
    } else {
      return false;
    }
  }
  console.log("The letter is Vowel: "+isVowel('a'));

  //-------------------------------------------------------------------------------------
  console.log("Answer 4");

  function sum(nums) {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
      total += nums[i];
    }
    return total;
  }

  function multiply(nums) {
    let product = 1;
    for (let i = 0; i < nums.length; i++) {
      product *= nums[i];
    }
    return product;
  }
 
  console.log("The sum of this array elements: "+sum([1,2,3,6]));  
  console.log("The multiply of this array elements: "+multiply([1,2,3,4]));  

  //-------------------------------------------------------------------------------------
  console.log("Answer 5");

  function reverse(str) {
    return str.split('').reverse().join('');
  }
  console.log("final reverse array  : "+reverse("jag testar")); 
  
  //-------------------------------------------------------------------------------------
  console.log("Answer 6");

function findLongestWordLength(words) {
    let longest = 0;
    for (let i = 0; i < words.length; i++) {
      longest=Math.max(words[i].length ,longest)
    }
    return longest;
  }
const wordArray = ["apple", "banana", "orange", "kiwi","Watermellon"];
const longestWordLength = findLongestWordLength(wordArray);
console.log("The longest word has length : ", longestWordLength);

 //-------------------------------------------------------------------------------------
  console.log("Answer 7");

function filterLongWords(words,i) {
   
    let results = words.filter( item=>item.length>i);
    return results;
  }
console.log("Words that were longer than i characters : ", filterLongWords(wordArray,5));

 //-------------------------------------------------------------------------------------
 console.log("Answer 8");

function computeSumOfSquares(numbers) {
    return numbers.map(num => num * num)
                    .reduce((sum, square) => sum + square, 0);
  }
const numbers = [1, 2, 3];
const sumOfSquares = computeSumOfSquares(numbers);
console.log("Sum of Squarres : "+sumOfSquares); // output: 14

 //-------------------------------------------------------------------------------------
 console.log("Answer 9");

function printOddNumbersOnly(numbers) {
    
     let results = numbers.filter( item=>item % 2 !== 0);
     console.log( "Odd Numbers are : "+results);
   }
const  numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
printOddNumbersOnly(numArray);

 //-------------------------------------------------------------------------------------
 console.log("Answer 10");

function computeSumOfSquaresOfEvensOnly(numbers) {
    
     let evenNumbers = numbers.filter( item=>item % 2 === 0);
     return evenNumbers.map(num => num * num)
                        .reduce((sum, square) => sum + square, 0);

  }
  console.log("Sum Of Squares Of Evens are : "+   computeSumOfSquaresOfEvensOnly(numArray)); 


 //-------------------------------------------------------------------------------------
 console.log("Answer 11");

 function sumReduce(nums) {
    return nums.reduce((sum, value) => sum + value, 0);
 }

 function multiplyReduce(nums) {
    return nums.reduce((multiply, value) => multiply * value, 1);
 }

 console.log("The sum of this array elements: "+sumReduce([1,2,3,6]));  
 console.log("The multiply of this array elements: "+multiplyReduce([1,2,3,4])); 

 //-------------------------------------------------------------------------------------
 console.log("Answer 12");

 function printFibo(n,a,b) {
    if(n<=1)
    {
      console.log("Fibonacci sequence is :"+"0"); 
    }
    else
    {
      let fibo=[a,b];
      for(let i=2; i<n;i++)
      {
        fibo[i]=fibo[i-1]+fibo[i-2];
      }
      console.log("Fibonacci sequence is :"+fibo.join(',')); 
    }
 }
 printFibo(1, 0, 1);
 printFibo(2, 0, 1);
 printFibo(3, 0, 1);
 printFibo(6, 0, 1);
 printFibo(10, 0, 1);
 printFibo(10, 3, 5);
 //-------------------------------------------------------------------------------------

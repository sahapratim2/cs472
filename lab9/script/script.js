document.writeln(`Answer 1 : </br> </br>`);
let student = {
  firstName: "",
  lastName: "",
  grades: [],
  inputNewGrade(newGrade) {
    this.grades.push(newGrade);
  },
  computeAverageGrade() {
    //this.grades.forEach(num=> sum+=num);
    let sum = this.grades.reduce((sum, value) => sum + value, 0);;
    let averageGrade = sum / this.grades.length;
    return averageGrade;
  }
}

student1 = Object.create(student);
student2 = Object.create(student);
student3 = Object.create(student);
student1.firstName = "Partha";
student1.lastName = "Saha";
student1.grades = [];
student1.inputNewGrade(4);
student1.inputNewGrade(4);
student1.inputNewGrade(4);
student1.computeAverageGrade();
document.writeln(`Average Grade of ${student1.firstName} ${student1.lastName} is ${student1.computeAverageGrade()} </br>`);


student2.firstName = "John";
student2.lastName = "Abraham";
student2.grades = [];
student2.inputNewGrade(3);
student2.inputNewGrade(3);
student2.inputNewGrade(3);
document.writeln(`Average Grade of ${student2.firstName} ${student2.lastName} is ${student2.computeAverageGrade()} </br>`);

student3.firstName = "Mona";
student3.lastName = "Lisa";
student3.grades = [];
student3.inputNewGrade(3);
student3.inputNewGrade(4);
student3.inputNewGrade(3);
document.writeln(`Average Grade of ${student3.firstName} ${student3.lastName} is ${student3.computeAverageGrade()} </br>`);


function printAverageGradeOfAllStudents(students) {
  let studentsTotalGrade = 0;
  for (let i = 0; i < students.length; i++) {
    studentsTotalGrade += students[i].computeAverageGrade();
  }
  let studentsAverageGrade = studentsTotalGrade / students.length
  document.writeln(`Total Average Grade is  ${studentsAverageGrade}  </br>`);
}


let students = [student1, student2, student3];
printAverageGradeOfAllStudents(students);

document.writeln(`</br> Answer 2 : </br> </br>`);

function Student(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.grades = [];
}
Student.prototype.inputNewGrade = function (newGrade) { this.grades.push(newGrade); };
Student.prototype.computeAverageGrade = function () {
  let sum = this.grades.reduce((sum, value) => sum + value, 0);;
  let averageGrade = sum / this.grades.length;
  return averageGrade;
};

let student4 = new Student("Priom", "Gosh");
student4.inputNewGrade(4);
student4.inputNewGrade(4);
student4.inputNewGrade(4);
document.writeln(`Average Grade of ${student4.firstName} ${student4.lastName} is ${student4.computeAverageGrade()} </br>`);

let student5 = new Student("Minu", "Das");
student5.inputNewGrade(3);
student5.inputNewGrade(3);
student5.inputNewGrade(3);
document.writeln(`Average Grade of ${student5.firstName} ${student5.lastName} is ${student5.computeAverageGrade()} </br>`);

let student6 = new Student("Joly", "Pal");
student6.inputNewGrade(3);
student6.inputNewGrade(4);
student6.inputNewGrade(3);
document.writeln(`Average Grade of ${student6.firstName} ${student6.lastName} is ${student6.computeAverageGrade()} </br>`);

students = [student4, student5, student6];
printAverageGradeOfAllStudents(students);

document.writeln(`</br> Answer 3 : </br> </br>`);
Array.prototype.studentsSort = function () {
  var compare = function (stu1, stu2) {
    if (stu1.firstName > stu2.firstName) return 1;
    else if (stu1.firstName < stu2.firstName) return -1;
    else 0;
  }
  this.sort(compare);
}
students.studentsSort();

students.forEach(stu => document.write(`${stu.firstName} ${stu.lastName} </br>`));

document.writeln(`</br> Answer 4 : </br> </br>`);

function Animal(name, speed) {
  this.name = name;
  this.speed = speed;
}
function Rabbit(name, speed) {
  Animal.call(this,name, speed);
}

Object.setPrototypeOf(Rabbit, Animal);
Object.setPrototypeOf(Rabbit.prototype, Animal.prototype);

Animal.prototype.run = function (speed) {
  this.speed +=  speed;
  document.writeln(`Current Speed of ${this.name} is ${this.speed} </br>`);
}

Animal.compareBySpeed = function (animal1, animal2) {
  if (animal1.speed > animal2.speed) {
    document.writeln(` ${animal1.name} is more speedy then ${animal2.name} !!! </br>`);
  } else if (animal1.speed < animal2.speed) {
    document.writeln(` ${animal2.name} is more speedy then ${animal1.name} !!! </br> `);
  } else {
    document.writeln(` ${animal1.name} and  ${animal2.name} both are now in same speed!!! </br>`);
  }
}

Rabbit.prototype.hide = function () {
  document.writeln(`Hides ${this.name} </br>`);
}

let rabbit1= new Rabbit("Angora" ,50);
let rabbit2= new Rabbit("Coco" ,40);
rabbit1.run(5);
rabbit2.run(20);
Rabbit.compareBySpeed(rabbit1,rabbit2);
rabbit2.hide();

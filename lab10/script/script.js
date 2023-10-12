class Student {
  #id;
  #answers;
  constructor(id) {
    this.#id = id
    this.#answers = [];
  }

  get id() {
    return this.#id
  }
  get answers() {
    return this.#answers;
  }

  addAnswer(question) {
    this.#answers.push(question);
  }
}

class Question {

  #qid;
  #answer;
  constructor(qid, answer) {
    this.#qid = qid;
    this.#answer = answer;
  }

  get qid() {
    return this.#qid;
  }
  get answer() {
    return this.#answer;
  }
  checkAnswer(answer) {
    if (this.#answer == answer) {
      return true;
    }
    return false;
  }

}
class Quiz {
  #questions = new Map();
  #students = [];
  constructor(questions, students) {

    questions.forEach(question => {
      this.#questions.set(question.qid, question.answer);
    });

    this.#students = students;

  }
  scoreStudentBySid(sid) {
    const students = this.#students.find(student => student.id == sid);
    let score = students.answers.reduce((sum, stuAnswer) => {
      const correctAnswer = this.#questions.get(stuAnswer.qid);
      if (correctAnswer && stuAnswer.checkAnswer(correctAnswer)) {
        return sum + 1;
      }
      return sum;
    }, 0);

    return score;
    // Alternative Answer
    /*
    let score = 0;
    students[0].questions.forEach(question => {
      if (question.answer == this.#questions.get(question.qid)) {
        score++;
      }
    })
    return score;*/
  }
  getAverageScore() {
    let totalScore = this.#students.reduce((sum, student) => sum + this.scoreStudentBySid(student.id), 0);
    return totalScore / this.#students.length;
    // Alternative Answer
    /*
    const studentsIds = this.#students.map((student) => student.id);
    const studentsScores=studentsIds.map((id)=>this.scoreStudentBySid(id));
    let totalScore = studentsScores.reduce((sum, value) => sum + value, 0);
        return totalScore/studentsIds.length;
    */
  }
}

const student1 = new Student(10);
student1.addAnswer(new Question(2, 'a'));
student1.addAnswer(new Question(3, 'b'));
student1.addAnswer(new Question(1, 'b'));
const student2 = new Student(11);
student2.addAnswer(new Question(3, 'b'));
student2.addAnswer(new Question(2, 'a'));
student2.addAnswer(new Question(1, 'd'));
const students = [student1, student2];
const questions = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b')];
const quiz = new Quiz(questions, students);
let scoreforStudent10 = quiz.scoreStudentBySid(10);
console.log(scoreforStudent10); //Expected Result: 3 
let scoreforStudent11 = quiz.scoreStudentBySid(11);
console.log(scoreforStudent11); //Expected Result: 2 
let average = quiz.getAverageScore();
console.log(average); //Expected Reuslt: 2.5

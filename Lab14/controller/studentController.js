const Student = require("../model/student");

let controller = {
    getStudents: function (req, res, next) {
        res.status(200).json(Student.getAll());
    },
    getStudentById: function (req, res, next) {
        let id = parseInt(req.params.id);
        let student = Student.getById(id)
        if (student) {
            res.status(200).json(student);
        }
        else {
            res.status(404).json({ message: "Student not Found" });
        }
    },
    createStudent: function (req, res, next) {
        let { id, fullName, program } = req.body;
        if (id && fullName && program) {
            let newStudent = new Student(id, fullName, program);
            newStudent.create();
            res.status(201).json(newStudent);
        }
        else {
            res.status(400).json({ message: "Please Provide All Data" });
        }
    },
    deleteStudent: function (req, res, next) {
        let id = parseInt(req.params.id);
        let student = Student.removeById(id)
        if (student) {
            res.status(200).json(student);
        }
        else {
            res.status(404).json({ message: "Student not Found" });
        }
    },
    updateStudent: function (req, res, next) { 
      
        let { id, fullName, program } = req.body;
        if (id && fullName && program) {
          
            let student = new Student(id, fullName, program);
            //student.update();
            res.status(201).json(student.update());
        }
        else {
            res.status(400).json({ message: "No such Student Found" });
        }
    },
    filterByProgram : function (req, res, next) { 
        let id = parseInt(req.params.id);
        let program = req.params.program;
        let students = Student.getPrograms(id,program)
        if (students) {
            res.status(200).json(students);
        }
        else {
            res.status(404).json({ message: "Student not Found" });
        }
    },
}

module.exports = controller;
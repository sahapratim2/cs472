const students = [
{ id: 616410,fullName: 'Anna Johns', program: 'Compro'},
{ id: 616411,fullName: 'Partha', program: 'MBA'},
{ id: 616412,fullName: 'Pratim', program: 'Compro'}];
class Student{
    constructor(id, fullName, program)
    {
        this.id=parseInt(id);
        this.fullName=fullName;
        this.program=program;
    }
    create (){
        students.push(this);
    }
    static getById(id){
        return students.find(s=> s.id==id);
    }
    static getAll(){
        return students;
    }
    static removeById(id){
        let index= students.findIndex(s=> s.id===id);
        let deletedStudent;
        if(index>=0){
            deletedStudent=students[index];
            students.splice(index,1);
            return deletedStudent;
        }
        return deletedStudent;
    }
    update(){
        let updateStudent=students.find(s=> s.id==this.id);
            if(updateStudent!=null){
            updateStudent.fullName=this.fullName;
            updateStudent.program=this.program;
            return this;
        }
        return updateStudent;
    }
    static getPrograms(id,program){
        return students.find(s=> s.id==id && s.program==program);
    }
};

module.exports = Student;
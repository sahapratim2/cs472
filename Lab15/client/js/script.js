window.onload = display;
let ddlStudentForUpdate=document.getElementById('ddlStudentForUpdate');
let ddlStudent=document.getElementById('ddlStudent');
async function display() {
    let response = await fetch("http://localhost:5000/students");
    let json;
    if (response.ok) {
        json = await response.json();
        for (let e of json) {
            addRowToTable(e.id, e.fullName, e.program);
            addDropDownOption(e.id, e.fullName,e.program,ddlStudentForUpdate);
            addDropDownOption(e.id, e.fullName,e.program,ddlStudent);
        }
    }
    else alert("Error" + response.status);
}
async function addStudent(id, fullName, program) {
    let obj = { id, fullName, program };
    let setting = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": 'application/json' }
    }
    let response = await fetch("http://localhost:5000/students", setting);
    if (response.ok) {
        addRowToTable(id, fullName, program);
        addDropDownOption(id, fullName,program,ddlStudentForUpdate);
        addDropDownOption(id, fullName,program,ddlStudent);
    } else alert("Error " + response.status);
}
async function updateStudent(id, fullName, program) {
    let obj = { id, fullName, program };
    let setting = {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: { "Content-Type": 'application/json' }
    }
    let response = await fetch("http://localhost:5000/students", setting);
    if (response.ok) {

        ddlStudentForUpdate.options[ddlStudentForUpdate.selectedIndex].text=fullName;
        ddlStudentForUpdate.options[ddlStudentForUpdate.selectedIndex].desc=program;

        ddlStudent.options[ddlStudentForUpdate.selectedIndex].text=fullName;
        ddlStudent.options[ddlStudentForUpdate.selectedIndex].desc=program;
        
        let tr=document.getElementById(id);
        tr.cells[1].innerText=fullName;
        tr.cells[2].innerText=program;
        document.getElementById('myform').reset();
      
    } else alert("Error " + response.status);
}
async function deleteStudent(id) {
    let setting = {
        method: "DELETE"
    }
    let response = await fetch("http://localhost:5000/students/"+id, setting);
    if (response.ok) {
        let ddl=document.querySelector('#ddlStudent');
        document.querySelector('#ddlStudentForUpdate').remove(ddl.selectedIndex);
        ddl.remove(ddl.selectedIndex)
        document.getElementById(id).remove();
    } 
    else alert("Error " + response.status);
}
function addRowToTable(id, fullName, program) {
    let row = document.createElement('tr');
    row.setAttribute("id", id);
    for (let e of arguments) {
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(e));
        row.appendChild(cell);
    }
    document.getElementById('tbodyStudentList').appendChild(row);
}
function addDropDownOption(id, fullName,program,ddl) {
    let option = document.createElement("option");
    option.text=fullName;
    option.id=id;
    option.value=id;
    option.desc=program;
    ddl.add(option);
  }

document.getElementById('btnRegister').addEventListener("click", () => {
    let id = document.getElementById('id').value;
    let fullName = document.getElementById('name').value;
    let program = document.getElementById('program').value;
    addStudent(id, fullName, program);
    document.getElementById('myform').reset()
});
document.getElementById('btnDelete').addEventListener("click", () => {
    let id=document.querySelector('#ddlStudent').value;
    if(id!='Select')
    {
        deleteStudent(id);
    }
    else
    {
        alert("Select a Student!!!");
    }
    
});



document.getElementById('btnUpdate').addEventListener("click", () => {

    if(document.getElementById('idForUpdate').value!='')
    {
        let id = document.getElementById('idForUpdate').value;
        let fullName = document.getElementById('nameForUpdate').value;
        let program = document.getElementById('programForUpdate').value;
        updateStudent(id, fullName, program);
    }
    else
    {
        alert("Select a Student!!!");
    }
});

ddlStudentForUpdate.addEventListener("change", function () {
    if(this.selectedIndex>0)
    {
        document.getElementById('idForUpdate').value=this.options[this.selectedIndex].value;
        document.getElementById('nameForUpdate').value=this.options[this.selectedIndex].text;
        document.getElementById('programForUpdate').value=this.options[this.selectedIndex].desc;
    }
    else
    {
        document.getElementById('idForUpdate').value='';
        document.getElementById('nameForUpdate').value='';
        document.getElementById('programForUpdate').value='';
    }

});
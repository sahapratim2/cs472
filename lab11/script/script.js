document.getElementById("btnRegisterPatient").addEventListener("click", function (event) {
    let patientsInfo = getPatientsInfo();
    let table = document.getElementById("tbodyPatientsList")
    let tr = document.createElement('tr');
    patientsInfo.forEach(info=> tr.appendChild(createTD(info)));
    table.appendChild(tr);
    event.preventDefault()
});

function createTD(value) {
    let td = document.createElement('td');
    td.innerHTML = value;
    return td;
}
function getOutpatient() {
    var radios = document.getElementsByName('radioIsOutPatient');
    let isOutPationt='No';
    radios.forEach(rdo=>
        {
            if(rdo.checked){
                isOutPationt= rdo.value;
            }
        });
    return isOutPationt
}
function getPatientsInfo() {
    let patientsInfo = [];
    patientsInfo.push(document.getElementById("patientIdNumber").value);
    patientsInfo.push(document.getElementById("firstName").value);
    patientsInfo.push(document.getElementById("middleInitials").value);
    patientsInfo.push(document.getElementById("lastName").value);
    patientsInfo.push(document.getElementById("dateOfBirth").value);
    patientsInfo.push(document.getElementById("ddlDepartment").selectedOptions[0].value);
    patientsInfo.push(getOutpatient());
    return patientsInfo;
}
document.getElementById("chkElderlyPatients").addEventListener("click", function () {
    displayPatients();
});
document.getElementById("chkShowOutPatients").addEventListener("click", function () {
    displayPatients();
});

function getAge(dateOfBirth) {
    if (dateOfBirth != null && dateOfBirth != '') {
        let dob = new Date(dateOfBirth);
        let yearDob = dob.getFullYear();
        let monthDob = dob.getMonth() + 1;
        let dayDob = dob.getDate();

        let yearNow = new Date().getFullYear();
        let monthNow = new Date().getMonth() + 1;
        let dayNow = new Date().getDate();
        if (monthNow === monthDob && dayNow < dayDob || monthNow < monthDob) {
            return yearNow - yearDob - 1;
        } else {
            return yearNow - yearDob;
        }
    }
};

function displayPatients()
{
    let elderlyPatients=document.getElementById("chkElderlyPatients").checked;
    let outPatients=document.getElementById("chkShowOutPatients").checked;
    let table = document.getElementById("tbodyPatientsList")
    let rows = table.children;
    for (let tr of rows) {
        let age = getAge(tr.cells[4].innerText);
        let isOutPationt=tr.cells[6].innerText;
        if(elderlyPatients && outPatients)
        {
            if(age>=65 && isOutPationt=='Yes' )
            {
                tr.className=""; 
            }
            else 
            {
                tr.className="d-none";
            }
        }
        else if(elderlyPatients && !outPatients)
        {
           if(age<65)
            {
                tr.className="d-none"; 
            }
            else 
            {
                tr.className=""; 
            }
        }
        else if(!elderlyPatients && outPatients)
        {
            if(isOutPationt=='Yes' )
            {
                tr.className=""; 
            }
            else 
            {
                tr.className="d-none"; 
            }
        }
        else 
        {
            tr.className=""; 
        }

    }

}
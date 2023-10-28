window.onload = display;
let ddlCustomer = document.getElementById('ddlCustomer');
function display() {
    let user = sessionStorage.getItem("user");
    if (user) {
        let isAdmin = JSON.parse(user).user[0].isAdmin
        if (!isAdmin) {
            document.getElementById('divButton').style.display = 'none';
            document.getElementById('divSearch').style.display = 'none';
        }
    }
    const form = document.getElementById("frmCustomer");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (event.submitter.id == 'btnSubmit') {
            submit('save');
        }
        if (event.submitter.id == 'btnUpdate') {
            submit('update');
        }
        if (event.submitter.id == 'btnDelete') {
            deleteCustomer();
        }

    });

    loadCustomer();
}

async function addCustomer(firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password,isAdmin) {
    let user = sessionStorage.getItem("user");
    if (user) {
        let obj = { firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password ,isAdmin};
        let setting = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/users", setting);
        let json = await response.json();
        if (response.ok) {
            addDropDownOption(json.userId, json.fullName, ddlCustomer);
            alert("Data Saved Successfully");
            document.getElementById('frmCustomer').reset()
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else {
            alert("Error : " + json.message);
        }
    }
    else {
        isLoggedIn();
    }

}

async function updateCustomer(userId, firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password,isAdmin) {
    let user = sessionStorage.getItem("user");
    if (user) {
        let obj = { firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password,isAdmin };
        let setting = {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/users/" + userId, setting);
        let json = await response.json();
        if (response.ok) {
            ddlCustomer.options[ddlCustomer.selectedIndex].text = json.fullName;
            alert("Data Updated Successfully");
            document.getElementById('frmCustomer').reset()
        }
        else if (response.status === 401) {
            isLoggedIn();
        } else {
            alert("Error : " + json.message);
        }
    }
    else {
        isLoggedIn();
    }
}


async function deleteCustomer() {
    if (ddlCustomer.value == undefined || ddlCustomer.value == null || ddlCustomer.value == '') {
        alert("Please Select a Customer!!!");
    }
    else {
        let user = sessionStorage.getItem("user");
        if (user) {
            let setting = {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": JSON.parse(user).token
                }
            }
            let response = await fetch("http://localhost:5000/users/" + ddlCustomer.value, setting);
            let json = await response.json();
            if (response.ok) {
                let selectedIndex = ddlCustomer.selectedIndex;
                document.querySelector('#ddlCustomer').remove(selectedIndex);
                alert("Data Deleted Successfully");
                document.getElementById('frmCustomer').reset();
             
            }
            else if (response.status === 401) {
                isLoggedIn();
            }
            else {
                alert("Error : " + json.message);
            }
        }
        else {
            isLoggedIn();
        }
    }
}

function submit(type) {
    let firstName = document.getElementById('firstName').value;
    let middleName = document.getElementById('middleName').value;
    let lastName = document.getElementById('lastName').value;
    let ssn = document.getElementById('ssn').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    let address = document.getElementById('address').value;
    let userName = document.getElementById('userName').value;
    let password = document.getElementById('password').value;
    let isAdmin =document.getElementById("isAdmin").checked;
    if (type == 'save') {
        addCustomer(firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password,isAdmin);
    }
    else if (type == 'update') {
        if (ddlCustomer.value == undefined || ddlCustomer.value == null || ddlCustomer.value == '' || ddlCustomer.value == 'null') {
            alert("Please Select a Customer!!!");
        }
        else {
            updateCustomer(ddlCustomer.value, firstName, middleName, lastName, ssn, phoneNumber, email, address, userName, password,isAdmin);
        }
    }

}

async function loadCustomer() {
    let user = sessionStorage.getItem("user");
    if (user) {
        if (!JSON.parse(user).user[0].isAdmin) {
            let userId = JSON.parse(user).user[0].userId;
            let fullName = JSON.parse(user).user[0].fullName;
            addDropDownOption(userId, fullName, ddlCustomer);
            getCustomer();
        }
        else {
            let setting = {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": JSON.parse(user).token
                }
            }
            let response = await fetch("http://localhost:5000/users/", setting);
            let json = await response.json();
            if (response.ok) {
                addDropDownOption(null, "", ddlCustomer);
                for (let e of json) {
                    addDropDownOption(e.userId, e.fullName, ddlCustomer);
                }
            }
            else if (response.status === 401) {
                isLoggedIn();
            }
            else alert("Error : " + json.message);
        }
    }
    else {
        isLoggedIn();
    }
}

async function searchCustomer(searchBy, searchValue) {
    let user = sessionStorage.getItem("user");
    if (user) {
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/users/search?param=" + searchBy + "&value=" + searchValue,setting);
        let json = await response.json();
        if (response.ok) {
            setCustomerData(json);
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else alert("Error : " + json.message);
    }
    else {
        isLoggedIn();
    }
}

document.getElementById('btnSearch').addEventListener('click', function (event) {
    event.preventDefault();
    let searchBy = document.getElementById('ddlSearchBy').value;
    let searchValue = document.getElementById('searchValue').value
    searchCustomer(searchBy, searchValue);
})

ddlCustomer.addEventListener('change', function (event) {
    if (ddlCustomer.value != undefined && ddlCustomer.value != null && ddlCustomer.value != '' && ddlCustomer.value !='null') {
        getCustomer();
    }
   
})

async function getCustomer() {
    let user = sessionStorage.getItem("user");
    if (user) {
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/users/" + ddlCustomer.value, setting);
        let json = await response.json();
        if (response.ok) {
            setCustomerData(json);
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else alert("Error : " + json.message);
    }
    else {
        isLoggedIn();
    }
}

function setCustomerData(json) {
    document.getElementById('firstName').value = json.firstName;
    document.getElementById('middleName').value = json.middleName;
    document.getElementById('lastName').value = json.lastName;
    document.getElementById('ssn').value = json.ssn;
    document.getElementById('phoneNumber').value = json.phoneNumber
    document.getElementById('email').value = json.email;
    document.getElementById('address').value = json.address;
    document.getElementById('userName').value = json.userName;
    document.getElementById('password').value = json.password;
    document.getElementById("isAdmin").checked=json.isAdmin;
    ddlCustomer.value = json.userId;
}
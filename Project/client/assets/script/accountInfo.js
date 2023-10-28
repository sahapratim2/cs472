window.onload = display;
let ddlCustomer = document.getElementById('ddlCustomer');
function display() {
    const form = document.getElementById("frmAccount");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        submit();
    });
    loadCustomer();

}


async function addAccount(userId, accountNumber, accountType) {
    let user = sessionStorage.getItem("user");
    if (user) {
        let obj = { userId, accountNumber, accountType };
        let setting = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/accounts", setting);
        let  json = await response.json();
        if (response.ok) {
            alert("Data Saved Successfully");
            document.getElementById('frmAccount').reset()
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else {
            alert("Error :" +  json.message);
        }
    }
    else {
        isLoggedIn();
    }
}


function submit() {
    let userId = ddlCustomer.value;
    let accountNumber = document.getElementById('accountNumber').value;
    let accountType = document.getElementById('accountType').value;
    addAccount(userId, accountNumber, accountType);

}

async function loadCustomer() {
    let user = sessionStorage.getItem("user");
    if (user) {
        if (!JSON.parse(user).user[0].isAdmin) {
            let userId = JSON.parse(user).user[0].userId;
            let fullName = JSON.parse(user).user[0].fullName;
            addDropDownOption(userId, fullName, ddlCustomer);
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
            let  json = await response.json();
            if (response.ok) {
                for (let e of json) {
                    addDropDownOption(e.userId, e.fullName, ddlCustomer);
                }
            }
            else if (response.status === 401) {
                isLoggedIn();
            }
            else alert("Error :" + json.message);
        }
    }
    else {
        isLoggedIn();
    }
}

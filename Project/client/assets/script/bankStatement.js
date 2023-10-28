window.onload = display;
let ddlAccount = document.getElementById('ddlAccount');
function display() {
    loadAccount();
}
async function loadAccount() {
    let user = sessionStorage.getItem("user");
    if (user) {
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let userId = JSON.parse(user).user[0].userId;
        let response = await fetch("http://localhost:5000/accounts/ownAccount/" + userId,setting);
        let json = await response.json();
        if (response.ok) {
            for (let e of json) {
                addDropDownOption(e.accountNumber, e.accountNumber + "-" + e.accountType, ddlAccount);
            }
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else alert("Error" + json.message);
    }
    else {
        isLoggedIn();
    }
}

ddlAccount.addEventListener('change', function (event) {
    if (this.value != undefined && this.value != null && this.value != '' && this.value != 'null' && this.value != 'Select') {
        getStatement(this.value);
    }
    else {
        let table = document.getElementById("tbodyStatement")
        table.innerHTML = "";
    }
});

async function getStatement(accountNumber) {
    let user = sessionStorage.getItem("user");
    let table = document.getElementById("tbodyStatement")
    document.getElementById('divSubmit').style.display = 'none';
    table.innerHTML = "";
    if (user) {
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/accountTransactions/" + accountNumber,setting);

        let json = await response.json();
        if (response.ok) {
            if (json.length > 0) {
                document.getElementById('divSubmit').style.display = 'block';
                let sum = 0;
                let td;
                for (let e of json) {
                    let tr = document.createElement('tr');
                    tr.id = e.id;
                    table.appendChild(tr);
                    tr.appendChild(createTD(e.transactionDate));
                    tr.appendChild(createTD(e.remark));
                    sum = parseFloat(sum) + parseFloat(e.amount);
                    td = createTD(parseFloat(e.amount));
                    td.style.textAlign = "right";
                    tr.appendChild(td);
                    td = createTD(parseFloat(sum));
                    td.style.textAlign = "right";
                    tr.appendChild(td);
                }
                td.style.fontWeight = "900";
                td.style.color = "#00AA00";
            }

        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else alert("Error" + json.message);
    }
    else {
        isLoggedIn();
    }
}

function createTD(value) {
    let td = document.createElement('td');
    td.innerHTML = value;
    return td;
}

document.getElementById('btnSubmit').addEventListener('click', function () {

    let user = sessionStorage.getItem("user");
    if (user) {
        var divContents = document.getElementById('divStatemant').innerHTML;
        var a = window.open('', '', 'height=400, width=600');
        a.document.write('<html>');
        a.document.write('<body > <h3>Bank Statement <br> <h4>Name : ' + JSON.parse(user).user[0].fullName + '<br> <h4>Account : ' + ddlAccount.options[ddlAccount.selectedIndex].text + '<br><br>');
        a.document.write(divContents);
        a.document.write('</body></html>');
        a.document.close();
        a.print();
    }
})

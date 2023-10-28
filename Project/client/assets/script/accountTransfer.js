window.onload = display;
let ddlAccount = document.getElementById('ddlAccount');
let ddlToAccount = document.getElementById('ddlToAccount');
function display() {

    const form = document.getElementById("frmTransfer");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        submit();
    });
    loadAccount();
    loadBanificiary();
   
}

async function transfer(accountNumber, transactionDate, amount, remark, type, toAccount) {
    let user = sessionStorage.getItem("user");
    if (user) {
        let obj = { accountNumber, transactionDate, amount, remark, type, toAccount };
        let setting = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/accountTransactions", setting)
        let json = await response.json();
        if (response.ok) {

            alert("Amount Deposited Successfully and Your Current Balance is : " + json.message);
            document.getElementById('frmTransfer').reset()
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        else {
            alert("Error " + json.message);
        }
    }
    else  {
        isLoggedIn();
    }
}

function submit() {
    let accountNumber = ddlAccount.value;
    let toAccount = ddlToAccount.value;
    let transactionDate = document.getElementById('transactionDate').value;
    let amount = document.getElementById('amount').value;
    let remark = document.getElementById('remark').value;
    let type = 'transfer';
  
    transfer(accountNumber, transactionDate, amount, remark, type, toAccount);
}

async function loadAccount()
{
    let user = sessionStorage.getItem("user");
    if (user) {
        let userId = JSON.parse(user).user[0].userId;
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
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

async function loadBanificiary()
{
    let user = sessionStorage.getItem("user");
    if (user) {
        let userId = JSON.parse(user).user[0].userId;
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/accounts/banificiary/" + userId,setting);
        let json = await response.json();
        if (response.ok) {
            for (let e of json) {
                addDropDownOption(e.accountNumber, e.fullName + "-"+ e.accountNumber + "-" + e.accountType, ddlToAccount);
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


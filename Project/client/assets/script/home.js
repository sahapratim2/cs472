window.onload = display;
function display() {
    getBalance();
}

async function getBalance() {
    let user = sessionStorage.getItem("user");
    let table = document.getElementById("tbodyStatement")
    document.getElementById('divStatemant').style.display = 'none';
    table.innerHTML = "";
    if (user) {
        let userId = JSON.parse(user).user[0].userId;
        let setting = {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": JSON.parse(user).token
            }
        }
        let response = await fetch("http://localhost:5000/accounts/balance/" + userId,setting);
        let json = await response.json();
        if (response.ok) {
            if (json.length > 0) {
                document.getElementById('divStatemant').style.display = 'block';
                let sum = 0;
                let td;
                for (let e of json) {
                    let tr = document.createElement('tr');
                    tr.id = e.id;
                    table.appendChild(tr);
                    tr.appendChild(createTD(e.accountNumber));
                    tr.appendChild(createTD(e.accountType));
                    td = createTD(parseFloat(e.balance));
                    td.style.textAlign = "right";
                    tr.appendChild(td);
                    td.style.fontWeight = "900";
                   // td.style.color = "#00AA00";
                }
        
            }
        }
        else if (response.status === 401) {
            isLoggedIn();
        }
        //else alert("Error" + json.message);
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

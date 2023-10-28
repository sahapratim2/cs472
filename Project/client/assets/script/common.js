document.addEventListener("DOMContentLoaded", function () {
    isLoggedIn();
});
//window.onload = isLoggedIn();
var rootPath = GetRootPath();
function GetRootPath() {
    var scripts = document.getElementsByTagName('script');
    var path = scripts[scripts.length - 1].src.split('?')[0];
    path = path.split('/').slice(0, -3).join('/');
    return path;
}

function isLoggedIn() {
    if (!rootPath) {
        rootPath = GetRootPath();
    }
    let user = sessionStorage.getItem("user");
    if (user && !location.pathname.includes('/views')) {

        if (user && (location.pathname.includes('index.html') || location.pathname.includes('/')) && !location.pathname.includes('/views/home')) {
            location.href = rootPath + '/views/home.html'
        }
    }
    else if (user && location.pathname.includes('/views')) {
        document.getElementById('lgnUserName').text = "Hello, " + JSON.parse(user).user[0].fullName + " !";
        let isAdmin = JSON.parse(user).user[0].isAdmin
        if (!isAdmin) {
            let ui = document.querySelector('#menuList');
            ui.removeChild(document.getElementById('liAccount'));
            ui.removeChild(document.getElementById('liDeposit'));
            ui.removeChild(document.getElementById('liWithdraw'));
        }

    }
    else if (!user && location.pathname.includes('/views')) {
        location.href = rootPath + '/index.html'
    }

}

function logout() {
    sessionStorage.removeItem("user");
    isLoggedIn();
}

document.getElementById('btnLogout').addEventListener("click", () => {
    logout()
});

function addDropDownOption(id, value, ddl) {
    let option = document.createElement("option");
    option.text = value;
    option.id = id;
    option.value = id;
    ddl.add(option);
}

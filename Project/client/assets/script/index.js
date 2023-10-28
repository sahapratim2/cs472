document.addEventListener("DOMContentLoaded", function() {
    isLoggedIn();
    const form = document.getElementById("login-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        login();
    });
});


async function login() {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;
    if (userName.trim().length > 0 && password.trim().length > 0) {
       await fetch('http://localhost:5000/users/auth', {
            method: 'POST',
            body: JSON.stringify({
                userName: userName.toLowerCase(),
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Invalid username or password!");
            }
        })
        .then(data => {
            if (data && data.hasOwnProperty("token")) {
                sessionStorage.setItem("user", JSON.stringify(data));
                isLoggedIn();
            }
        });
    }
}

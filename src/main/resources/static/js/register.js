function registerIt(){
    var username = document.getElementById("usernameInput1").value;
    var password = document.getElementById("passwordInput1").value;
    console.log(username,password);

    //校验注册
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://139.224.251.185:5050/user/register", requestOptions)
        .then(response => response.text())
        .then(result => showRegister(result))
        .catch(error => console.log('error', error));
}

function showRegister(result){
    if(result === "true"){
        alert("注册成功");
        // window.location.href="http://localhost:8080/login.html"
    }
}
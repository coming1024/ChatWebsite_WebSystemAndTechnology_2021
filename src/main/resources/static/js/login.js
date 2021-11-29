var loginUsername;

function clickIt(){
    alert("enter");
    var username = document.getElementById("usernameInput").value;
    // alert("get");
    var password = document.getElementById("passwordInput").value;
    // loginUsername = username;////
    // console.log(loginUsername);
    localStorage.setItem("logName",username);/////跨页面传递值
    // console.log(loginName);
    console.log(password,username);
    //输入检验
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/user/login", requestOptions)
        .then(response => response.text())
        .then(result => showLogin(result))
        .catch(error => console.log('error',error));
}

function showLogin(result){
    if(result === "true"){
        alert("登录成功");
        window.location.href="http://localhost:8080/home.html"
    }
    else{alert("登录失败");}
}

function gotoResgiter(){
    window.location.href="http://localhost:8080/register.html"
}


function testClick(){
    alert("fuck");
}
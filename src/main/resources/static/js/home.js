
var targetedUsername;//search栏查找的username
var websocket = null;

// document.write(loginUsername);
// document.getElementById('inputLoginUsername').innerHTML=localStorage.getItem("logName");
// alert(localStorage.getItem("logName"));
// document.getElementById('inputLoginUsername').innerHTML=localStorage.getItem("logName");
//建立websocket//
var mylogname = localStorage.getItem("logName");
if ('WebSocket' in window){
    alert("support websocket");
    websocket = new WebSocket('ws://localhost:8080/connectWebSocket/'+mylogname);
    console.log(websocket)
}
else {
    alert("not support websocket");
}
//-----//

function SearchUser(){
    var username = document.getElementById("inputUsername").value;
    targetedUsername = username;
    console.log(username)
    var loginName = localStorage.getItem("logName");
    console.log(loginName)
    //document.getElementById('inputLoginUsername').innerHTML=localStorage.getItem("logName");
    // $.getScript("./js/login.js",function (){
    //     console.dir(loginUsername)
    // })

    var formdata = new FormData();
    formdata.append("username", username);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/user/checkusername", requestOptions)
        .then(response => response.text())
        .then(result => whetherExistUsername(result))
        .catch(error => console.log('error', error));
}

function addDomUser(username){
    //添加姓名
    var userspan = document.createElement("span");
    userspan.className="userspan";
    var node = document.createTextNode(username);
    userspan.appendChild(node);
    /////
    userspan.onclick= Function("gotoDiscussionWindow()");//新增对象动态新增方法

    //添加图片
    var userimg = document.createElement("img");
    userimg.className="userimg";
    userimg.src="http://placehold.it/40x40";
    //添加li
    var userli = document.createElement("li");
    userli.appendChild(userimg);
    userli.appendChild(userspan);
    var element = document.getElementById("UserInfoInsert");
    element.appendChild(userli);

}

function createUserStyle(){
    return".userimg{border-radius: 20px; vertical-align: middle;}.userspan{margin-left: 16px;}"
}

function addUserStyle(){
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = createUserStyle();
    window.document.head.appendChild(style);
}

function whetherExistUsername(result){
    if(result==="true"){
        alert(result);
        addUserStyle();
        addDomUser(targetedUsername);
        //testWebSocket();//建立新的websocket通信
        //window.onload(targetedUsername);
        // window.onload=function (){
        //     alert("ho");
        //     // addUserStyle();
        //     // addDomUser(targetedUsername);
        //     //NewAddDomUser(targetedUsername);
        // }
    }
    else{
        alert("not found!");
    }
}


// window.onload=function (username){
//     addUserStyle();
//     addDomUser(username);
//     //NewAddDomUser();
// }

function gotoPersonalCenter(){
    // localStorage.setItem("thisFriendName",targetedUsername);
    // window.location.href="http://localhost:8080/friendCenter.html"
    window.location.href="http://localhost:8080/personalCenter.html"
}

function gotothisPersonCenter(){
    alert(targetedUsername);
    localStorage.setItem("thisFriendName",targetedUsername);
    alert(localStorage.getItem("thisFriendName"))
    window.location.href="http://localhost:8080/friendCenter.html"
}

function NewAddDomUser(){
    var element = document.getElementById("UserInfoInsert");
    element.innerHTML="<li><span>"+"nihao"+"</span></li>"
}

function gotoDiscussionWindow(){//动态加载聊天栏上方的username
   var span=document.getElementById("wantedChangingName");
   span.innerHTML=targetedUsername;

    //每次加载新的对话框清除会话框内容
   // var child = document.getElementById("webSocketInputPlace");
   // child.parentNode.removeChild(child);
    var parent = document.getElementById("messageBox");
    var childs = parent.childNodes;
    for(var i = childs .length - 1; i >= 0; i--) {
        parent.removeChild(childs[i]);
    }

   console.log(document.getElementById("messageBox").innerHTML)
   // $('#message').html("");

}

///////////////***WebSocket***/////////////////

// function testWebSocket(){
//     var host = document.location.host;
//     var mylogname = localStorage.getItem("logName");
//     if ('WebSocket' in window){
//         alert("support websocket");
//         websocket = new WebSocket('ws://localhost:8080/connectWebSocket/'+mylogname);
//         console.log(websocket)
//     }
//     else {
//         alert("not support websocket");
//     }
//
// }

//连接发生错误的回调方法
websocket.onerror = function() {
    alert("WebSocket连接发生错误")
    //setMessageInnerHTML("WebSocket连接发生错误");
}

//连接成功建立的回调方法
websocket.onopen = function() {
    alert("WebSocket连接成功")
    //setMessageInnerHTML("WebSocket连接成功");
}

//接收到消息的回调方法
websocket.onmessage = function(event) {
    setMessageInnerHTML(event.data,1);
    // alert(typeof event)

    // alert("接收到消息的回调方法")
    // alert("这是后台推送的消息："+event.data);
    // websocket.close();
    // alert("webSocket已关闭！")
}

//连接关闭的回调方法
websocket.onclose = function() {
    setMessageInnerHTML("WebSocket连接关闭");
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
window.onbeforeunload = function() {
    closeWebSocket();
}

//关闭WebSocket连接
function closeWebSocket() {
    websocket.close();
}


////--------////
//将消息显示在网页上
function setMessageInnerHTML(innerHTML,num) {
    //document.getElementById('webSocketInputPlace').innerHTML += innerHTML + '<br/>';
    //alert(innerHTML);
    addMessageStyle();
    addMessageDom(innerHTML,num);
}

function createMessageStyle(){
    return ".messageImg{border-radius: 20px; vertical-align: top;}";
}

function addMessageStyle(){
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = createMessageStyle();
    window.document.head.appendChild(style);
}

function addMessageDom(message,num){
    var fileCheck = message.slice(0,2);
    //添加消息内容
    var messageP = document.createElement("p");
    messageP.className="msgcard";
    var node = document.createTextNode(message);
    messageP.appendChild(node);
    //添加文件图标
    if(fileCheck==="文件"){
        var fileImg = document.createElement("img");
        fileImg.src="./img/file.png"
        fileImg.className="messageImg"
        fileImg.width=30;
        fileImg.height=30;
        fileImg.onclick=Function("downloadFile()");
    }
    //添加img
    var messageImg = document.createElement("img");
    messageImg.src="http://placehold.it/40x40";
    messageImg.className = "messageImg";
    //添加li
    var messageP2 = document.createElement("p");
    if(num===1){
        messageP2.appendChild(messageImg);
        messageP2.appendChild(messageP);
        if(fileCheck==="文件"){
            messageP2.appendChild(fileImg);
        }
    }
    else{
        if(fileCheck==="文件"){
            messageP2.appendChild(fileImg);
        }
        messageP2.appendChild(messageP);
        messageP2.appendChild(messageImg);
    }
    // messageP2.className="messageLi"
    // //添加ul
    var messageDiv = document.createElement("div");
    messageDiv.appendChild(messageP2);
    // messageDiv.className="ulright";
    // var element = document.getElementById("webSocketInputPlace");
    var element = document.getElementById("messageBox");
    element.appendChild(messageDiv);

    messageDiv.style.overflow="hidden";
    if(num===1){
        messageP2.style.float="left";
    }
    else{
        messageP2.style.float="right";
    }
}

//发送消息
function send(){
    var message = document.getElementById('testWebsocket').value;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/websocket/sendTo?msg="+message+"&userId="+targetedUsername, requestOptions)
        .then(response => response.text())
        .then(result => setMessageInnerHTML(result,2))
        .catch(error => console.log('error', error));
    //websocket.send(message);
}

//下载文件
function downloadFile(){
    window.location.href=localStorage.getItem("fileURL");
}
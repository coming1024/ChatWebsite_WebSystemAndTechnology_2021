
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
    websocket = new WebSocket('ws://139.224.251.185:5050/connectWebSocket/'+mylogname);
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

    fetch("http://139.224.251.185:5050/user/checkusername", requestOptions)
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
    window.location.href="http://139.224.251.185:5050/personalCenter.html"
}

function gotothisPersonCenter(){
    alert(targetedUsername);
    localStorage.setItem("thisFriendName",targetedUsername);
    alert(localStorage.getItem("thisFriendName"))
    window.location.href="http://139.224.251.185:5050/friendCenter.html"
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

    //清除对话框内容后从数据库加载历史聊天记录
    //获取历史聊天信息
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://139.224.251.185:5050/user/getAllMessage?fromUsername=cyh&toUsername=mingbao", requestOptions)
        .then(response => response.text())
        .then(result => dealHistoryMessage(result))
        .catch(error => console.log('error', error));
    //结束获取聊天信息

   console.log(document.getElementById("messageBox").innerHTML)
   // $('#message').html("");

}

function dealHistoryMessage(result){
    var HistoryMsgList = JSON.parse(result);
    console.log(HistoryMsgList);
    for (var i=0;i<HistoryMsgList.length;i++){
        // if(HistoryMsgList[i]["fromUsername"]===localStorage.getItem("logName")){
            setMessageInnerHTML(HistoryMsgList[i]["messageContent"],2);
        // }
        // else{
        //     setMessageInnerHTML(HistoryMsgList[i]["messageContent"],1);
        // }

    }
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
    ///
    var deleteCheck = message.split(":");
    //删除消息
    if(deleteCheck[0]==="删除"){
        var allMessage=document.getElementsByClassName("msgcard");
        for (var i=0;i<allMessage.length;i++){
            if(allMessage[i].innerHTML===deleteCheck[1]){
                allMessage[i].parentNode.parentNode.parentNode.removeChild(allMessage[i].parentNode.parentNode)
            }
        }
    }
    else{
        //不需要删除消息则显示消息


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
        messageDiv.className="messageDiv";
        //
        //添加点击事件，进行转发或删除操作
        messageDiv.onclick=function (event){
            messageDiv.id="msgDelete";
            operateMessage(event,message);
        }
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
}

//发送消息
function send(){



    //通过websocket广播到对应的人
    var message = document.getElementById('testWebsocket').value;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://139.224.251.185:5050/websocket/sendTo?msg="+message+"&userId="+targetedUsername, requestOptions)
        .then(response => response.text())
        .then(result => setMessageInnerHTML(result,2))
        .catch(error => console.log('error', error));
    //websocket.send(message);

    //将发送消息存入数据库以便拉取历史信息
    var formdata = new FormData();
    formdata.append("fromUsername", localStorage.getItem("logName"));
    formdata.append("toUsername", targetedUsername);
    formdata.append("messageContent", message);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://139.224.251.185:5050/user/pushMessage", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

//下载文件
function downloadFile(){
    window.location.href=localStorage.getItem("fileURL");
}

//对于操作者界面的转发或撤回消息
function operateMessage(event,message){
    var operation = prompt("对此消息进行转发或撤回？");
    if (operation==="转发"){
        alert(message)
        //打开div弹出层
        var popBox = document.getElementById("popBox");
        var popLayer = document.getElementById("popLayer");
        popBox.style.display = "block";
        popLayer.style.display = "block";
        //获取好友列表
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://139.224.251.185:5050/user/getFriendList?username="+localStorage.getItem("logName"), requestOptions)
            .then(response => response.text())
            .then(result => FriendListTransmission(result,message))//显示在弹窗上
            .catch(error => console.log('error', error));
        //获取完好友列表

    }
    if (operation==="撤回"){
        //删除发件人页面的消息
        var element=document.getElementById("msgDelete");
        element.parentNode.removeChild(element);
        //删除接受人页面的消息
        //通过websocket广播删除命令给接收人页面将需要删除的消息内容传递过去再去进行内容匹配
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://139.224.251.185:5050/websocket/sendTo?msg="+"删除:"+message+"&userId="+targetedUsername, requestOptions)
            .then(response => response.text())
            .then(result => setMessageInnerHTML(result,2))
            .catch(error => console.log('error', error));

    }
}

//关闭div弹出层
function closeBox() {
    var popBox = document.getElementById("popBox");
    var popLayer = document.getElementById("popLayer");
    popBox.style.display = "none";
    popLayer.style.display = "none";
}

//在弹窗层显示待转发好友
function FriendListTransmission(result,message){
    //处理json
    var list = JSON.parse(result);
    console.log(list)
    var friendName=new Array(3);
    // var FriendDiv=new Array(3);
    for (var i=0;i<list.length;i++) {
        //判断朋友名
        if (list[i]["username1"] !== localStorage.getItem("logName")) {
            friendName[i] = list[i]["username1"];
        } else { friendName[i] = list[i]["username2"]; }
        //显示到弹窗
        // alert(friendName[i])
        var FriendDiv = document.createElement("div");
        FriendDiv.innerHTML=friendName[i];
        FriendDiv.style.marginLeft="10px";
        FriendDiv.style.marginTop="15px";
        FriendDiv.className="FriendDiv";
        FriendDiv.id = i;
        //有误
        // FriendDiv.onclick=function (event){ showTransmission(event,FriendDiv.id,message); }
        var element = document.getElementById("TransmissionWindow");
        element.appendChild(FriendDiv);
    }
    //会存在bug//但是能先用着
    $("#0").on("click",function(){showTransmission(friendName[0],message);})
    $("#1").on("click",function(){showTransmission(friendName[1],message);})
    $("#2").on("click",function(){showTransmission(friendName[2],message);})
    $("#3").on("click",function(){showTransmission(friendName[3],message);})
    $("#4").on("click",function(){showTransmission(friendName[4],message);})
    $("#5").on("click",function(){showTransmission(friendName[5],message);})
    $("#6").on("click",function(){showTransmission(friendName[6],message);})

}

//与后端交互实现转发功能
function showTransmission(friendName,message){
    // var friendName = document.getElementById(friendDivID).innerHTML;

    //消息存入数据库
    var formdata = new FormData();
    formdata.append("fromUsername", localStorage.getItem("logName"));
    formdata.append("toUsername", friendName);
    formdata.append("messageContent", message);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://139.224.251.185:5050/user/pushMessage", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    //通过websocket广播
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://139.224.251.185:5050/websocket/sendTo?msg="+message+"&userId="+friendName, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    alert(friendName+message);//

}


// function showNewGroup(groupName){
//     addUserStyle();
//     addDomUser(groupName);
// }
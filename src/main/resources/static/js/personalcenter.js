
// document.getElementById("getPersonName").innerHTML=localStorage.getItem("logName");

function modifyPersonalInfor(){
    var parents = document.getElementsByClassName("personInfo");
    var childs = document.getElementsByClassName("msgcard");
    for (var i = parents .length - 1; i >= 1; i--){
            parents[i].removeChild(childs[i]);
        // alert(username,age,position,mood);
        var personalInfoInput = document.createElement("input");
        if (i===4){personalInfoInput.id="words";personalInfoInput.className="newInput";}
        if (i===3){personalInfoInput.id="mood";personalInfoInput.className="newInput";}
        if (i===2){personalInfoInput.id="position";personalInfoInput.className="newInput";}
        if (i===1){personalInfoInput.id="age";personalInfoInput.className="newInput";}
        // if (i===0){personalInfoInput.id="username"}

        personalInfoInput.style.marginLeft=15;
        parents[i].appendChild(personalInfoInput);
    }
    var makesureButton=document.getElementById("modifyAndRegister");
    makesureButton.innerHTML="确认个人信息";
    makesureButton.onclick=Function("afterMakingsure()");
}

//当按钮变为确认个人信息后，需要打印更改后的个人信息
function afterMakingsure(){
    var words = document.getElementById("words").value;
    var mood = document.getElementById("mood").value;
    var position = document.getElementById("position").value;
    var age = document.getElementById("age").value;
    var username = localStorage.getItem("logName");

    //将更改后的个人信息上传至数据库
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("age", age);
    formdata.append("mood", mood);
    formdata.append("position", position);
    formdata.append("words", words);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/user/modifyInfo", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    ////个人信息上传完毕

    ////显示更改过的个人信息
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://localhost:8080/user/showInfo?username="+localStorage.getItem("logName"), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    ////////

    var parents = document.getElementsByClassName("personInfo");
    var childs = document.getElementsByClassName("newInput");
    for (var i = parents .length - 1; i >= 1; i--){
        parents[i].removeChild(childs[i-1]);
        var personalP = document.createElement("p");
        if (i===4){personalP.innerHTML=words;personalP.className="msgcard";}
        if (i===3){personalP.innerHTML=mood;personalP.className="msgcard";}
        if (i===2){personalP.innerHTML=position;personalP.className="msgcard";}
        if (i===1){personalP.innerHTML=age;personalP.className="msgcard";}

        parents[i].appendChild(personalP);

        var makesureButton=document.getElementById("modifyAndRegister");
        makesureButton.innerHTML="修改个人信息";
        makesureButton.onclick=Function("modifyPersonalInfor()");
    }
}

function showUser(item){

console.log(item);
var newItem = JSON.parse(item);

var childs = document.getElementsByClassName("msgcard");

    for (var i = childs .length - 1; i >= 0; i--){
            if(i===0){childs[i].innerHTML=newItem["username"];}
            if(i===1){childs[i].innerHTML=newItem["age"];}
            if(i===2){childs[i].innerHTML=newItem["position"];}
            if(i===3){childs[i].innerHTML=newItem["mood"];}
            if(i===4){childs[i].innerHTML=newItem["words"];}
    }


    // for(var i=0;i<5; i++){
    //     var p1=document.createElement("p");
    //     var p2=document.createElement("p");
    //     if(i===0){p1.innerHTML="我的昵称:";p2.innerHTML=newItem["username"];}
    //     if(i===1){p1.innerHTML="我的年龄:";p2.innerHTML=newItem["age"];}
    //     if(i===2){p1.innerHTML="我的位置:";p2.innerHTML=newItem["position"];}
    //     if(i===3){p1.innerHTML="我的心情:";p2.innerHTML=newItem["mood"];}
    //     if(i===4){p1.innerHTML="我的个性签名:";p2.innerHTML=newItem["words"];}
    //     p2.className="msgcard";
    //     var p3=document.createElement("p");
    //     p3.appendChild(p1);
    //     p3.appendChild(p2);
    //     p3.style.marginLeft="20px";
    //     var div1=document.createElement("div");
    //     div1.style.marginTop="10px";
    //     div1.style.overflow="hidden";
    //     div1.className="personInfo";
    //     div1.appendChild(p3);
    //     var div2=document.getElementById("usercenter");
    //     div2.appendChild(div1);
    // }
    //
    // var button1=document.createElement("button");
    // button1.innerHTML="修改个人信息";
    // button1.className="btn";
    // button1.id="modifyAndRegister";
    // button1.onclick=Function("modifyPersonalInfor()");
    //
    // var div3=document.createElement("div");
    // div3.appendChild(button1);
    // var div4=document.getElementById("usercenter");
    // div4.appendChild(div3);

}


//////*********/////
//添加好友






package com.example.mydemo.controller;

import com.example.mydemo.socket.WebSocket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.apache.ibatis.annotations.Param;


import java.io.IOException;

@RestController
@RequestMapping("/websocket")
public class WebSocketController {
    @Autowired
    WebSocket webSocket;

    @CrossOrigin
    @GetMapping(value="/test")
    public String test(){
        return "websocketTest";
    }

    @CrossOrigin
    @GetMapping(value="/sendTo")
    public String sendTo(@Param("userId") String userId, @Param("msg") String msg) throws IOException {
        webSocket.sendMessageTo(msg,userId);
        return msg;
    }

    @CrossOrigin
    @GetMapping(value="/sendAll")
    public String sendAll(@Param("msg") String msg) throws IOException {
        String fromUserId="system";//其实没用上
        webSocket.sendMessageAll(msg,fromUserId);
        return msg;
    }
}

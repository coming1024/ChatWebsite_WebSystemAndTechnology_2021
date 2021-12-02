package com.example.mydemo.service;
import com.example.mydemo.pojo.Friend;
import com.example.mydemo.pojo.Message;
import com.example.mydemo.pojo.User;
import org.springframework.stereotype.Service;

import java.util.List;
//也是没有写对应的注解的，到时候可以改一下
@Service
public interface UserService {
    //和mapper相呼应，有一个对应的方法
    //List<User> getUserList();

    //MyUsers regist(MyUsers myusers);
    User test(String account);
    boolean login(String username,String password);
    boolean register(String username,String password);
    boolean checkUserExist(String username);//搜索栏搜索此用户，如果存在则显示出来，如果没有则显示不存在
    boolean modifyInfo(String username,int age,String position,String mood,String words);
    User getInfo(String username);
    boolean makeFriend(String username1,String username2);
    boolean deleteFriend(String username1,String username2);
    List<Friend> getFriendList(String username);
    List<Message> getAllMessage(String fromUsername, String toUsername);
    boolean pushMyMessage(String messageContent,String fromUsername,String toUsername);
}



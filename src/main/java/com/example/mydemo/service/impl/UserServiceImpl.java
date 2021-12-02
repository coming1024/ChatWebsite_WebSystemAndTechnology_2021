package com.example.mydemo.service.impl;

import com.example.mydemo.mapper.UserMapper;

import com.example.mydemo.pojo.Friend;
import com.example.mydemo.pojo.Message;
import com.example.mydemo.pojo.User;
import com.example.mydemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
//再网上看到 好像是 service和controller和compent 还有这个 都是没有本质区别的
@Repository
public class UserServiceImpl implements UserService {
    //这里就是需要把这个实现方法具体的写出来了,然后这里就需要加入注解了
    //这就是所谓的自动装配的功能吧
    @Autowired
    private UserMapper userMapper;
    /*@Override
    public List<User> getUserList() {
        //就是因为这些调用来调用去的，让我觉得很绕，我姑且认为是，需要提高系统的可调度性
        //所以要做各种分层的操作，减少耦合度，这里的话，相当于就是要用具体操作了，可是其实就是把mapper的方法调用一些
        try{
            List<User> users= userMapper.getUserList();
            return users;

        }catch (Exception e){
            //好像是 如果不throw的话，会报错。。。
            e.printStackTrace();
            throw e;
        }
    }*/

//    @Override
//    public MyUsers regist(MyUsers myusers) {
//        //如果你mypper没有写sql，这里可以点出来他自带的方法，这里的save就是自带的新增方法
//        return userMapper.save(myusers);
//    }
    @Override
    public User test(String account){
        return userMapper.gettest(account);
    }

    @Override
    public boolean login(String username,String password){
        return userMapper.getExists(username,password);
    }

    @Override
    public boolean register(String username,String password){
        return userMapper.getRegister(username,password);
    }

    @Override
    public boolean checkUserExist(String username){ return userMapper.getUserExists(username); }

    @Override
    public boolean modifyInfo(String username,int age,String position,String mood,String words){
        return userMapper.modifyUserInfo(username,age,position,mood,words);
    }

    @Override
    public User getInfo(String username){
        return userMapper.getUserInfo(username);
    }

    @Override
    public boolean makeFriend(String username1,String username2) { return userMapper.addFriend(username1,username2);}

    @Override
    public boolean deleteFriend(String username1,String username2){ return userMapper.deleteFriend(username1,username2); }

    @Override
    public List<Friend> getFriendList(String username){ return userMapper.getFriend(username);}

    @Override
    public List<Message> getAllMessage(String fromUsername, String toUsername){ return userMapper.getMessage(fromUsername,toUsername);}

    @Override
    public boolean pushMyMessage(String messageContent,String fromUsername,String toUsername){ return userMapper.pushMessage(messageContent,fromUsername,toUsername);}
}


package com.example.mydemo.mapper;

import com.example.mydemo.pojo.Friend;
import com.example.mydemo.pojo.Message;
import com.example.mydemo.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    //然后做一些数据库的对应操作，这次是查询操作
    @Select("select * from usertable where account=#{account}")
    User gettest(@Param("account")String account);

    //List<MyUsers> findUByUsernameAndPassword(String username,String password);

    @Select("select username=#{username} from user where password=#{password}")
    boolean getExists(@Param("username")String username,@Param("password")String password);

    @Insert("insert into user( username,password ) values (#{username},#{password})")
    boolean getRegister(@Param("username")String username,@Param("password")String password);

    @Select("select username=#{username} from user where username=#{username}")
    boolean getUserExists(@Param("username")String username);

    @Update("update user set age=#{age},mood=#{mood},position=#{position},words=#{words} where username=#{username}")
    boolean modifyUserInfo(@Param("username")String username,@Param("age")int age,@Param("position")String position,@Param("mood")String mood,@Param("words")String words);

    @Select("select * from user where username=#{username}")
    User getUserInfo(@Param("username")String username);

    @Insert("insert into friend(username1,username2) values (#{username1},#{username2})")
    boolean addFriend(@Param("username1")String username1,@Param("username2")String username2);

    @Delete("delete from friend where (username1=#{username1} and username2=#{username2}) or (username2=#{username1} and username1=#{username2})")
    boolean deleteFriend(@Param("username1")String username1,@Param("username2")String username2);

    @Select("select * from friend where username2=#{username} or username1=#{username}")
    List<Friend> getFriend(@Param("username")String username);

    @Select("select * from communication where (fromUsername=#{fromUsername} and toUsername=#{toUsername}) or (fromUsername=#{toUsername} and toUsername=#{fromUsername})")
    List<Message> getMessage(@Param("fromUsername")String fromUsername, @Param("toUsername")String toUsername);

    @Insert("insert into communication(messageContent,fromUsername,toUsername) values (#{messageContent},#{fromUsername},#{toUsername})")
    boolean pushMessage(@Param("messageContent")String messageContent,@Param("fromUsername")String fromUsername,@Param("toUsername")String toUsername);

}



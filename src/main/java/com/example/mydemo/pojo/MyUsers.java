package com.example.mydemo.pojo;


import javax.persistence.*;


@Entity
@Table(name = "MyUsers")
public class MyUsers {
    /**
     * 这些注解的意思你百度就可以了
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true,nullable = false,length = 50)
    private Integer id;
    //@Column(name="account",nullable = false,length = 50)
    //private String account;
    @Column(name = "password",nullable = false,length = 50)
    private  String password;
    //@Column(name = "studentID",nullable = false,length = 50)
   // private  String studentID;
    @Column(name = "username",nullable = false,length = 50)
    private  String username;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName(){
        return  username;
    }
    public String getPassword(){
        return password;
    }
    public  void setUsername(String username){
        this.username=username;
    }
    public  void setPassword(String password){
        this.password=password;
    }
}


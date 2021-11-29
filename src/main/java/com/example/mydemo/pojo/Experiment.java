package com.example.mydemo.pojo;

import org.springframework.context.annotation.Primary;

public class Experiment {

    public Integer id;
    public String purpose;
    public String process;
    public String conclusion;

    public Experiment(String purpose,String process,String conclusion){
        this.purpose=purpose;
        this.process=process;
        this.conclusion=conclusion;
        //this.id=id;
    }

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getPurpose(){
        return  purpose;
    }
    public void setPurpose(){ this.purpose=purpose;}
    public String getProcess(){ return process;}
    public void setProcess(){ this.process=process;}
    public String getConclusion(){ return conclusion;}
    public void setConclusion(){ this.conclusion=conclusion;}

}

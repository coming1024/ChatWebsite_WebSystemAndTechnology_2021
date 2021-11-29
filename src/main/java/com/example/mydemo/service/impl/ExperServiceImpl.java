package com.example.mydemo.service.impl;

import com.example.mydemo.mapper.ExperMapper;
import com.example.mydemo.pojo.Experiment;
import com.example.mydemo.service.ExperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
//再网上看到 好像是 service和controller和compent 还有这个 都是没有本质区别的
@Repository
public class ExperServiceImpl implements ExperService{
    @Autowired
    private ExperMapper experMapper;

    @Override
    public boolean writeExper(Experiment exper1){
        boolean flag = false;
        try{
            experMapper.insertExper(exper1);
            flag = true;
        }catch (Exception e){
            e.printStackTrace();
        }
        return flag;
    }

}

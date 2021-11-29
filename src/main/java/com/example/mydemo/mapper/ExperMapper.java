package com.example.mydemo.mapper;


import com.example.mydemo.pojo.Experiment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ExperMapper {
    @Insert("insert into experiment(purpose,process,conclusion) values (#{purpose},#{process},#{conclusion})")
    void insertExper(Experiment exper1);

}

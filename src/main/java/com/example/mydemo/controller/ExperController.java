package com.example.mydemo.controller;

import com.example.mydemo.pojo.Experiment;
import com.example.mydemo.service.impl.ExperServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/experiment")
public class ExperController {
    @Autowired
    private ExperServiceImpl experService;

    @CrossOrigin
    @PostMapping(value = "/write")
    public void writeExper(Experiment exper1){
        experService.writeExper(exper1);
    }


}

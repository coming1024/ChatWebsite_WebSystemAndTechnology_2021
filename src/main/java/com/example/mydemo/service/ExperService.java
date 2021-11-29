package com.example.mydemo.service;


import com.example.mydemo.pojo.Experiment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ExperService {

    boolean writeExper(Experiment exper1);

}

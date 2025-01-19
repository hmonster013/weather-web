package com.de013.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherDay implements Serializable{
    String datetime;
    String sunrise;
    String sunset;
    int humidity;
    int uvindex;
    double pressure;
    double temp;
    String icon;
    
    List<WeatherHour> hours;
}

package com.de013.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class WeatherHour implements Serializable{
    String datetime;
    int humidity;
    int uvindex;
    double pressure;
    double precipprob;
}

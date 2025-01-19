package com.de013.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.de013.model.WeatherData;
import com.de013.services.WeatherService;
import com.de013.utils.URI;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin("*")
@RestController
@RequestMapping(URI.V1 + URI.WEATHER)
public class WeatherController {
    
    @Autowired
    private WeatherService weatherService;

    @GetMapping(value = URI.CITY + URI.START_DATE + URI.END_DATE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WeatherData> getWeatherByCity(
        @PathVariable("city") String city,
        @PathVariable("startDate") String startDate,
        @PathVariable("endDate") String endDate
    ) throws Exception{
        WeatherData weatherData = weatherService.getWeatherByCity(city, startDate, endDate);

        return ResponseEntity.ok(weatherData);
    }
    
}

package com.de013.services;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.de013.model.WeatherData;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class WeatherService {
    private final String apiKey = System.getenv("WEATHER_API_KEY");
    private final String apiUrl = System.getenv("WEATHER_API_URL");

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private RestTemplate restTemplate;

    public WeatherData getWeatherByCity(String city, String startDate, String endDate) throws Exception{
        String cacheKey = "weather_" + city + startDate + endDate;
        if (redisTemplate.hasKey(cacheKey)) {
            return (WeatherData) redisTemplate.opsForValue().get(cacheKey);
        }

        String url = apiUrl + '/' + city 
                            + '/' + startDate 
                            + '/' + endDate 
                            + "?unitGroup=metric&key=" + apiKey + "&contentType=json";

        ResponseEntity<WeatherData> response = restTemplate.exchange(url, HttpMethod.GET, null, WeatherData.class);
        WeatherData weatherData = response.getBody();

        redisTemplate.opsForValue().set(cacheKey, weatherData, 12, TimeUnit.HOURS);
        
        return weatherData;
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { URI } from '../utils/URI';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getDataToday(location: String) {
    const todayStr = '2025-01-18';

    return this.http.get(`${environment.apiUrl}/${URI.V1}/${URI.WEATHER}/${location}/${todayStr}/${todayStr}`);
  }

  getDataWeek(location: String) {
    const { mondayStr, sundayStr } = this.getStartAndEndOfWeek();
    console.log(URI.V1);
    return this.http.get(`${environment.apiUrl}/${URI.V1}/${URI.WEATHER}/${location}/${mondayStr}/${sundayStr}`);
  }

  getStartAndEndOfWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1));
    
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek + (dayOfWeek == 0 ? 0 : 7));
    
    const mondayStr = this.formatDate(monday);
    const sundayStr = this.formatDate(sunday);
    return {mondayStr, sundayStr};
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}

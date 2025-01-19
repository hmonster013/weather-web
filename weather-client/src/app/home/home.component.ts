import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WeatherService } from '../_service/weather.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartOptions } from "chart.js/auto";
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseChartDirective
  ],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  selectedButton = 1;
  weatherWeekData: any;
  weatherDayData: any;
  weatherHourData: any;
  weatherTodayData: any;
  form: any;
  response: any;

  labels: any;
  precipprobData: any;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  
  public lineChartLegend = true;

  constructor(
    private weatherService: WeatherService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getDataWeek();
    this.getDataToday();
  }

  ngAfterViewInit(): void {
  }

  getDataToday() {
    this.selectedButton = 1;
    this.weatherService.getDataToday(this.form.value.location).subscribe((res) => {
      this.response = res;
      this.weatherTodayData = this.response;

      this.labels = this.weatherTodayData.days[0].hours.map(
        (hour: { datetime: string }) => hour.datetime
      );
      this.precipprobData = this.weatherTodayData.days[0].hours.map(
        (hour: { precipprob: number }) => hour.precipprob
      );

      this.updateChart();
    });
  }

  getDataWeek() {
    this.selectedButton = 2;
    this.weatherService.getDataWeek(this.form.value.location).subscribe((res) => {
      this.response = res;
      this.weatherWeekData = this.response;
      this.weatherDayData = this.response.days;
    });
  }

  search() {
    this.getDataToday();
    this.getDataWeek();
  }

  getDayOfWeek(dateString: string) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
  }

  updateChart() {
    console.log(this.precipprobData);
    
    this.lineChartData.labels = this.labels;
    this.lineChartData.datasets[0].data = this.precipprobData;
  }

  createForm() {
    this.form = new FormGroup({
      location: new FormControl('Ha Noi, Viet Nam'),
    });
  }
}

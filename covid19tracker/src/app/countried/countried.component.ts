import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

import { GlobalDataSummary } from '../models/gloabl-data';

// import { GoogleChartInterface } from 'ng2-google-charts';

@Component({
  selector: 'app-countried',
  templateUrl: './countried.component.html',
  styleUrls: ['./countried.component.css']
})
export class CountriedComponent implements OnInit {
  datatable = []
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  globalData: GlobalDataSummary[];
  constructor(private dataService: DataServiceService) { }
  currentDate = this.dataService.currentdate
  selected = ""
  counteryList = []
  counteryListData = []
  data = false
  colns = ["Confirmed Cases", "Active Cases", "Recovered", "Deaths"]
  chart = {
    PieChart: "PieChart",
    ColumnChart: 'ColumnChart',
    LineChart: "LineChart",
    height: 500,
    width: 700,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }
  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe((result) => {

        console.log(result);
        this.globalData = result
        result.forEach(cs => {
          if (!Number.isNaN(cs.confirmed)) {
            this.counteryList.push(cs.country)
            this.counteryListData.push(cs)
          }
        })
      })
  }
  onCountrySelection() {
    this.data = false
    // this.columnChart = {
    //   chartType: "ColumnChart"
    // }
    this.counteryListData.forEach(cs => {
      if (this.selected == cs.country) {
        this.totalActive = cs.active
        this.totalConfirmed = cs.confirmed
        this.totalDeaths = cs.deaths
        this.totalRecovered = cs.recovered
        this.initchart(this.selected);
        this.data = true


      }
    })
  }

  initchart(country) {
    this.datatable = []
    let value1 = 0
    let value2 = 0
    let value3 = 0
    let value4 = 0
    this.globalData.forEach(cs => {
      if (cs.country == country) {
        this.datatable.push([cs.confirmed, cs.active, cs.recovered, cs.deaths])
      }

    })
    this.datatable.push(["Confirmed Cases", "Active Cases", "Recovered", "Deaths"])
    console.log("my data", this.datatable)
  }
}

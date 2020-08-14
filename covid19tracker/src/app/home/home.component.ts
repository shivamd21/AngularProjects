import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from '../models/gloabl-data';
import { DataServiceService } from './../data-service.service'
// import { GoogleChartInterface } from 'ng2-google-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isavailable = false
   displayedColumns: string[] = ['Confirmed', 'Recovered', 'Deaths', 'Active'];
  dataSource = [];
  casetype: string;
  cases: string[] = ['Confirmed', 'Recovered', 'Deaths', 'Active'];;
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  datatable = [];
  globalData: GlobalDataSummary[];
  currentDate = ""
  
  colns=["Confirmed Cases","Active Cases","Recovered","Deaths"]
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
 
  constructor(private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.currentDate=this.dataService.currentdate
    this.dataService.getGlobalData()
    .subscribe( (result) => {
          this.globalData=result
          result.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive += cs.active
              this.totalConfirmed += cs.confirmed
              this.totalDeaths += cs.deaths
              this.totalRecovered += cs.recovered
            }
          })
      this.initchart("Confirmed")
        this.dataSource.push(
                {
                  confirmed: this.totalConfirmed,
                  active: this.totalActive,
                  deaths: this.totalDeaths,
                  recovered: this.totalRecovered
                })       
    }
    )   
  }
  
  initchart(casetype) {

    this.datatable = [];
    let value:Number
    this.globalData.forEach(cs => {
     
      if (cs.confirmed > 200000) {
       value=cs.confirmed
 
        if (casetype == "Confirmed") {
          value = cs.confirmed
        }
        if (casetype == "Recovered") {
          value = cs.recovered
        }
        if (casetype == "Deaths") {
          value = cs.deaths
        }
        if (casetype == "Active") {
          value = cs.active
        }
        console.log(value)
        this.datatable.push([cs.country, value])
 
      }
  })
  }
 onCaseSelection() {
    console.log("hbhjdbbdj", this.casetype)
    this.initchart(this.casetype)
  }
  }



import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GlobalDataSummary } from './models/gloabl-data'

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  date= new Date()
  date1 = this.date.getDate() - 1
  month1 = this.date.getMonth() + 1
  year1 = this.date.getFullYear()
  
  date2 = this.date.getDate() - 2
  currentdate1 = "0" + this.month1 + "-" + this.date1 + "-" + this.year1;
  currentdate2 = "0" + this.month1 + "-" + this.date2 + "-" + this.year1;
  currentdate= "0" + this.month1 + "-" + this.date.getDate() + "-" + this.date.getFullYear();
  // private globalDataUrl1 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" + this.currentdate1 + ".csv";
  private globalDataUrl2 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" + this.currentdate2 + ".csv";
  // private globalDataUrl0 = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/" + this.currentdate + ".csv";
  // allUrls = [this.globalDataUrl2, this.globalDataUrl1,this.globalDataUrl0]
  // localurl=""
 
  constructor(private http: HttpClient) {
   


      }
  getGlobalData() {
    return this.http.get(this.globalDataUrl2, { responseType: 'text' }).pipe(
      map(result => {
        let data: GlobalDataSummary[] = [];
        let raw = {}
        let rows = result.split('\n');
        rows.splice(0, 1);
        // console.log(rows);
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        })
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}

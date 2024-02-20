import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentJSService {

  constructor() {
    moment.locale('fr');
    
  }

  getAllNamesMonths(){
    return moment.months()
  }

  getYearFor(date: string){
    return moment(date).year()
  }
  getMonthFor(date: string){
    return moment(date).month()
  }

  convertToHHMM(startTime: string){
    return moment(startTime, 'HH:mm:ss').format('HH:mm');
  }
}

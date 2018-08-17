import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { runnerTimer } from '../../models/runnerTimer';

/*
  Generated class for the SvcGroupTimerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SvcGroupTimerProvider {

  runnerTimes:Array<runnerTimer> = new Array<runnerTimer>();

  constructor(public http: HttpClient) {
    console.log('Hello SvcGroupTimerProvider Provider');

  }

  
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { runner } from './../../models/runner';
import { runnerTimer } from '../../models/runnerTimer';
import { lapTime } from './../../models/lapTime';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the GroupTimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-timer',
  templateUrl: 'group-timer.html',
})
export class GroupTimerPage {

  startAt:any	= 0;	// Time of last start / resume. (0 if not running)
  lapTime:any	= 0;	// Time on the clock when last stopped in milliseconds
  h:any = 0;
  m:any = 0;
  s:any = 0;
  ms:any = 0;
  runningTimer:any;
  runnerList:Array<runnerTimer> = new Array<runnerTimer>();
  firstName:string = '';
  lastName:string = '';
  currentView:string = 'timer';
  timerIsRunning:boolean = null;
  timerColor:string='secondary';


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GroupTimerPage');
  }

  addRunner(){
    //console.log('first: ' + this.firstName + ' last: ' + this.lastName);
    var foundIndex = -1;
    var me = this;
    //console.log('first: ' + this.firstName.length + ' last: ' + this.lastName.length)
    if(this.firstName.length>0 && this.lastName.length>0){
      var itemCount = this.runnerList.length;
      var i = 0;

      if(this.runnerList.length>0){
          this.runnerList.forEach(function(item, index){
            i++;
            var foundUser = false;
            if(item.runner.firstName.trim().toLowerCase() == me.firstName.trim().toLowerCase() && item.runner.lastName.trim().toLowerCase() == me.lastName.trim().toLowerCase() ){
              foundIndex = index;
              foundUser = true;
            }
    
            if(i == itemCount)
            {
              if (foundUser==true){
                me.firstName = '';
                me.lastName = '';        
                me.showAlert();
              }else{
                var rnr = new runner(me.firstName, me.lastName);
                var rnrTimer = new runnerTimer();
                rnrTimer.runner = rnr;
                me.runnerList.push(rnrTimer);
                me.firstName = '';
                me.lastName = '';        
              }
            }
          })
        }else{
        var rnr = new runner(me.firstName, me.lastName);
        var rnrTimer = new runnerTimer();
        rnrTimer.runner = rnr;
        me.runnerList.push(rnrTimer);
        me.firstName = '';
        me.lastName = '';    
      }
    }
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Add Runner',
      subTitle: 'Sorry you cannot add a runner with the same name as an existing runner',
      buttons: ['OK']
    });
    alert.present();
  }
  addLap(rt:runnerTimer){
    var t:number = this.time();
    var l = new lapTime();
    var lap:number = this.time();
    var split:number = null;
    if (rt.previousLapTime!=null){
      split = lap - rt.previousLapTime;
    }else{
      split = lap;
    }
    l.split = split;
    l.splitDisplay = this.formatTime(split)
    //rt.currentSplit = this.formatTime(split);//this.formatTime(rt.previousLapTime - lap);
    l.lap = lap;
    l.display = this.formatTime(l.lap);
    rt.previousLapTime =  t;
    console.log(rt);
    rt.laps.push(l);
  }

  addFinal(rt:runnerTimer){
    rt.finalTime = this.time();
    rt.isRunning = false;
    rt.finalTimeDisplay = this.formatTime(rt.finalTime);
    var itemCount = this.runnerList.length;
    var i = 0;
    var me = this;
    var ATimerRunning = false;
    
    this.runnerList.forEach(function(item, index){
      i++
      if(item.isRunning == true){
        ATimerRunning = true
      }

      if(i == itemCount){
        if(!ATimerRunning){
          me.runStop();
        }
      }
    })

  }

  removeRunner(rt:runnerTimer){
    var removeIndex = -1;
    this.runnerList.forEach(function(item, index){
      if(item.runner.firstName.trim().toLocaleLowerCase() == rt.runner.firstName.trim().toLocaleLowerCase() && item.runner.lastName.trim().toLocaleLowerCase() == rt.runner.lastName.trim().toLocaleLowerCase()){
        removeIndex = index;
      }
    })
    if(removeIndex >= 0){
      this.runnerList.splice(removeIndex,1);
    }
  }
      now() {
          return (new Date()).getTime(); 
      }; 

      // Public methods
      // Start or resume
      start() {
          this.startAt	= this.startAt ? this.startAt : this.now();
          this.timerIsRunning = true;
          this.timerColor="secondary";
          this.runnerList.forEach(function(item,index)
        {
          item.isRunning = true;
        })
      };

      // Stop or pause
      stop() {
          // If running, update elapsed time otherwise keep it
          this.lapTime	= this.startAt ? this.lapTime + this.now() - this.startAt : this.lapTime;
          this.timerColor="danger";
          this.timerIsRunning = false;
          this.startAt	= 0; // Paused
        };

      // Reset
      reset() {
        this.lapTime = this.startAt = 0;
        };

      // Duration
      time() {
          return this.lapTime + (this.startAt ? this.now() - this.startAt : 0); 
        };

      update(){
        this.runningTimer = this.formatTime(this.time());
        var me = this;
        this.runnerList.forEach(function(item,index)
        {
          if (item.isRunning == true){
            item.finalTimeDisplay = me.runningTimer;
          }
        })
        var me = this;
        //setInterval("update()", 1);
        setTimeout(() => {
          me.update();
        }, 1);
      }  

      runStart(){
        this.start();
        this.update();
      }

      runStop(){
        this.stop();

        this.runnerList.forEach(function(item,index)
        {
          if (item.isRunning == true){
            item.isRunning = false;
          }
        })
      }

      runReset(rl:Array<runnerTimer>){
        this.reset();
        rl.forEach(function(item, index){
            item.laps = new Array<lapTime>();
            item.finalTime = null;
            item.finalTimeDisplay = null;
        })
      }
    //};

    // var x = new clsStopwatch();
    // var $time;
    // var clocktimer;

    pad(num, size) {
      var s = "0000" + num;
      return s.substr(s.length - size);
    }
  
    formatTime(time) {
    this.h = this.m = this.s = this.ms = 0;
    var newTime = '';

    this.h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    this.m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    this.s = Math.floor( time / 1000 );
    this.ms = time % 1000;

    newTime = this.pad(this.h, 2) + ':' + this.pad(this.m, 2) + ':' + this.pad(this.s, 2) + ':' + this.pad(this.ms, 3);
    return newTime;
    }
    
}

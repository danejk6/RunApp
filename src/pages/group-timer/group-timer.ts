import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupTimerPage');
  }


//	Simple example of using private variables
//
//	To start the stopwatch:
//		obj.start();
//
//	To get the duration in milliseconds without pausing / resuming:
//		var	x = obj.time();
//
//	To pause the stopwatch:
//		var	x = obj.stop();	// Result is duration in milliseconds
//
//	To resume a paused stopwatch
//		var	x = obj.start();	// Result is duration in milliseconds
//
//	To reset a paused stopwatch
//		obj.stop();
//
      // Private vars

      now() {
          return (new Date()).getTime(); 
      }; 

      // Public methods
      // Start or resume
      start() {
          this.startAt	= this.startAt ? this.startAt : this.now();
      };

      // Stop or pause
      stop() {
          // If running, update elapsed time otherwise keep it
          this.lapTime	= this.startAt ? this.lapTime + this.now() - this.startAt : this.lapTime;
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
  
    show() {
    // $time = document.getElementById('time');
    // update();
    }

    // update() {
    // $time.innerHTML = formatTime(x.time());
    // }

    // function start() {
    // clocktimer = setInterval("update()", 1);
    // x.start();
    // }

    // function stop() {
    // x.stop();
    // clearInterval(clocktimer);
    // }

    // function reset() {
    // stop();
    // x.reset();
    // update();
    // }
  
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  runcount: string = '';
  items = [];
  individuals = [];
  toDoItem:string='';
  terrains = [];
  teams = [];
  locations = [];
  //runs = [];

  constructor(public navCtrl: NavController, public http:Http) {
    this.runcount = 'Gabe'
    var me = this;
    
    this.http.get('http://test.vickerhome.com/api/terrains/get').map(res => res.json()).subscribe(data => {
        me.terrains = data;
    });
    this.http.get('http://test.vickerhome.com/api/teams/get').map(res => res.json()).subscribe(data => {
        me.teams = data;
    });
    this.http.get('http://test.vickerhome.com/api/locations/get').map(res => res.json()).subscribe(data => {
        me.locations = data;
    });
  }

  addToItems(){
    this.items.push(this.toDoItem);
  }
}

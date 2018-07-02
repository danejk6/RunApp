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

  constructor(public navCtrl: NavController, public http:Http) {
    this.runcount = 'Gabe'
    
    this.http.get('http://test.vickerhome.com/api/terrains/get').map(res => res.json()).subscribe(data => {
        this.terrains = data;
    });
    this.http.get('http://test.vickerhome.com/api/teams/get').map(res => res.json()).subscribe(data => {
        this.teams = data;
    });
    this.http.get('http://test.vickerhome.com/api/locations/get').map(res => res.json()).subscribe(data => {
        this.locations = data;
    });
  }

  addToItems(){
    this.items.push(this.toDoItem);
  }
}

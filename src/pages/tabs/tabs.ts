import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { GroupTimerPage } from '../group-timer/group-timer'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  //tab2Root = AboutPage;
  tab2Root = GroupTimerPage
  //tab3Root = ContactPage;

  constructor() {

  }
}

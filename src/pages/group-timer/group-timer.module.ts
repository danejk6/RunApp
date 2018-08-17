import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupTimerPage } from './group-timer';

@NgModule({
  declarations: [
    GroupTimerPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupTimerPage),
  ],
})
export class GroupTimerPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddStreakPageRoutingModule } from './add-streak-routing.module';

import { AddStreakPage } from './add-streak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddStreakPageRoutingModule
  ],
  declarations: [AddStreakPage]
})
export class AddStreakPageModule {}

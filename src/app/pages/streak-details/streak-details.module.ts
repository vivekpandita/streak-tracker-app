import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StreakDetailsPageRoutingModule } from './streak-details-routing.module';

import { StreakDetailsPage } from './streak-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StreakDetailsPageRoutingModule
  ],
  declarations: [StreakDetailsPage]
})
export class StreakDetailsPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStreakPage } from './add-streak.page';

const routes: Routes = [
  {
    path: '',
    component: AddStreakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddStreakPageRoutingModule {}

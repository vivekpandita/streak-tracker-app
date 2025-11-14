import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreakDetailsPage } from './streak-details.page';

const routes: Routes = [
  {
    path: '',
    component: StreakDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreakDetailsPageRoutingModule {}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {AuthGuard} from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [ {
    path: 'iot-dashboard',
    component: DashboardComponent,
  }, {
    path: 'appdispatch',
    loadChildren: './app-dispatch/app-dispatch.module#AppDispatchModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  },
   {
      path: 'user',
      canActivate: [AuthGuard],
      loadChildren: './users/users.module#UsersModule',
    },
    {
    path: '',
    redirectTo: 'appdispatch',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

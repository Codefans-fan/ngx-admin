import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AppDispatchComponent} from './app-dispatch.component';
import {DispatchOverviewComponent} from './dispatch-overview/dispatch-overview.component';
import {AppDetailComponent} from './app-detail/app-detail.component';

const routes: Routes = [{
  path: '',
  component: AppDispatchComponent,
  children: [{
    path: 'overview',
    component: DispatchOverviewComponent,
  },
    {
      path: 'detail/:id',
      component: AppDetailComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDispatchRoutingModule {
}

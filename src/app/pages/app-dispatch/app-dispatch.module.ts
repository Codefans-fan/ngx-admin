import { NgModule } from '@angular/core';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ThemeModule } from '../../@theme/theme.module';
import { AppDispatchRoutingModule } from './app-dispatch-routing.module';
import { AppDispatchComponent } from './app-dispatch.component';
import { DispatchOverviewComponent } from './dispatch-overview/dispatch-overview.component';
import {AppdispatchService} from '../../@core/services/appdispatch.service';
import {AppDetailComponent} from './app-detail/app-detail.component';

const COMPONENTS = [
  AppDispatchComponent,
  DispatchOverviewComponent,
  AppDetailComponent,
];

const SERVICES = [
  AppdispatchService,
];

const MODULES = [
  ThemeModule,
  AppDispatchRoutingModule,
  NgxDatatableModule,
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class AppDispatchModule { }

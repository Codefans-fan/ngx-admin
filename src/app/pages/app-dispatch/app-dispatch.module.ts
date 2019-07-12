import { NgModule } from '@angular/core';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ThemeModule } from '../../@theme/theme.module';
import { AppDispatchRoutingModule } from './app-dispatch-routing.module';
import { AppDispatchComponent } from './app-dispatch.component';
import { DispatchOverviewComponent } from './dispatch-overview/dispatch-overview.component';
import {AppDetailComponent} from './app-detail/app-detail.component';
import {UploadService} from '../../@core/services/upload.service';

const COMPONENTS = [
  AppDispatchComponent,
  DispatchOverviewComponent,
  AppDetailComponent,
];

const SERVICES = [
  UploadService,
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

import { NgModule } from '@angular/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ThemeModule } from '../../@theme/theme.module';
import { AppDispatchRoutingModule } from './app-dispatch-routing.module';
import { AppDispatchComponent } from './app-dispatch.component';
import { DispatchOverviewComponent } from './dispatch-overview/dispatch-overview.component';
import {AppDetailComponent} from './app-detail/app-detail.component';
import {UploadService} from '../../@core/services/upload.service';
import {WarningDialogComponent} from './warning-dialog/warning-dialog.component';
import {NbDialogModule} from '@nebular/theme';

const COMPONENTS = [
  AppDispatchComponent,
  DispatchOverviewComponent,
  AppDetailComponent,
  WarningDialogComponent,
];

const SERVICES = [
  UploadService,
];

const MODULES = [
  ThemeModule,
  AppDispatchRoutingModule,
  NgxDatatableModule,
  NbDialogModule.forChild(),
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
  entryComponents: [
    WarningDialogComponent,
  ],
})
export class AppDispatchModule { }

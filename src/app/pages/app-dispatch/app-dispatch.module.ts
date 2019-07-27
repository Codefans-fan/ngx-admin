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
import {NgCircleProgressModule} from 'ng-circle-progress';
import {CircleProgressDialogComponent} from './circle-progress-dialog/circle-progress-dialog.component';
import {MatDialogModule} from '@angular/material';
import {ChargeDialogComponent} from './charge-dialog/charge-dialog.component';

const COMPONENTS = [
  AppDispatchComponent,
  DispatchOverviewComponent,
  AppDetailComponent,
  WarningDialogComponent,
  CircleProgressDialogComponent,
  ChargeDialogComponent,
];

const SERVICES = [
  UploadService,
];

const MODULES = [
  ThemeModule,
  AppDispatchRoutingModule,
  NgxDatatableModule,
  NbDialogModule.forChild(),
  NgCircleProgressModule.forRoot({
    radius: 88,
    animation: true,
    animateTitle: true,
    animationDuration: 500,
    backgroundGradient: true,
    backgroundColor: '#ffffff',
    backgroundGradientStopColor: '#c0c0c0',
    backgroundPadding: -10,
    maxPercent: 100,
    outerStrokeWidth: 10,
    outerStrokeColor: '#61A9DC',
    innerStrokeWidth: 0,
    subtitleColor: '#444444',
    showInnerStroke: false,
    startFromZero: false,
    renderOnClick: false,
    lazy: false,
  }),
  MatDialogModule,
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
    CircleProgressDialogComponent,
    ChargeDialogComponent,
  ],
})
export class AppDispatchModule { }

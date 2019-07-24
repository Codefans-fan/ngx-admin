import { NgModule } from '@angular/core';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import {UserAppChartComponent} from './user-app-chart/user-app-chart.component';
import {ChartSummaryComponent} from './user-app-chart/chart-summary/chart-summary.component';
@NgModule({
  imports: [
    ThemeModule,
    NgxDatatableModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    UserAppChartComponent,
    ChartSummaryComponent,
  ],
})
export class DashboardModule { }

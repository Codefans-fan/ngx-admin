import { NgModule } from '@angular/core';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';


@NgModule({
  imports: [
    ThemeModule,
    NgxDatatableModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,

  ],
})
export class DashboardModule { }

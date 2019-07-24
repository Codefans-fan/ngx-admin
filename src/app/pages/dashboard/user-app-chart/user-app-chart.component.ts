/**
 * create by fky
 * create on 2019/7/21
 */
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User, UserSummary} from '../../../@core/models/user.model';
import {DashboardService} from '../../../@core/services/dashboard.service';
import * as Highcharts from 'highcharts';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'ngx-user-app-chart',
  styleUrls: ['./user-app-chart.component.scss'],
  templateUrl: './user-app-chart.component.html',
})

export class UserAppChartComponent implements OnInit, OnChanges {

  @Input() selectUser: User;

  private selectUserId: number;

  totalDownLoad: number;
  freeTimes: number;
  chargeTimes: number;


  public options: any = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'DownLoad details',
    },
    subtitle: {
      text: 'details',
    },
    xAxis: {
      categories: [
        'Apps',
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Times (*)',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [],
  };

  constructor(private dashBoardService: DashboardService) {

  }

  ngOnInit(): void {
    this.totalDownLoad = this.freeTimes = this.chargeTimes = 0;
    Highcharts.chart('container', this.options);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectUser.currentValue.id > 0 && this.selectUserId !== changes.selectUser.currentValue.id) {
      this.selectUserId = changes.selectUser.currentValue.id;
      this.dashBoardService.getUserSummary(this.selectUserId).subscribe((res: UserSummary) => {
        this.totalDownLoad = res.totalDownload;
        this.chargeTimes = res.chargeTimes;
        this.freeTimes = res.freeTimes;
        this.options.series = this.buildSeries(res.items);
        Highcharts.chart('container', this.options);
      });
    }
  }


  private  buildSeries(items: Array<any>): Array<any> {
    if (items && items.length > 0) {
      const series = [];
      for (const v of items){
        series.push({'name': v.appName, 'data': [v.downloadCount]});
      }
      return series;
    }
    return null;
  }

}

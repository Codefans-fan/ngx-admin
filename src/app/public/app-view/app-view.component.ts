/**
 * create by fky
 * create on 2019/7/1
 */
import {Component, OnInit} from '@angular/core';
import {AppdispatchService} from '../../@core/services/appdispatch.service';
import {ActivatedRoute} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'ngx-app-view',
  styleUrls: ['./app-view.component.scss'],
  templateUrl: './app-view.component.html',
})


export class AppViewComponent implements OnInit {
  appId: string = '';

  qrData: string = '';

  iconClass: string = '';

  hideDownLoadButton: boolean = false;

  constructor(private route: ActivatedRoute, private appdispatchService: AppdispatchService,
              private deviceService: DeviceDetectorService) {
  }

  download(appId: string): void {

    this.appdispatchService.preDownLoadFile(appId).subscribe((res: string) => {
      if (res.length < 4) {
        return;
      }
      window.location.href = res;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appId = params.get('appid');
      if (this.appId) {
        this.qrData = window.location.protocol + '//' + window.location.host + '/#/view/' + this.appId;

        this.appdispatchService.getAppType(this.appId).subscribe(res => {
          switch (Number(res)) {
            case 1:
              this.iconClass = 'fab fa-android';
              if (this.deviceService.getDeviceInfo().userAgent.toLowerCase().indexOf('iphone') > -1) {
                this.hideDownLoadButton = true;
              }
              break;
            case 2:
              this.iconClass = 'fab fa-apple';
              if (this.deviceService.getDeviceInfo().userAgent.toLowerCase().indexOf('iphone') === -1) {
                this.hideDownLoadButton = true;
              }
              break;
            default:
              this.iconClass = '';
          }
        });
      }
    });


  }


}

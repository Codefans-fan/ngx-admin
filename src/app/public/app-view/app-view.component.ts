/**
 * create by fky
 * create on 2019/7/1
 */
import {Component, OnInit} from '@angular/core';
import {AppdispatchService} from '../../@core/services/appdispatch.service';
import {ActivatedRoute} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {AppdispatchModel} from '../../@core/models/appdispatch.model';

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

  appName: string  = '';

  constructor(private route: ActivatedRoute, private appdispatchService: AppdispatchService,
              private deviceService: DeviceDetectorService, private toastrService: NbToastrService) {
  }

  download(appId: string): void {

    this.appdispatchService.preDownLoadFile(appId).subscribe((res: string) => {
      if (res.length < 4) {
        return;
      }
      window.location.href = res;
    }, err => {
      if (err.error.indexOf(109) > 0) {
        this.showToast(NbToastStatus.DANGER, 'Error', 'Free time is using out');
      }

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.appId = params.get('appid');
      if (this.appId) {
        this.qrData = window.location.protocol + '//' + window.location.host + '/#/view/' + this.appId;

        this.appdispatchService.getAppSimple(this.appId).subscribe((app: AppdispatchModel) => {
          this.appName = app.appName;
          switch (Number(app.appType)) {
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

  private showToast(type: NbToastStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(
      body,
      titleContent,
      config);
  }
}

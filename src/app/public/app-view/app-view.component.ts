/**
 * create by fky
 * create on 2019/7/1
 */
import {Component, OnInit} from '@angular/core';
import {AppdispatchService} from '../../@core/services/appdispatch.service';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'ngx-app-view',
  styleUrls: ['./app-view.component.scss'],
  templateUrl: './app-view.component.html',
})


export class AppViewComponent implements OnInit {
  private appId: string = '';

  private qrData: string = '';

  private iconClass: string = '';

  constructor(private route: ActivatedRoute, private appdispatchService: AppdispatchService,
              private deviceService: DeviceDetectorService) {
  }

  private download(appId: string): void {

    this.appdispatchService.preDownLoadFile(appId).subscribe((res: string) => {
      if (res.length < 4) {
        return;
      }
      window.location.href = res;
    });


    // TO Be Fixed  blob not work on mobile
    //  if (this.deviceService.isMobile()) {
    //     const link = document.createElement('a');
    //   // link.href = window.location.protocol + '//' + window.location.hostname + ':8080/appdispatch/app/' + appId;
    //   //
    //   // link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    //   // setTimeout(function () {
    //   //   // For Firefox it is necessary to delay revoking the ObjectURL
    //   //   link.remove();
    //   // }, 100);
    //   // return;
    //
    //   // ios
    //  // link.href = 'itms-services://?action=download-manifest&url=' + window.location.protocol + '//'
    //   //  + window.location.hostname + ':8080/appdispatch/plist/' + appId;
    //   link.href = 'itms-services://?action=download-manifest&url= ' +
    //     'https://coin99.oss-cn-hongkong.aliyuncs.com/1562682405332.plist';
    //   link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    //   setTimeout(function () {
    //     // For Firefox it is necessary to delay revoking the ObjectURL
    //     link.remove();
    //   }, 100);
    //  return;
    // }

    // this.appdispatchService.downLoadFile(appId).subscribe((downloadedApp: HttpResponse<Blob>) => {
    //   // otherwise only Chrome works like it should
    //   const newBlob = new Blob([downloadedApp.body], {type: 'application/octet-stream'});
    //   // IE doesn't allow using a blob object directly as link href
    //   // instead it is necessary to use msSaveOrOpenBlob
    //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //     window.navigator.msSaveOrOpenBlob(newBlob);
    //     return;
    //   }
    //   const data = window.URL.createObjectURL(newBlob);
    //
    //   const link = document.createElement('a');
    //   link.href = data;
    //   // For other browsers:
    //   // Create a link pointing to the ObjectURL containing the blob.
    //
    //   link.download = this.appdispatchService.getFileNameFromContentDisposition(downloadedApp.headers);
    //
    //   // this is necessary as link.click() does not work on the latest firefox
    //   link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
    //
    //   // link.click();
    //
    //   setTimeout(function () {
    //     // For Firefox it is necessary to delay revoking the ObjectURL
    //     window.URL.revokeObjectURL(data);
    //     link.remove();
    //   }, 100);
    //
    // });
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
               break;
             case 2:
               this.iconClass = 'fab fa-apple';
               break;
             default:
               this.iconClass = '';
           }
        });

      }
    });


  }


}

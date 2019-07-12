/**
 * create by fky
 * create on 2019/6/26
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppdispatchService} from '../../../@core/services/appdispatch.service';
import {AppdispatchModel} from '../../../@core/models/appdispatch.model';
import {UploadResult, UploadService} from '../../../@core/services/upload.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-app-detail',
  styleUrls: ['./app-detail.component.scss'],
  templateUrl: './app-detail.component.html',
})

export class AppDetailComponent implements OnInit {

  private id: number = 0;

  private app: AppdispatchModel = {};

  private appTypes = [];

  constructor(private route: ActivatedRoute, private router: Router, private appdispatchService: AppdispatchService,
              private uploadService: UploadService, private toastrService: NbToastrService) {
    appdispatchService.getAppTypes().subscribe(res => {
      this.appTypes = res;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.loadData();
    });

  }

  private loadData(): void {
    this.appdispatchService.getAppDetails(this.id).subscribe((res: AppdispatchModel) => {
      this.app = res;
    });

  }

  public uploadFile(files: File[]): void {
    this.uploadService.uploadFile(files[0], this.app.id,
      '/api/appdispatch/newversion').subscribe((res: UploadResult) => {
      this.showToast(NbToastStatus.SUCCESS, 'Success', 'New version upload success');
    });
  }

  private downLoad(appid: string): void {
    this.appdispatchService.downLoadFile(appid).subscribe((downloadurl: string) => {
      if (downloadurl.length < 4) {
        this.showToast(NbToastStatus.DANGER, 'Failed', 'Download Failed');
        return;
      }
      window.location.href = downloadurl;
      this.loadData();
    });
  }

  private preview(appId): void {
    window.open(`#/view/${appId}`, '_blank');
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

/**
 * create by fky
 * create on 2019/6/26
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppdispatchService} from '../../../@core/services/appdispatch.service';
import {AppdispatchModel} from '../../../@core/models/appdispatch.model';
import {UploadService} from '../../../@core/services/upload.service';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {UploadResultModel} from '../../../@core/models/upload-result.model';

@Component({
  selector: 'ngx-app-detail',
  styleUrls: ['./app-detail.component.scss'],
  templateUrl: './app-detail.component.html',
})

export class AppDetailComponent implements OnInit {

  id: number = 0;

  app: AppdispatchModel = {};

  appTypes = [];

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
      '/api/appdispatch/newversion').subscribe((res: UploadResultModel) => {
      if (res.progress === 100  && res.status === 'done' ) {
        this.showToast(NbToastStatus.SUCCESS, 'Success', 'New version upload success');
      }
    });
  }

  downLoad(appid: string): void {
    this.appdispatchService.downLoadFile(appid).subscribe((downloadurl: string) => {
      if (downloadurl.length < 4) {
        this.showToast(NbToastStatus.DANGER, 'Failed', 'Download Failed');
        return;
      }
      window.location.href = downloadurl;
      this.loadData();
    }, err => {
      if (err.error.indexOf(109) > 0) {
        this.showToast(NbToastStatus.DANGER, 'Error', 'Free time is using out');
      }

    });
  }

  onSavePreference(): void {
    this.appdispatchService.updateDispatch(this.app).subscribe(() => {
      this.showToast(NbToastStatus.SUCCESS, 'Success', 'Save Success');
    });

  }


  preview(appId): void {
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

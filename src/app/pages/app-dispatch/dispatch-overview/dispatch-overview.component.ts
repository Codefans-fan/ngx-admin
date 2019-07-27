import {Component} from '@angular/core';
import {AppdispatchService} from '../../../@core/services/appdispatch.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadService} from '../../../@core/services/upload.service';
import {AppdispatchModel} from '../../../@core/models/appdispatch.model';
import {WarningDialogComponent} from '../warning-dialog/warning-dialog.component';
import {UploadResultModel} from '../../../@core/models/upload-result.model';
import {MatDialog} from '@angular/material';
import {NotificationService} from '../../../@core/services/notification.service';
import {UserAppModel} from '../../../@core/models/user-app.model';
import {ChargeDialogComponent} from '../charge-dialog/charge-dialog.component';
@Component({
  selector: 'ngx-dispatch-overview',
  styleUrls: ['./dispatch-overview.component.scss'],
  templateUrl: './dispatch-overview.component.html',
})
export class DispatchOverviewComponent {

  rows = [];

  appTypes = [];

  userExt: UserAppModel;
  constructor(private appdispatchService: AppdispatchService, private router: Router, private route: ActivatedRoute,
              private uploadService: UploadService, private notificationService: NotificationService,
              private dialog: MatDialog) {
    this.loadData();

    this.appdispatchService.getDownLoadData().subscribe((userApp: UserAppModel) => {
      this.userExt = userApp;
    });
  }

  downlaodSummary(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => sum += cell, 0);
  }

  private loadData() {
    this.appdispatchService.getAppTypes().subscribe(res => {
      this.appTypes = res;
    });

    this.appdispatchService.getAppList().subscribe(res => {
      this.rows = res;
    });
  }
  uploadFile(files: File[]): void {

    this.uploadService.uploadFile(files[0], 0,
      '/api/appdispatch/uploadapp').subscribe((res: UploadResultModel) => {
      if (res.progress === 100  && res.status === 'done' ) {
          this.notificationService.showSuccessMessage('Success', 'upload success');
          this.loadData();
        }
    });
  }

  onActivate($event) {
    // double click
    if ($event.type === 'dblclick' || $event.type === 'keydown') {
      this.router.navigate(['../detail', $event.row.id], {relativeTo: this.route});
    }

  }

  deleteApp(rowData: AppdispatchModel) {
    this.dialog.open(WarningDialogComponent).afterClosed().subscribe((isSure: boolean) => {
      if (isSure) {
        this.appdispatchService.deleteApp(rowData.id).subscribe(() => {
          this.notificationService.showSuccessMessage('Delete', 'Delete successfully');
          this.loadData();
        });
        return;
      }
    });
  }

  charge(): void {
      this.dialog.open(ChargeDialogComponent);
  }

}

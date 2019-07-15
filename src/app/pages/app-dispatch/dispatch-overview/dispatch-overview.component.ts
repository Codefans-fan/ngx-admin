import {Component} from '@angular/core';
import {AppdispatchService} from '../../../@core/services/appdispatch.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UploadResult, UploadService} from '../../../@core/services/upload.service';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {AppdispatchModel} from '../../../@core/models/appdispatch.model';
import {WarningDialogComponent} from '../warning-dialog/warning-dialog.component';
@Component({
  selector: 'ngx-dispatch-overview',
  styleUrls: ['./dispatch-overview.component.scss'],
  templateUrl: './dispatch-overview.component.html',
})
export class DispatchOverviewComponent {

  rows = [];

  appTypes = [];

  constructor(private appdispatchService: AppdispatchService, private router: Router, private route: ActivatedRoute,
              private uploadService: UploadService, private toastrService: NbToastrService,
              private dialogService: NbDialogService) {

    this.loadData();
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
      '/api/appdispatch/uploadapp').subscribe((res: UploadResult) => {
      this.showToast(NbToastStatus.SUCCESS, 'Success', 'pload success');
      this.loadData();
    });
  }

  onActivate($event) {
    // double click
    if ($event.type === 'dblclick' || $event.type === 'keydown') {
      this.router.navigate(['../detail', $event.row.id], {relativeTo: this.route});
    }

  }

  deleteApp(rowData: AppdispatchModel) {
    this.dialogService.open(WarningDialogComponent).onClose.subscribe((isSure: boolean) => {
      if (isSure) {
        this.appdispatchService.deleteApp(rowData.id).subscribe(() => {
          this.showToast(NbToastStatus.SUCCESS, 'Delete', 'Delete successfully');
          this.loadData();
        });
        return;
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

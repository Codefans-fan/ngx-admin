/**
 * create by fky
 * create on 2019/6/29
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UploadResultModel} from '../models/upload-result.model';
import {CircleProgressDialogComponent} from '../../pages/app-dispatch/circle-progress-dialog/circle-progress-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';




@Injectable()
export class UploadService {

  private httpClient: HttpClient;

  private startUpload: boolean = false;

  private  progressSpinner: MatDialogRef<CircleProgressDialogComponent>;

  private uploadResult: UploadResultModel = new UploadResultModel(0, 'send');


  private reset(): void {
    this.uploadResult.progress = 0;
    this.uploadResult.status = 'send';
    this.startUpload = false;
  }

  constructor(httpClient: HttpClient, private dialog: MatDialog) {
    this.httpClient = httpClient;
  }

  public uploadFile(file: File, id: number,
                    url: string ): Observable<UploadResultModel> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appId', id.toString());
    return this.httpClient.post(url, formData, {reportProgress: true, observe: 'events' })
      .pipe(map(event => {
        if (!this.startUpload) {
          this.progressSpinner = this.dialog.open(CircleProgressDialogComponent, {
            data:  this.uploadResult,
            disableClose: true,
          });
          this.startUpload = !this.startUpload;
        }

          switch (event.type) {
            case HttpEventType.Sent:
              this.uploadResult.status = 'send';
              this.uploadResult.progress = 0;
              break;
          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            this.uploadResult.status = 'in_progress';
            this.uploadResult.progress = progress;
            break;
          case HttpEventType.Response:
            this.uploadResult.status = 'done';
            this.uploadResult.progress = 100;
            this.progressSpinner.close();
            this.reset();
            return new UploadResultModel(100, 'done');
          default:
            return this.uploadResult;
        }
        return this.uploadResult;
    }));

  }

}

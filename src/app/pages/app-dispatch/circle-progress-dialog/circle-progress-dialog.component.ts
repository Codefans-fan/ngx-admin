/**
 * create by fky
 * create on 2019/7/23
 *  file upload progress component
 */
import {Component, Inject, Input} from '@angular/core';
import {UploadResultModel} from '../../../@core/models/upload-result.model';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'ngx-circle-progress-dialog',
  template: `<circle-progress  [percent]="data.progress"
                               [subtitle]="data.progress < 100 ? 'progress':'parsing'" ></circle-progress>`,
})
export class CircleProgressDialogComponent {

  constructor( public dialogRef: MatDialogRef<CircleProgressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadResultModel) {
  }

}

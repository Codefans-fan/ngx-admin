/**
 * create by fky
 * create on 2019/7/15
 */
import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'ngx-warning-dialog',
  templateUrl: 'warning-dialog.component.html',
  styleUrls: ['warning-dialog.component.scss'],
})
export class WarningDialogComponent {

  constructor(protected ref: MatDialogRef<WarningDialogComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(true);
  }
}

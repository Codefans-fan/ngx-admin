/**
 * create by fky
 * create on 2019/7/15
 */
import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-warning-dialog',
  templateUrl: 'warning-dialog.component.html',
  styleUrls: ['warning-dialog.component.scss'],
})
export class WarningDialogComponent {

  constructor(protected ref: NbDialogRef<WarningDialogComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(true);
  }
}

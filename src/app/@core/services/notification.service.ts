import {Injectable} from '@angular/core';
import {NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';

/**
 * create by fky
 * create on 2019/7/26
 */

@Injectable()
export class NotificationService {

  constructor(private toastrService: NbToastrService) {
  }


  showSuccessMessage(title: string, body: string) {
    this.showToast(NbToastStatus.SUCCESS, title, body);
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

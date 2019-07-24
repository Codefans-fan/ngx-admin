/**
 * create by fky
 * create on 2019/7/23
 */
export class UploadResultModel {
  progress: number;
  status: string;

  constructor(_progress: number, _status: string) {
    this.progress = _progress;
    this.status = _status;
  }
}

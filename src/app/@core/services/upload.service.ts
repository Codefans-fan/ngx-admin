/**
 * create by fky
 * create on 2019/6/29
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export interface UploadResult {
  name: string;
}


@Injectable()
export class UploadService {

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public uploadFile(file: File, id: number,
                    url: string ): Observable<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('appId', id.toString());
    return this.httpClient.post(url, formData).pipe(map((res: UploadResult) => {
      return res;
    }));

  }

}

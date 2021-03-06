/**
 * create by fky
 * create on 2019-06-26
 */
import {Injectable} from '@angular/core';
import {AppdispatchModel} from '../models/appdispatch.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import {UserAppModel} from '../models/user-app.model';

@Injectable()
export class AppdispatchService {

  constructor(private httpClient: HttpClient) {
  }


  public getAppList(): Observable<Array<AppdispatchModel>> {
    return this.httpClient.get('/api/appdispatch/myapps').pipe(map((res: Array<AppdispatchModel>) => {
      return res;
    }));
  }

  public getAppTypes(): Observable<any> {
    return this.httpClient.get('/api/appdispatch/apptypes');
  }

  public getAppType(appId: string): Observable<string> {
    return this.httpClient.get(`/api/appdispatch/apptype/${appId}`, {responseType: 'text'});
  }

  public getAppSimple(appId: string): Observable<AppdispatchModel> {
    return this.httpClient.get(`/api/appdispatch/simple/${appId}`).pipe(map( (res: AppdispatchModel) => {
      return res;
    }));
  }

  public getAppDetails(id: number): Observable<AppdispatchModel> {
    const param: any = {'id': id};
    return this.httpClient.get('/api/appdispatch/details', {params: param});
  }

  public downLoadFile(appid): Observable<string> {
    return this.httpClient.get(`/api/appdispatch/app/${appid}`, {responseType: 'text'});
  }

  public deleteApp(appid: number): Observable<any> {
    return this.httpClient.delete(`/api/appdispatch/delete/${appid}`);
  }
  /**
   * 准备下载文件, 生成下载地址  service-item,, http
   * @param appid
   */
  public preDownLoadFile(appid: string): Observable<string> {
    return this.httpClient.get(`/api/appdispatch/preapp/${appid}`, {responseType: 'text'});
  }


  public updateDispatch(dispatch: AppdispatchModel): Observable<AppdispatchModel> {
    return this.httpClient.put('/api/appdispatch/update', dispatch).pipe(map( (res: AppdispatchModel) => {
      return res;
    }));
  }


  public getFileNameFromContentDisposition(headers: HttpHeaders): string {
    const contentDisposition = headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    return (matches[1] || 'untitled').trim();
  }

  public getDownLoadData(): Observable<UserAppModel> {
    return this.httpClient.get('/api/appdispatch/userapp').pipe(map( (res: UserAppModel) => {
      return res;
    }));

  }

}

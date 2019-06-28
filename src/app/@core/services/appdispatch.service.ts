/**
 * create by fky
 * create on 2019-06-26
 */
import {Injectable} from '@angular/core';
import {AppdispatchModel} from '../models/appdispatch.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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


}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserSummary} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

/**
 * create by fky
 * create on 2019/7/21
 */
@Injectable()
export class DashboardService {

  constructor(private httpClient: HttpClient) {
  }


  public getUserSummary(id: number): Observable<UserSummary> {
    return this.httpClient.get(`/api/appdispatch/summary/${id}`).pipe(map((res: UserSummary) => {
      return res;
    }));
  }

}

/**
 * create by fky
 * create on 6/3/2019
 */
import {Injectable} from '@angular/core';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {Observable, of as observableOf} from 'rxjs';
import {User, UserCount} from '../models/user.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PageList} from '../models/pagelist.model';

@Injectable()
export class UserService {

  private user: User = new User();

  constructor(private authService: NbTokenService, private httpClient: HttpClient) {
    this.authService.tokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.getPayload()) {
        this.user.name = token.getPayload().username;
        this.user.email = token.getPayload().username;
      }

    });
  }


  public getUser(): Observable<User> {
    return observableOf(this.user);
  }

  public getUserCount(): Observable<UserCount> {
    return this.httpClient.get('/api/user/count').pipe(map((count: UserCount) => {
      return count;
    }));
  }

  public getUserList(pageNum: number, pageSize: number): Observable<PageList<User>> {

    let params = new HttpParams();
    params = params.append('page', pageNum.toString());
    params = params.append('size', pageSize.toString());
    return this.httpClient.get('/api/user/pagelist', {params: params}).pipe(map((userList: PageList<User>) => {
      return userList;
    }));
  }


}

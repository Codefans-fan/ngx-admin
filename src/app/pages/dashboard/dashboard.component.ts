import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { map, takeWhile} from 'rxjs/operators' ;
import {UserService} from '../../@core/services/users.service';
import {Observable} from 'rxjs';
import {User, UserCount} from '../../@core/models/user.model';
import {PageList} from '../../@core/models/pagelist.model';
import {CardStatusModel} from '../../@core/models/card_status.model';

interface CardSettings {
  title?: string;
  iconClass?: string;
  type?: string;
  isActive: boolean;
  eventName: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private alive = true;

  statusCards: CardSettings[] = [];

  rows = new Array<User>();
  page = new PageList<User>();

  selectRowUser: User;

  constructor(private themeService: NbThemeService,
              private userService: UserService) {

    // init page config
    this.page.pageNum = 0;
    this.page.pageSize = 30;
    this.setPage({ offset: 0 });

    this.buildCards().subscribe((statusCards: CardSettings[]) => {
      this.themeService.getJsTheme()
        .pipe(takeWhile(() => this.alive))
        .subscribe(theme => {
          this.statusCards = statusCards;
        });
    });
  }
  setPage(pageInfo) {
    this.page.pageNum = pageInfo.offset;
    this.loadUserListData();
  }

  ngOnInit(): void {
    this.selectRowUser = new User();
  }



  buildCards(): Observable<CardSettings[]> {
    return this.userService.getUserCount().pipe(map((count: UserCount) => {
      return [{
        title: 'Total User ' + count.totalCount,
        iconClass: 'nb-person',
        type: 'primary',
        isActive: true,
        eventName: 'totalUser',
      }, {
        title: 'Todays register ' + count.todaysRegister,
        iconClass: 'nb-plus',
        type: 'primary',
        isActive: false,
        eventName: 'todayUser',
      }];
    }));
  }


  statusChange($event: CardStatusModel) {
  }


  onActive($event): void {
    if ($event.type === 'click' || $event.type === 'keydown') {
        this.selectRowUser = $event.row;
    }
  }

  private loadUserListData() {
      this.userService.getUserList(this.page.pageNum, this.page.pageSize).subscribe((list: PageList<User>) => {
          this.page.total = list.total;
          this.rows = list.list;
      });

  }
  ngOnDestroy() {
    this.alive = false;
  }
}

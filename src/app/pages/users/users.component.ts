import {Component, OnInit} from '@angular/core';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {TokenPayloadModel} from '../../@core/models/token_payload.model';
import {User} from '../../@core/models/user.model';
import {UserService} from '../../@core/services/users.service';
import {NotificationService} from '../../@core/services/notification.service';

/**
 * create by fky
 * create on 2019/7/21
 */

@Component({
  selector: 'ngx-users',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html',
})

export  class UsersComponent implements OnInit {

    id: number = 0;
    constructor( private auth: NbAuthService, private userService: UserService, private notificationService: NotificationService) {
    }

    user: User = new User();

    private isEditable: boolean = true;

  ngOnInit(): void {
        this.auth.getToken().subscribe((token: NbAuthToken) => {
          const payload =  token.getPayload() as TokenPayloadModel;
          this.id = payload.id;
          this.loadUser(this.id);
    });
  }

  saveUser($event: User): void {
    if (this.isEditable) {  // avoid multiple send
      this.isEditable = false;
      this.userService.updateUser($event).subscribe((res: User) => {
        this.user = res;
        this.notificationService.showSuccessMessage('Success', 'Update user');
        this.isEditable = true;
      });
    }
  }


  private loadUser(id: number) {
    this.userService.getUserById(id).subscribe((resUser: User) => {
      this.user = resUser;
    });
  }



}

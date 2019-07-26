/**
 * create by fky
 * create on 2019/7/22
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../@core/models/user.model';

@Component({
  selector: 'ngx-user-profile',
  styleUrls: ['./user-profile.component.scss'],
  templateUrl: './user-profile.component.html',
})

export class UserProfileComponent {

  @Input() user: User;

  @Output() userOut = new EventEmitter<User>();


  saveUser(): void {
    this.userOut.emit(this.user);
  }

}

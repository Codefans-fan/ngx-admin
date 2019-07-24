/**
 * create by fky
 * create on 2019/7/21
 */

import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';

import {UsersComponent} from './users.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    UsersRoutingModule,
  ],
  declarations: [
    UsersComponent,
    UserProfileComponent,
  ],
})
export class UsersModule { }

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {UsersComponent} from './users.component';

/**
 * create by fky
 * create on 2019/7/22
 */
const routes: Routes = [{
  path: '',
  component: UsersComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}

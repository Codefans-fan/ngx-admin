import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {TokenPayloadModel} from '../@core/models/token_payload.model';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  constructor(private auth: NbAuthService) {
      this.auth.getToken().subscribe((token: NbAuthToken) => {
        const payload =  token.getPayload() as TokenPayloadModel;
        let isAdmin: boolean = false;
        for ( const role of payload.roles){
         if ( role === 'admin') {
             isAdmin = true;
              break;
         }
        }
        if (!isAdmin) {
          this.menu.splice(0, 1);
        }
      });

  }
  menu = MENU_ITEMS;
}

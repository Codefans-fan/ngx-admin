import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken} from '@nebular/auth';
import {NbSecurityModule, NbRoleProvider} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';

import {UserService} from './services/users.service';
import {AppdispatchService} from './services/appdispatch.service';
import {DashboardService} from './services/dashboard.service';
import {NotificationService} from './services/notification.service';
// const socialLinks = [
//   {
//     url: 'https://github.com/akveo/nebular',
//     target: '_blank',
//     icon: 'socicon-github',
//   },
//   {
//     url: 'https://www.facebook.com/akveo/',
//     target: '_blank',
//     icon: 'socicon-facebook',
//   },
//   {
//     url: 'https://twitter.com/akveo_inc',
//     target: '_blank',
//     icon: 'socicon-twitter',
//   },
// ];



export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: '/api',
        login: {
          endpoint: '/user/login',
        },
        register: {
          endpoint: '/user/register',
        },
        logout: {
          alwaysFail: false,
          endpoint: '/user/logout',
          method: 'get',
          redirect: {
            success: '/',
            failure: null,
          },
          defaultErrors: ['Something went wrong, please try again.'],
          defaultMessages: ['You have been successfully logged out.'],
        },
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
      },
        ),
    ],
    forms: {},
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
  UserService,
  AppdispatchService,
  DashboardService,
  NotificationService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private translate: TranslateService) {
    translate.setDefaultLang('en-US');
    translate.use(translate.getBrowserCultureLang());
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}

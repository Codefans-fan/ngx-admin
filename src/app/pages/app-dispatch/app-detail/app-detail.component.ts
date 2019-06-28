/**
 * create by fky
 * create on 2019/6/26
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-app-detail',
  styleUrls: ['./app-detail.component.scss'],
  templateUrl: './app-detail.component.html',
})

export class AppDetailComponent implements OnInit {

  private id: number = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

  }
}

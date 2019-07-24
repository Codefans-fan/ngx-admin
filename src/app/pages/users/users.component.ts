import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {TokenPayloadModel} from '../../@core/models/token_payload.model';

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
    constructor(private route: ActivatedRoute, private router: Router, private auth: NbAuthService) {
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id > 0) {
        this.auth.getToken().subscribe((token: NbAuthToken) => {
          const payload =  token.getPayload() as TokenPayloadModel;
           if (payload.id !== this.id) {
             this.router.navigate(['../../', payload.id], {relativeTo: this.route});
           }
        });
      }
    });
  }

}

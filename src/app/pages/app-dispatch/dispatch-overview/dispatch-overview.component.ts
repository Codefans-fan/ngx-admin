import {Component} from '@angular/core';
import {AppdispatchService} from '../../../@core/services/appdispatch.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-dispatch-overview',
  styleUrls: ['./dispatch-overview.component.scss'],
  templateUrl: './dispatch-overview.component.html',
})
export class DispatchOverviewComponent {

  private rows = [];

  private appTypes = [];

  constructor(private appdispatchService: AppdispatchService, private router: Router, private route: ActivatedRoute) {

    appdispatchService.getAppTypes().subscribe(res => {
      this.appTypes = res;
    });

    appdispatchService.getAppList().subscribe(res => {
      this.rows = res;
    });
  }

  private downlaodSummary(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => sum += cell, 0);
  }


  onActivate($event) {
    // double click
    if ($event.type === 'dblclick' || $event.type === 'keydown') {
      this.router.navigate(['../detail', $event.row.id], {relativeTo: this.route});
    }

  }
}

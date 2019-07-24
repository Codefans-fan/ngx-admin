/**
 * create by fky
 * create on 2019/7/21
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-chart-summary',
  styleUrls: ['./chart-summary.component.scss'],
  template: `
    <div class="summary-container">
      <div>
        <div>Total DownLoad</div>
        <div class="h6">{{ totalDownLoad }}</div>
      </div>
      <div>
        <div>Free Times</div>
        <div class="h6">{{ freeTimes }}</div>
      </div>
      <div>
        <div>Charge Times</div>
        <div class="h6">{{ chargeTimes }}</div>
      </div>
    </div>
  `,
})
export class ChartSummaryComponent {
  @Input() totalDownLoad: number;
  @Input() freeTimes: number;
  @Input() chargeTimes: number;
}

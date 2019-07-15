import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardStatusModel} from '../../../@core/models/card_status.model';

@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="changeState()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <div class="status">{{ on ? 'ON' : 'OFF' }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() on = true;
  @Input() eventName: string;

  @Output() statusChanged: EventEmitter<CardStatusModel> = new EventEmitter();
  changeState() {
    this.on = !this.on;

    this.statusChanged.emit(new CardStatusModel(this.eventName, this.on));
  }
}

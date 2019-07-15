/**
 * create by fky
 * create on 2019/7/13
 */

export class CardStatusModel {
  isActive: boolean = false;
  cardName?: string;

  constructor(name: string, active: boolean) {
    this.cardName = name;
    this.isActive = active;
  }
}

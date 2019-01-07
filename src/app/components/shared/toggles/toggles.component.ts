import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toggles',
  templateUrl: './toggles.component.html',
  styleUrls: ['./toggles.component.css']
})
export class TogglesComponent {
  @Input() items;
  @Input() loading;
  @Output() updatedValue: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  updateValue() {
    this.updatedValue.emit(this.items);
  }
}

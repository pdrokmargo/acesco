import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  @Input() model: boolean;
  @Input() prop: string;
  @Output() updatedValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  updateValue() {
    const obj = {
      key: this.prop,
      value: this.model
    };
    this.updatedValue.emit(obj);
  }
}

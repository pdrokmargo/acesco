import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  @Input() model: boolean;
  @Input() prop: string;
  @Input() prop2: string;
  @Input() loading: boolean;
  @Input() disabled: boolean;
  @Output() updatedValue: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  updateValue() {
    let obj = {};
    if (this.prop2) {
      obj = {
        key: this.prop,
        key2: this.prop2,
        value: this.model
      };
    } else {
      obj = {
        key: this.prop,
        value: this.model
      };
    }
    this.updatedValue.emit(obj);
  }
}

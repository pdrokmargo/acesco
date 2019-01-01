import {Component} from '@angular/core';
import {faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']
})
export class NewProviderComponent {
  preRegistro: Object;
  faCaretRight = faCaretRight;
  now: Date = new Date();
  classifications: any[] = [];

  constructor() {
    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);
    this.classifications = [
      {label: 'CLasificación 1', value: 'classification1'},
      {label: 'CLasificación 2', value: 'classification2'},
      {label: 'CLasificación 3', value: 'classification3'},
      {label: 'CLasificación 4', value: 'classification4'}
    ];
    this.preRegistro = {
      dataProtection: true,
      habeas: true,
      createdAt: this.now.getFullYear() + '-' + (month) + '-' + (day),
      whoRefers: null,
      classification: null,
      description: null
    }
    ;
  }

  updateValue(newValue: ToggleInterface) {
    this.preRegistro[newValue.key] = newValue.value;
  }

  submitPreRegistro() {
    console.log(this.preRegistro);
  }

}

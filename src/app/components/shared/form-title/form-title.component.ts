/**
 * @author  Sergio Zapata
 * @contact sergio8016@gmail.com
 * @version 1.0, 31/12/08
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-form-title',
  templateUrl: './form-title.component.html',
  styleUrls: ['./form-title.component.css']
})
export class FormTitleComponent {
  @Input() text: string;

  constructor() {
  }


}

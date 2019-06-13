/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 13/01/09
 */

import {Component, Input} from '@angular/core';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() loading: boolean;
  faSpinner = faSpinner;
  constructor() {
  }

}

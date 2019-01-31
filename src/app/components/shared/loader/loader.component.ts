/**
 * @author  Sergio Zapata
 * @contact sergio8016@gmail.com
 * @version 1.0, 02/01/09
 */

import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input() loading: boolean;
  @Input() height: string;
  constructor() {
  }

}

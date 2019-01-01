import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-toggles',
  templateUrl: './toggles.component.html',
  styleUrls: ['./toggles.component.css']
})
export class TogglesComponent {
  @Input() items;
  @Input() loading;
  constructor() { }


}

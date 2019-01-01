import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  @Input() currentStep: number;
  steps: any [] = [];

  constructor() {
    this.steps = [
      {label: 'Pre Registro', active: false},
      {label: 'Pre Selección etapa A', active: false},
      {label: 'Pre Selección etapa B', active: false},
      {label: 'Selección', active: false},
    ];
  }

}

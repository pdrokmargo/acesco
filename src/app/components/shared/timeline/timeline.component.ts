/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 31/12/08
 */

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  @Input() currentStep: number;
  @Input() national: number;
  steps: any [] = [];

  ngOnInit() {
    console.log(this.national);
    if(this.national == 0){
      this.steps = [
        {label: 'Register', active: false},
        {label: 'Documentary Checks', active: false},
        {label: 'Final Selection', active: false},
      ];
  }else{
    this.steps = [
      {label: 'Registro', active: false},
      {label: 'Información Financiera', active: false},
      {label: 'Control Documental', active: false},
      {label: 'Selección', active: false},
    ];
  }
  }

  constructor() {
    
    
  }

}

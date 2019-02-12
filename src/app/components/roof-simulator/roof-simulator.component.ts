import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roof-simulator',
  templateUrl: './roof-simulator.component.html',
  styleUrls: ['./roof-simulator.component.css']
})
export class RoofSimulatorComponent implements OnInit {

  private images = {
    type: {
      casa: [
        { url: "02-MASTER_1000/00-IMAGEN_BASE.jpg" },
        { url: "01-ARQUITECTONICO/00-IMAGEN_BASE.jpg" },
        { url: "03-CANALETA/00-IMAGEN_BASE.jpg" }
      ]
    }
  }

  private VIVIENDA: number = 1;
  private BODEGA: number = 2;

  currenttype: number = 0;
  TYPE1: number = 1;
  TYPE2: number = 2;
  TYPE3: number = 3;

  private currentTab = 0;

  constructor() { }

  ngOnInit() {
    this.currentTab = 0;
  }

  private tab(_tab) {
    if (this.currentTab != _tab) {
      this.currentTab = _tab;
      this.currenttype = 1;
    }
  }

  private type(_color) {
    this.currenttype = _color;
  }
}

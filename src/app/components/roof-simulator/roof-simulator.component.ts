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
        "02-MASTER_1000/00-IMAGEN_BASE.jpg",
        "01-ARQUITECTONICO/00-IMAGEN_BASE.jpg",
        "03-CANALETA/00-IMAGEN_BASE.jpg",
      ]
    },
    color_icon: [
      "blanco.png",
      "blanco-02.png",
      "galvanizado.png",
      "aluminio.png",
      "verde-organico.png",
      "cafe-capuccino.png",
      "rojo-escarlata.png",
      "rojo-granate.png",
      "azul.png",
      "azul-bermuda.png",
      "gris-ocaso.png",
      "verde.png",
    ],
    roofs: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
      "9.png",
      "10.png",
      "11.png",
      "12.png"
    ]
  }

  private VIVIENDA: number = 1;
  private BODEGA: number = 2;

  currenttype: number = 0;
  TYPE1: number = 1;
  TYPE2: number = 2;
  TYPE3: number = 3;
  TYPE4: number = 4;
  TYPE5: number = 5;
  

  private currentTab = 0;

  private currentroofcolor: string = null;

  private indexroof = 0;

  constructor() { }

  ngOnInit() {
    this.currentTab = 0;
  }

  private tab(_tab) {
    if (this.currentTab != _tab) {
      this.currentTab = _tab;
      this.type(1);
    }
  }

  private type(_color) {
    this.currenttype = _color;
    this.selecRoof(0);
  }

  private selecRoof(index) {
    this.indexroof = index;
    let type = '';
    switch (this.currenttype) {
      case 1:
        type = '02-MASTER_1000';
        break;
      case 2:
        type = '01-ARQUITECTONICO';
        break;
      case 3:
        type = '03-CANALETA';
        break;
    }
    this.currentroofcolor = type + '/CUBIERTA/' + this.images.roofs[index];
  }
}

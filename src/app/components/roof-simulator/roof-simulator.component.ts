import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import {faSpinner, faCaretRight, faEllipsisH} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-roof-simulator',
  templateUrl: './roof-simulator.component.html',
  styleUrls: ['./roof-simulator.component.css']
})
export class RoofSimulatorComponent implements OnInit, AfterViewInit {

  
  loading: boolean;
  height: number;
  faSpinner = faSpinner;
  faCaretRight = faCaretRight;
  faEllipsisH = faEllipsisH;
  private images = {
    type: [
      "02-MASTER_1000/00-IMAGEN_BASE.jpg",
      "01-ARQUITECTONICO/00-IMAGEN_BASE.jpg",
      "03-CANALETA/00-IMAGEN_BASE.jpg",
      "04-TEJA_SIN_TRASLAPO/00-IMAGEN_BASE.jpg",
      "05-TEJA_SIN_TRASLAPO_CURVA/00-IMAGEN_BASE.jpg",
    ],
    img: [
      {
        url: "blanco.png",
        title: "BLANCO",
        ral: "9010",
        sri: "85"
      },
      {
        url: "blanco-02.png",
        title: "BLANCO HUESO",
        ral: "9002",
        sri: "75"
      },
      {
        url: "galvanizado.png",
        title: "GALVANIZADO",
        ral: "0000",
        sri: "00"
      },
      {
        url: "aluminio.png",
        title: "ALUMINIO",
        ral: "9006",
        sri: "50"
      },
      {
        url: "verde-organico.png",
        title: "VERDE ORGANICO",
        ral: "6013",
        sri: "44"
      },
      {
        url: "cafe-capuccino.png",
        title: "CAFE CAPUCCINO",
        ral: "7006",
        sri: "40"
      },
      {
        url: "rojo-escarlata.png",
        title: "ROJO ESCARLATA",
        ral: "3001",
        sri: "36"
      },
      {
        url: "rojo-granate.png",
        title: "ROJO GRANATE",
        ral: "3011",
        sri: "34"
      },
      {
        url: "azul.png",
        title: "AZUL",
        ral: "5005",
        sri: "25"
      },
      {
        url: "azul-bermuda.png",
        title: "AZUL BERMUDA",
        ral: "5009",
        sri: "18"
      },
      {
        url: "gris-ocaso.png",
        title: "GRIS OCASO",
        ral: "0000",
        sri: "00"
      },
      {
        url: "verde.png",
        title: "VERDE",
        ral: "6005",
        sri: "3"
      },
    ]
  }

  private VIVIENDA: number = 1;
  private BODEGA: number = 2;

  private BODEGA_FACHADA: number = 1;
  private BODEGA_CUBIERTA: number = 2;

  private currentTab = 0;
  private currentTab_bodega = 0;

  currenttype: number = 0;
  private types = [
    {
      url: "cubiertas-01.png",
      geometria:"geometria-master-1000.png",
      name: "Master\n1000",
      code: 1,
      show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)
    },
    {
      url: "cubiertas-02.png",
      geometria:"geometria-cubierta-arquitectonica.png",
      name: "Cubierta arquitectonica",
      code: 2,
      show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)
    },
    {
      url: "cubiertas-04.png",
      geometria:"geometria-canaleta.png",
      name: "Canaleta"+'\n\n',
      code: 4,
      show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)//(this.currentTab == this.BODEGA) && (this.currentTab_bodega == this.BODEGA_CUBIERTA)
    },
    {
      url: "cubiertas-03.png",
      geometria:"geometria-teja-sin-traslapo.png",
      name: "Teja sin traslapo",
      code: 3,
      show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)
    },
    
    {
      url: "cubiertas-05.png",
      geometria:"geometria-teja-sin-traslapo-curva.png",
      name: "Teja sin traslapo curva",
      code: 5,
      show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)//(this.currentTab == this.BODEGA) && (this.currentTab_bodega == this.BODEGA_CUBIERTA)
    },
    {
      url: "cubiertas-06.png",
      geometria:"geometria-master-panel.png",
      name: "Master\nPanel",
      code: 6,
      show: (this.currentTab == this.BODEGA) && (this.currentTab_bodega == this.BODEGA_FACHADA)
    },
  ];



  private currentroofcolor: string = null;
  private currentfacadecolor: string = null;

  private indexroof = 0;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentTab = 0;
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  private tab(_tab) {
    if (this.currentTab != _tab) {
      this.currentTab = _tab;
      if (this.currentTab == this.BODEGA) {
        this.tab_bodega(1);
      }
      this.updateTypes();
      this.type(0);
    }
  }

  private tab_bodega(_tab) {
    if (this.currentTab_bodega != _tab) {
      this.currentTab_bodega = _tab;
    }
  }

  private type(_type) {
    this.currenttype = _type;
    this.selecRoof(0, 0);
  }

  private selecRoof(index, code) {
    this.loading = true;
    this.indexroof = index;
    let type = '';
    console.log(code);
    switch (this.currenttype) {
      case 0:
        type = '02-MASTER_1000';
        break;
      case 1:
        type = '01-ARQUITECTONICO';
        break;
      case 2:
        type = '03-CANALETA';
        break;
      case 3:
        type = '04-TEJA_SIN_TRASLAPO';
        break;
      case 4:
        type = '05-TEJA_SIN_TRASLAPO_CURVA';
        break;
        case 5:
        type = '06-MASTER_PANEL';
        break;
    }
    if (this.currentTab == this.VIVIENDA) {
      this.currentroofcolor = type + '/CUBIERTA/' + this.images.img[index].url;
    } else {
      if (this.currentTab_bodega == this.BODEGA_FACHADA) {
        this.currentfacadecolor = type + '/FACHADA/' + this.images.img[index].url;
      } else {
        this.currentroofcolor = type + '/CUBIERTA/' + this.images.img[index].url;
      }
    }
    

  }
  
 private loadingImageState(){
   this.loading = false;
 }

  private updateTypes() {
    this.types = [
      {
        url: "cubiertas-01.png",
        geometria: "geometria-master-1000.png",
        name: "Master"+'\n'+"1000",
        code: 1,
        show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)
      },
      {
        url: "cubiertas-02.png",
        geometria: "geometria-cubierta-arquitectonica.png",
        name: "Cubierta arquitectónica",
        code: 2,
        show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)
      },
      {
        url: "cubiertas-04.png",
        geometria: "geometria-canaleta.png",
        name: "Canaleta"+'\n\n',
        code: 4,
        show: (this.currentTab == this.VIVIENDA) || (this.currentTab == this.BODEGA)//(this.currentTab == this.BODEGA) && (this.currentTab_bodega == this.BODEGA_CUBIERTA)
      },
      {
        url: "cubiertas-03.png",
        geometria: "geometria-teja-sin-traslapo.png",
        name: "Teja sin traslapo",
        code: 3,
        show:/* (this.currentTab == this.VIVIENDA) || */(this.currentTab == this.BODEGA)
      },
      
      {
        url: "cubiertas-05.png",
        geometria: "geometria-teja-sin-traslapo-curva.png",
        name: "Teja sin traslapo curva",
        code: 5,
        show: (this.currentTab == this.BODEGA) && (this.currentTab_bodega == this.BODEGA_CUBIERTA)
      },
      {
        url: "cubiertas-06.png",
        geometria:"geometria-master-panel.png",
        name: "Master\nPanel",
        code: 6,
        show: (this.currentTab == this.BODEGA) && (this.currentTab_bodega == this.BODEGA_FACHADA)
      },
    ];
  }
}

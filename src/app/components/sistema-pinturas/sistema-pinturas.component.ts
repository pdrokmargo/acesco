import { Component, OnInit } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sistema-pinturas",
  templateUrl: "./sistema-pinturas.component.html",
  styleUrls: ["./sistema-pinturas.component.css"]
})
export class SistemaPinturasComponent implements OnInit {
  faArrowRight = faArrowRight;

  stages: any = [];
  title: any = {};
  timeline: any = [];
  showForm: boolean = false;
  options: any = [];

  constructor() {}

  ngOnInit() {
    this.title = {
      text: `Seleccione las características que más se ajusten a tu proyecto para poder asesorarte sobre cuál es el sistema prepintado adecuado`,
      show: true
    };

    this.timeline = [
      {
        text: "Inicio",
        show: true
      },
      {
        text: "Sectores",
        show: false
      },
      {
        text: "Usos",
        show: false
      },
      {
        text: "Productos",
        show: false
      },
      {
        text: "Ambiente",
        show: false
      }
    ];

    this.stages = [
      {
        show: true,
        title: "Sectores",
        imgpadding: true,
        nopadding: false,
        col: "col-xs-12 col-sm-6",
        active: 0,
        items: [
          {
            icon: "icono-construccion.png",
            title: "Construcción",
            text: `Productos con destino a techos, fachadas e interiores utilizados en contrucciones, edificaciones y estructuras metálicas`
          },
          {
            icon: "icono-industria.png",
            title: "Industria",
            text: `Productos con destino a la fabricación de maquinaria y equipos industriales, agro industriales, silos y refrigeración`
          }
        ]
      },
      {
        show: true,
        title: "Usos",
        col: "col-xs-12 col-sm-4",
        imgpadding: false,
        nopadding: true,
        active: 0,
        items: [
          {
            icon: "imagen-techo.jpg",
            title: "Techo"
          },
          {
            icon: "imagen-fachada.jpg",
            title: "Fachada"
          },
          {
            icon: "imagen-interior.jpg",
            title: "Interior"
          }
        ]
      },
      {
        show: false,
        title: "Productos",
        subtitle: "Seleccione la cubierta que tendrá tu  proyecto",
        col: "col-xs-12 col-sm-4",
        imgpadding: false,
        nopadding: true,
        active: 0,
        items: [
          {
            icon: "imagen-master-1000.jpg",
            title: "Master 1000"
          },
          {
            icon: "imagen-canaleta.jpg",
            title: "Canaleta"
          },
          {
            icon: "imagen-cubierta-arquitectonica.jpg",
            title: "Cubierta arquitectónica"
          }
        ]
      },
      {
        show: false,
        title: "Selecciona el ambiente",
        subtitle: "( Categorías de corrosividad atmosférica )",
        col: "col-xs-12 col-sm-4",
        imgpadding: true,
        nopadding: false,
        active: 0,
        items: [
          {
            icon: "icono-residencial.png",
            title: "Residencial"
          },
          {
            icon: "icono-industrial.png",
            title: "Inductrial"
          },
          {
            icon: "icono-marino.png",
            title: "Marino"
          }
        ]
      }
    ];

    this.options = [
      {
        title: `C1 MUY BAJA`,
        item: [
          "Construcciones con calefacción con atmósfera limpia y seca, ejemplo: oficinas, tiendas, colegios, hoteles"
        ],
        value: true
      },
      {
        title: `C2 MUY BAJA`,
        item: [
          "INTERIORES: Construcciones sin calefacción donde puede ocurrir condensación, ejemplo: almacenes, centros deportivos",
          "EXTERIORES: Atmósferas con bajo nivel de polución. principalmente areas rurales"
        ],
        value: false
      },
      {
        title: `C3 MEDIA`,
        item: [
          "INTERIORES: Ambientes con alta humedad y cierta polución en el aire, ejemplo: planta de elaboración de alimentos, lavanderías",
          "EXTERIORES: Atmósferas Urbanas e Industriales, polución moderada. Áreas costeras de baja salinidad"
        ],
        value: false
      }
    ];
  }

  updatedValue(index) {
    this.options.map((el, idx) => {
      if (index == idx) {
        el.value = true;
      } else {
        el.value = false;
      }
    });
  }

  select(indexStage, indexItem) {
    this.stages[indexStage].active = indexItem + 1;

    this.timeline[indexStage + 1].show = true;

    switch (indexStage) {
      case 1:
        this.stages[indexStage - 1].show = false;
        this.stages[indexStage].show = false;

        this.stages[indexStage + 1].show = true;
        this.stages[indexStage + 2].show = true;

        break;
      case 3:
        this.showForm = true;
        break;
    }
  }

  goTo(__index) {
    this.timeline.forEach((element, index) => {
      if (__index == 0 || __index == 1) {
        this.stages.map(el => {
          el.active = 0;
          el.show = false;
        });
        this.stages[0].show = true;
        this.stages[1].show = true;
      } else if (__index == 2) {
        this.stages.map((el, idx) => {
          if (idx > 0) {
            el.active = 0;
            el.show = false;
          }
        });
        this.stages[0].show = true;
        this.stages[1].show = true;
      } else if (__index == 3) {
        this.stages.map((el, idx) => {
          if (idx > 1) {
            el.active = 0;
            el.show = false;
          }
        });
        this.stages[2].show = true;
        this.stages[3].show = true;
      } else if (__index == 4) {
        this.stages.map((el, idx) => {
          if (idx > 2) {
            el.active = 0;
            el.show = false;
          }
        });
        this.stages[2].show = true;
        this.stages[3].show = true;
      }
      if (__index <= index && __index > 0) {
        element.show = false;
      }
    });
  }
}

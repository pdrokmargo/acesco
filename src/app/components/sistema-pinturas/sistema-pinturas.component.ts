import { Component, OnInit } from "@angular/core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sistema-pinturas",
  templateUrl: "./sistema-pinturas.component.html",
  styleUrls: ["./sistema-pinturas.component.css"]
})
export class SistemaPinturasComponent implements OnInit {
  faArrowRight = faArrowRight;

  showSector: boolean = true;
  showUso: boolean = false;
  showProducto: boolean = false;
  showCategoria: boolean = false;
  showTipo: boolean = false;
  showRecomendation: boolean = false;

  currentSector: string = "";
  currentUso: string = "";
  currentProducto: string = "";
  currentCategoria: string = "";
  currentTipo: string = "";
  currentSistema: number = -1;

  SECTOR: any = [
    {
      img: "icono-construccion.png",
      title: "Construcción",
      name: "CONSTRUCCION"
    },
    {
      img: "icono-industria.png",
      title: "Industria",
      name: "INDUSTRIAL"
    }
  ];
  USO: any = {
    TECHO: {
      img: "imagen-techo.jpg",
      title: "Techo"
    },
    FACHADA: {
      img: "imagen-fachada.jpg",
      title: "Fachada"
    },
    INTERIOR: {
      img: "imagen-interior.jpg",
      title: "Interior"
    },
    MAQUINA_EQUIPO: {
      img: "imagen-interior.jpg",
      title: "Máquina y Equipo"
    },
    REFRIGERACION: {
      img: "imagen-interior.jpg",
      title: "Refrigeración"
    }
  };
  PRODUCTO: any = {
    MASTER_1000: {
      img: "imagen-master-1000.jpg",
      title: "Master 1000"
    },
    CANALETA: {
      img: "imagen-canaleta.jpg",
      title: "Canaletas"
    },
    CUBIERTA_ARQUITECTONICA: {
      img: "imagen-cubierta-arquitectonica.jpg",
      title: "Cubierta Arquitectónica"
    },
    TEJA_SIN_TRASLAPO: {
      img: "imagen-techo.jpg",
      title: "Teja sin traslapo"
    },
    SILOS: {
      img: "imagen-techo.jpg",
      title: "Silos"
    },
    AGROINDUSTRIA: {
      img: "imagen-techo.jpg",
      title: "Agroindustria"
    },
    MAQUINA_INDUSTRIALES: {
      img: "imagen-techo.jpg",
      title: "Máquinas industriales"
    },
    LINEA_BLANCA: {
      img: "imagen-techo.jpg",
      title: "Línea blanca"
    },
    REFRIGERACION_COMERCIAL: {
      img: "imagen-techo.jpg",
      title: "Refrigeración comercial"
    }
  };
  CATEGORIAS: any = {
    RESIDENCIAL: {
      img: "icono-residencial.png",
      title: "Residencial"
    },
    INDUSTRIAL: {
      img: "icono-industrial.png",
      title: "Industrial"
    },
    MARINO: {
      img: "icono-marino.png",
      title: "Marino"
    },
    AMBIENTES_LIMPIOS: {
      img: "imagen-interior.jpg",
      title: "Ambientes Limpio"
    },
    AMBIENTES_PRODUCCION: {
      img: "imagen-interior.jpg",
      title: "Ambientes de producción (alta humedad)"
    },
    PLANTA_QUIMICA: {
      img: "imagen-interior.jpg",
      title: "Plantas químicas con suaves poluciones"
    },
    PERMANENTE_CONDENSACION: {
      img: "imagen-interior.jpg",
      title: "Permanente condensación y alta polución"
    },
    GRANJAS_GALPONES: {
      img: "imagen-interior.jpg",
      title: "Garnjas/ Galpones"
    },
    GALVANIZADO_400: {
      img: "imagen-interior.jpg",
      title: "Galvanizado > 400 gr/mt2"
    }
  };
  TIPO: any = {
    C1: {
      title: `C1 MUY BAJA`,
      value: false,
      text: [
        `Construcciones con calefacción con atmósferas limpias y secas, ej.: oficinas, tiendas, colegios, hoteles.`
      ]
    },
    C2: {
      title: `C2 BAJA`,
      value: false,
      text: [
        `INTERIORES:  Construcciones sin calefacción donde puede ocurrir condensación, ej.: almacenes, centros deportivos`,
        `EXTERIORES:  Atmósferas con bajo nivel de polución. Principalmente áreas rurales.`
      ]
    },
    C3: {
      title: `C3 MEDIA`,
      value: false,
      text: [
        `INTERIORES: Ambientes con alta humedad y cierta polución en el aire, ej.: plantas de elaboración de alimentos, lavanderías`,
        `EXTERIORES: Atmósferas Urbanas e Industriales, polución moderada. Áreas costeras de baja salinidad.`
      ]
    },
    C4: {
      title: `C4 ALTA`,
      value: false,
      text: [
        `INTERIORES: Plantas químicas, piscinas de natación, galpones, astilleros.`,
        `EXTERIORES: Áreas industriales y costeras con moderada salinidad.`
      ]
    },
    C5_I: {
      title: `C5-I MUY ALTA INDUSTRIAL`,
      value: false,
      text: [
        `INTERIORES: Edificios con condensaciones casi permanentes y alta polución. Estos edificios tienen atmósferas con un riesgo altos de corrosión.`,
        `EXTERIORES: Áreas industriales con alta humedad y atmósfera agresiva.`
      ]
    },
    C5_M: {
      title: "C5-M MUY ALTO MARINO",
      value: false,
      text: [`EXTERIORES: Áreas Costeras con alta salinidad.`]
    }
  };
  SISTEMAS: any = {
    POLYESTER: {
      name: "Protec Estándar",
      value: 2,
      img: "imagen-techo.jpg"
    },
    SUPER_POLYESTER: {
      name: "Protec Super",
      value: 5,
      img: "imagen-techo.jpg"
    },
    PVDF_57: {
      name: "PVDF 5/7",
      value: 7,
      img: "imagen-techo.jpg"
    },
    PVDF_1820: {
      name: "Protec Ultra",
      value: 10,
      img: "imagen-techo.jpg"
    },
    PVDF_CLEAR: {
      name: "Protec Master",
      value: 20,
      img: "imagen-techo.jpg"
    },
    GALVANIZADO: {
      name: "Galvanizado > 400 gr/mt2",
      value: 20,
      img: "imagen-techo.jpg"
    }
  };

  listUSO = [];
  listPRODUCTO = [];
  listCATEGORIA = [];
  listTIPO = [];
  listSISTEMA = [];

  constructor() {}

  ngOnInit() {}

  selectSector(name) {
    if (this.currentSector != name) {
      this.currentSector = name;
      this.showUso = true;
      this.currentUso = "";

      this.showProducto = false;
      this.listPRODUCTO = [];
      this.currentProducto = "";

      this.showCategoria = false;
      this.listCATEGORIA = [];
      this.currentCategoria = "";

      this.showTipo = false;
      this.listTIPO = [];

      this.showRecomendation = false;

      switch (this.currentSector) {
        case "CONSTRUCCION":
          this.listUSO = ["TECHO", "FACHADA", "INTERIOR"];
          break;
        case "INDUSTRIAL":
          this.listUSO = ["MAQUINA_EQUIPO", "REFRIGERACION"];
          break;
      }
    }
  }

  selectUso(uso) {
    this.showSector = false;
    this.showUso = false;
    if (this.currentUso != uso) {
      this.currentUso = uso;
      this.showProducto = true;

      this.showProducto = true;
      this.listPRODUCTO = [];
      this.currentProducto = "";

      this.showCategoria = false;
      this.listCATEGORIA = [];
      this.currentCategoria = "";

      this.showTipo = false;
      this.listTIPO = [];

      this.showRecomendation = false;
      this.listSISTEMA = [];

      this.showRecomendation = false;
      switch (this.currentUso) {
        case "TECHO":
        case "FACHADA":
          this.listPRODUCTO = [
            "MASTER_1000",
            "CANALETA",
            "CUBIERTA_ARQUITECTONICA"
          ];
          break;
        case "INTERIOR":
          this.listPRODUCTO = [];
          this.showProducto = false;
          this.showCategoria = true;

          this.listCATEGORIA = [
            "AMBIENTES_LIMPIOS",
            "AMBIENTES_PRODUCCION",
            "PLANTA_QUIMICA",
            "PERMANENTE_CONDENSACION",
            "GRANJAS_GALPONES"
          ];
          break;
        case "MAQUINA_EQUIPO":
          this.listPRODUCTO = [
            "SILOS",
            "AGROINDUSTRIA",
            "MAQUINA_INDUSTRIALES"
          ];
          break;
        case "REFRIGERACION":
          this.listPRODUCTO = ["LINEA_BLANCA", "REFRIGERACION_COMERCIAL"];
          break;
      }
    }
  }

  selectProducto(producto) {
    if (this.currentProducto != producto) {
      this.currentProducto = producto;
      this.showCategoria = true;
      this.listCATEGORIA = [];
      this.currentCategoria = "";

      this.showTipo = false;
      this.listTIPO = [];

      this.showRecomendation = false;
      switch (this.currentProducto) {
        case "MASTER_1000":
        case "CANALETA":
        case "CUBIERTA_ARQUITECTONICA":
        case "TEJA_SIN_TRASLAPO":
          this.listCATEGORIA = ["RESIDENCIAL", "INDUSTRIAL", "MARINO"];
          break;
        case "SILOS":
        case "AGROINDUSTRIA":
        case "MAQUINA_INDUSTRIALES":
          // this.listCATEGORIA = ["GALVANIZADO_400"];
          this.selectTipo("");
          break;
        case "LINEA_BLANCA":
        case "REFRIGERACION_COMERCIAL":
          this.selectTipo("");
          break;
      }
    }
  }

  selectCategoria(categoria) {
    if (this.currentCategoria != categoria) {
      this.currentCategoria = categoria;
      this.showTipo = true;
      this.listTIPO = [];
      this.showRecomendation = false;
      this.listSISTEMA = [];
      this.currentTipo = "";
      switch (this.currentCategoria) {
        case "RESIDENCIAL":
          this.listTIPO = ["C1", "C2", "C3"];
          break;
        case "INDUSTRIAL":
          this.listTIPO = ["C4", "C5_I"];
          break;
        case "MARINO":
          this.listTIPO = ["C5_M"];
          break;
        default:
          this.selectTipo("");
          break;
      }
      this.listTIPO.forEach(element => {
        this.TIPO[element].value = false;
      });
    }
  }

  selectTipo(tipo) {
    if (tipo == "" || this.currentTipo != tipo) {
      this.currentTipo = tipo;
      this.showRecomendation = false;
      this.listTIPO.forEach(element => {
        if (this.currentTipo != element) {
          this.TIPO[element].value = false;
        } else {
          this.TIPO[element].value = true;
          this.showRecomendation = true;
        }
      });

      if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "MASTER_1000" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "MASTER_1000" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "MASTER_1000" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "MASTER_1000" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CANALETA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CANALETA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CANALETA" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CANALETA" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "TECHO" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "MASTER_1000" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "MASTER_1000" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "MASTER_1000" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "MASTER_1000" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CANALETA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CANALETA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CANALETA" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CANALETA" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "CUBIERTA_ARQUITECTONICA" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "TEJA_SIN_TRASLAPO" &&
        this.currentCategoria == "RESIDENCIAL" &&
        this.currentTipo == "C1"
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "TEJA_SIN_TRASLAPO" &&
        this.currentCategoria == "RESIDENCIAL" &&
        (this.currentTipo == "C2" || this.currentTipo == "C3")
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "TEJA_SIN_TRASLAPO" &&
        this.currentCategoria == "INDUSTRIAL" &&
        this.currentTipo == "C4"
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "FACHADA" &&
        this.currentProducto == "TEJA_SIN_TRASLAPO" &&
        (this.currentCategoria == "INDUSTRIAL" ||
          this.currentCategoria == "MARINO") &&
        (this.currentTipo == "C5_I" || this.currentTipo == "C5_M")
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "INTERIOR" &&
        this.currentProducto == "" &&
        this.currentCategoria == "AMBIENTES_LIMPIOS" &&
        this.currentTipo == ""
      ) {
        this.listSISTEMA = [
          { key: "POLYESTER", value: 2 },
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "INTERIOR" &&
        this.currentProducto == "" &&
        this.currentCategoria == "AMBIENTES_PRODUCCION" &&
        this.currentTipo == ""
      ) {
        this.listSISTEMA = [
          { key: "SUPER_POLYESTER", value: 5 },
          // { key: "PVDF_57", value: 7 },
          { key: "PVDF_1820", value: 10 },
          { key: "PVDF_CLEAR", value: 20 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "INTERIOR" &&
        this.currentProducto == "" &&
        this.currentCategoria == "PLANTA_QUIMICA" &&
        this.currentTipo == ""
      ) {
        this.listSISTEMA = [
          { key: "PVDF_1820", value: 8 },
          { key: "PVDF_CLEAR", value: 10 }
        ];
      } else if (
        this.currentSector == "CONSTRUCCION" &&
        this.currentUso == "INTERIOR" &&
        this.currentProducto == "" &&
        (this.currentCategoria == "PERMANENTE_CONDENSACION" ||
          this.currentCategoria == "GRANJAS_GALPONES") &&
        this.currentTipo == ""
      ) {
        this.listSISTEMA = [{ key: "PVDF_CLEAR", value: 7 }];
      } else if (
        this.currentSector == "INDUSTRIAL" &&
        this.currentUso == "MAQUINA_EQUIPO" &&
        (this.currentProducto == "SILOS" ||
          this.currentProducto == "AGROINDUSTRIA" ||
          this.currentProducto == "MAQUINA_INDUSTRIALES") &&
        this.currentTipo == ""
      ) {
        this.listSISTEMA = [{ key: "GALVANIZADO", value: 0 }];
      } else if (
        this.currentSector == "INDUSTRIAL" &&
        this.currentUso == "REFRIGERACION" &&
        (this.currentProducto == "LINEA_BLANCA" ||
          this.currentProducto == "REFRIGERACION_COMERCIAL") &&
        this.currentTipo == ""
      ) {
        this.listSISTEMA = [{ key: "SUPER_POLYESTER", value: 5 }];
      }

      if (tipo == "") {
        this.showRecomendation = true;
      }
      this.currentSistema = 0;
      if(this.currentTipo == "C1"){
        this.currentSistema = 1;
      }
      if(this.currentTipo == "C2" || this.currentTipo == "C3" || this.currentTipo == "C4" || this.currentTipo == "C5_I" || this.currentTipo == "C5_M"){
        this.currentSistema = 0;
      }
      // if(this.listSISTEMA.length > 1){
      //   this.currentSistema = 1;
      // }
      

    }
  }
}

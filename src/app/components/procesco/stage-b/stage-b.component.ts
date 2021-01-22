/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 10/01/08
 */

import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  faCaretDown,
  faCaretRight,
  faCaretUp,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { UserInterface } from "../../../Interfaces/user.interface";
import { ProcescoService } from "../../../services/procesco.service";
import { ToggleInterface } from "../../../Interfaces/toggle.interface";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-stage-b",
  templateUrl: "./stage-b.component.html",
  styleUrls: ["./stage-b.component.css"]
})
export class StageBComponent {
  private __approved = false;
  @Input() set approved(approved: boolean) {
    this.__approved = approved;
    this.isAdminUser = false;
  }

  @Output() emitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faSpinner = faSpinner;
  height: number;
  loading: boolean = false;
  loadingTwo: boolean = false;
  step: number;
  user: any = {};
  id: number;
  stageB: object;
  lists: object;
  selfEvaluation: boolean;
  selfEvaluationToggles: any[] = [];
  physicalSecurityAgreementsToggles: any[] = [];
  annex1Toggles: any[] = [];
  annex2Toggles: any[] = [];
  isAdminUser: boolean;
  language: any;
  legalRepresentative: any = {};

  constructor(
    public procescoService: ProcescoService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(
      activeRoute => {
        if (activeRoute["id"]) {
          this.isAdminUser = true;
          this.procescoService.getUserById(activeRoute.id).subscribe(
            (user: any) => {
              this.user = user;
              this.step = user.currentStep;
              this.language = user.language;
              this.procescoService
                .getStepById(user.stageb_id, "stage-b")
                .subscribe(
                  (stage: any) => {
                    this.stageB = stage.stage_b;
                    this.selfEvaluationToggles.forEach(element => {
                      element.value = this.stageB[element.model];
                    });
                    this.physicalSecurityAgreementsToggles.forEach(element => {
                      element.value = this.stageB[element.model];
                    });
                    this.annex1Toggles.forEach(element => {
                      element.value = this.stageB[element.model];
                      element.visibible = this.annexApplies(element.model);
                    });
                    this.annex2Toggles.forEach(element => {
                      element.value = this.stageB[element.model];
                    });
                  },
                  error1 => {
                    console.error(error1);
                  }
                );
            },
            error1 => {
              console.error(error1);
            }
          );
        } else {
          console.log("here is where you have to get representative.")
          this.procescoService.getLogedUser().subscribe(
            user => {
              this.procescoService.getRepresentative(user.id).subscribe(
                (representative: any) => {
                  console.log(representative.representative);
                  let rep = representative.representative;
                  let docType = "";
                  if(rep.docType == 1){
                    rep.docType = "cédula de ciudadanía";
                  }else if(rep.docType == 2){
                    rep.docType = "NIT";
                  }
                  if(rep.docTypeBusiness == 1){
                    rep.docTypeBusiness = "cédula de ciudadanía";
                  }else if(rep.docTypeBusiness == 2){
                    rep.docTypeBusiness = "NIT";
                  }
                  this.legalRepresentative = {name: rep.name, 
                    docType: rep.docType, 
                    businessName: rep.businessName, 
                    docNumber: rep.docNumber,
                    docBusinessNumber: rep.docBusinessNumber,
                    docTypeBusiness: rep.docTypeBusiness,
                  };
                },
                  error1 => {
                    console.error(error1);
                  }
                );
              this.step = user.currentStep;
              this.id = user.id;
              this.user = user;
              this.language = user.language;
              this.step = user.currentStep;
              this.annex1Toggles.forEach(element => {
                element.visibible = this.annexApplies(element.model);
              });

              if (user.stageb_id > 0) {
                this.procescoService
                  .getStepById(user.stageb_id, "stage-b")
                  .subscribe(
                    ({ stage_b }: any) => {
                      this.stageB = stage_b;
                      this.successMessage = `La etapa esta siendo revisada`;
                    },
                    error1 => console.error(error1)
                  );
              }
            },
            error1 => console.error(error1)
          );
        }
        this.id = activeRoute.id;
      },
      error1 => {
        console.error(error1);
      }
    );

    this.lists = {
      selfEvaluation: true,
      manifest: true,
      physicalSecurityAgreements: false
    };
    this.selfEvaluationToggles = [
      {
        model: "activitiesAsSocialReason",
        value: false,
        text: "Las actividades realizadas coinciden con la Razón Social."
      },
      {
        model: "secureFacilities",
        value: false,
        text:
          "La empresa cuenta con instalaciones seguras y acordes para el desarrollo del objeto social."
      },
      {
        model: "securityAgreements",
        value: false,
        text:
          "Tiene acuerdos de seguridad y/o Manifiestos de cumplimientos de los requerimientos minimos de seguridad de la cadena de suministro."
      },
      {
        model: "qualityCertifications",
        value: false,
        text:
          "Cuenta con certificaciones de seguridad y calidad. En caso de ser afirmativo relacionar en observaciones el numero del certificado."
      },
      {
        model: "selectionProgram",
        value: false,
        text:
          "Cuenta con un exigente programa de selección, control de seguridad y monitoreo continuo de los asociados de negocio, para protegerse de las actividades ilícitas o verse involucrado en incidentes de contaminación de sus cadenas de suministro."
      },
      {
        model: "containersIntegity",
        value: false,
        text:
          "Implementa medidas orientadas a mantener la integridad de los controles de los contenedores y demás unidades de carga, así como de los medios de transporte, con el fin de prevenir la ocurrencia de incidentes de seguridad."
      },
      {
        model: "storageAndTransportIntegrity",
        value: false,
        text:
          "Cuenta con procedimientos para garantizar la integridad y seguridad de los procesos relativos al manejo, almacenamiento y transporte de carga en la cadena de suministro."
      },
      {
        model: "shippingDocumentation",
        value: false,
        text:
          "Se asegura que la carga concuerde con la documentación del envío y que esté disponible antes de la llegada del despacho o recepción de la carga al igual que garantizar su trazabilidad."
      },
      {
        model: "documentationAndSystemsConfidentiality",
        value: false,
        text:
          "Cuenta con medidas que protejan el acceso no autorizado a la información, documentación y a los sistemas informáticos, para mantener la confidencialidad de la información de sus operaciones."
      },
      {
        model: "trainingPrograms",
        value: false,
        text:
          "Implementa programas de formación para que sus empleados, en todos los niveles, desarrollen la capacidad de mantener la seguridad de la cadena de suministros reconociendo amenazas internas y externas en cada punto de la cadena."
      },
      {
        model: "physicalAccessControls",
        value: false,
        text:
          "Tienen controles de acceso físico en las instalaciones de la empresa que incluya medidas de seguridad para prevenir el acceso no autorizado a las instalaciones tanto de empleados como visitantes."
      },
      {
        model: "perimetersControl",
        value: false,
        text:
          "Implementa medidas que garanticen la seguridad de todas sus instalaciones, asi como la vigilancia y control de los perimetros exterior e interior."
      },
      {
        model: "dissuasionElements",
        value: false,
        text:
          "Sus instalaciones de manejo y almacenamiento cuentan con barreras fisicas y elementos de disuación para protegerlas contra el acceso no autorizado."
      },
      {
        model: "securityService",
        value: false,
        text:
          "La empresa cuenta con un servicio de seguridad propio o contratado."
      },
      {
        model: "warningDevices",
        value: false,
        text:
          "Hay procedimientos o dispositivos de alerta para evacuación en caso de amenaza o fallos en las medidas de protección."
      },
      {
        model: "authoritiesReporting",
        value: false,
        text:
          "Cuenta con instrumentos para reportar a las autoridades nacionales ó extranjeras los casos en que detecten irregularidades o actividades ilegales o sospechosas en sus cadenas de suministro."
      },
      {
        model: "economicActivityEvidence",
        value: false,
        text:
          "En los ingresos de empresa hay evidencia que corresponden a la actividad económica a la cual se dedica."
      },
      {
        model: "sanitaryRegulations",
        value: false,
        text:
          "Se asegura que sus asociados de negocio cumplan con toda la normatividad sanitaria y fitosanitaria vigente."
      },
      {
        model: "inadequateProposals",
        value: false,
        text:
          "Se han recibido propuestas inadecuadas por parte de algún asociado de negocio (Negocios no seguros, metodologías de pagos en efectivo, cambios, presiones para el embarque sin documentación u omisiones de aranceles). Si la respuesta es afirmativa relacionar en las observaciones cuáles fueron las propuestas."
      }
    ];
    this.physicalSecurityAgreementsToggles = [
      {
        model: "legalRequirementsAndRegulations",
        value: false,
        text:
          "Cumpliremos todas y cada una de los requisitos legales y la normatividad vigente en lo que se aplicable para la actividad económica desarrollada en el territorio nacional e internacional."
      },
      {
        model: "protectionProgram",
        value: false,
        text:
          "Implementaremos un programa de protección al alcance de toda la compañía a través del cual se garantice que los bienes y/o serivcios suministrados se encuentran libres de cualquier tipo de actividad ilícita."
      },
      {
        model: "physicalSecurityGuarantee",
        value: false,
        text:
          "Garantizaremos la seguridad física de las instalaciones o sitios en los cuales ejecutamos las actividades asociadas al siministro de bienes y servicios para proteger si integridad."
      },
      {
        model: "illicitActivitiesAbsence",
        value: false,
        text:
          "Desarollaremos procesos de selección y mantenimiento de persona orientados al aseguramiento de su confiabilidad, incluyendo la ausencia de vinculación con actividades ilícitas incluyendo el lavado de activos y la financiación del terrorismo."
      },
      {
        model: "confidentiality",
        value: false,
        text:
          "Mantendremos bajo estricta confidencialidad la información relacionada con ACESCO a la cual pueda tener acceso."
      },
      {
        model: "acescoElementsProtection",
        value: false,
        text:
          "Protegeremos los elementos de propiedad de ACESCO, necesarios para la prestación del servicio y propenderemos pro la ejecución de acciones que eviten afectar su imagen y seguridad operativa."
      },
      {
        model: "continuousCommunication",
        value: false,
        text:
          "Cooperaremos y manendremos una comunicación continua y oportuna con ACESCO de las novedades que puedan presentarse en nuestra empresa con relación a eventos criticos de seguridad."
      },
      {
        model: "recommendations",
        value: false,
        text:
          "Consultaremos preiódicamente las recomendaciones de seguridad que ACESCO publica en su pagina web corporativa y otros mecanismos de comunicación establecidos, atendiéndolos con la debida diligencia."
      },
      {
        model: "additionalSafetyMeasures",
        value: false,
        text:
          "Informaremos a ACESCO aceca de medidas de seguridad adicionale requeridas para el suministro de bienes y servicios y de acuerdo con la evaluación de riesgo correspondiente."
      },
      {
        model: "securityDocuments",
        value: false,
        text:
          "Estaremos dispuestos a suministrar a ACESCO, en caso de ser requerido, los documentos y registros en materia de seguridad relacionados con el suministro de bienes y servicios, y atender visitas periódicas para evaluar el cumplimiento de este acuerdo."
      }
    ];
    this.annex1Toggles = [
      {
        model: "chamberCommerce",
        value: false,
        text:
          "Certificado de cámara de comercio (Vigencia no mayor a un (1) mes).",
          visibible: true
      },
      {
        model: "identificationCard",
        value: false,
        text: "Fotocopia de la cédula del representante legal.",
        visibible: true
      },
      {
        model: "rut",
        value: false,
        text: "Copia del RUT (Fecha de impresión no mayor a un (1) mes).",
        visibible: true
      },
      {
        model: "shareholdingStructure",
        value: false,
        text: "Composición accionaria.",
        visibible: true
      },
      {
        model: "constanciaBancaria",
        value: false,
        text: "Constacia Bancaria  (no mayor a un (1) mes).",
        visibible: true
      },
      {
        model: "rucAndBasc",
        value: false,
        text:
          "Copias de la calificación en ruc y de las certificaciones/acreditaciones en sistemas de gestión, BASC y sello de producto que pose vigentes.",
          visibible: true
      },
      {
        model: "securityKnowledgeSign",
        value: false,
        text: "Firma Archivo Conocimiento de los aspectos de seguridad asociados de negocio.",
        visibible: true
      },
      {
        model: "manifestSecuritySign",
        value: false,
        text: "Firma Archivo Manifiesto de cumplimiento de los requisitos mínimos de seguridad",
        visibible: true
      },
      {
        model: "safetyData",
        value: false,
        text: "Ficha de seguridad de los productos",
        visibible: true
      } /* Sólo pstrarla cuando la clasificación sea químicos o proveedor haya marcada alto */,
      {
        model: "contingencyPlan",
        value: false,
        text: "Plan de contingencia - preparación y respuesta ante emergencias.",
        visibible: true
      },
      {
        model: "productSpecifications",
        value: false,
        text: "Ficha técnica del producto cone specificaciones.",
        visibible: true
      },
      {
        model: "sustainabilityReport",
        value: false,
        text: "Reporte de sostenibilidad.",
        visibible: true
      },
      {
        model: "technicalStandards",
        value: false,
        text: "Certificados de normas técnicas que le apliquen.",
        visibible: true
      },
      {
        model: "relationshipRequirements",
        value: false,
        text: "Requisitos varios específicos del relacionamiento con Acesco",
        visibible: true
      },
      {
        model: "aprovechamientoForestal",
        value: false,
        text: "Certificado aprovechamiento forestal.",
        visibible: true
      },
      {
        model: "salvoConductoMovilizacion",
        value: false,
        text: "Salvo conducto para movilización.",
        visibible: true
      },
      {
        model: "relacionVehiculos",
        value: false,
        text: "Relación vehículos de transporte a usar (placa , tipo vehículo, marca, modelo, cantidad y combustible).",
        visibible: true
      },
      {
        model: "planMantenimientoVehicular",
        value: false,
        text: "Plan mantenimiento vehicular por vehículo contratado.",
        visibible: true
      },
      {
        model: "cursoBasicoManejo",
        value: false,
        text: "Curso básico de manejo y transporte de mercancía.",
        visibible: true
      },
      {
        model: "pesv",
        value: false,
        text: "Carta de radicación ante la entidad competente de su plan estratégico de seguridad vial (PESV).",
        visibible: true
      },
      {
        model: "specialContingencyPlan",
        value: false,
        text: "Plan de contingencia y control pertinente a su servicio.",
        visibible: true
      },
      
      {
        model: "approvalContingencyPlan",
        value: false,
        text: "Radicación y aprobación de plan de contingencia por parte de la autoridad pertinente.",
        visibible: true
      }
    ];
    this.annex2Toggles = [
      // { model: 'annex6', value: false, text: 'Declaración de compromiso de seguridad (anexo pagina 6)' },
      // {
      //   model: "safetyData",
      //   value: false,
      //   text: "Ficha de seguridad de los productos"
      // } /* Sólo pstrarla cuando la clasificación sea químicos o proveedor haya marcada alto */,
      // {
      //   model: "contingencyPlan",
      //   value: false,
      //   text: "Plan de contingencia - preparación y respuesta ante emergencias."
      // },
      // {
      //   model: "productSpecifications",
      //   value: false,
      //   text: "Ficha técnica del producto cone specificaciones."
      // },
      // {
      //   model: "sustainabilityReport",
      //   value: false,
      //   text: "Reporte de sostenibilidad."
      // },
      // {
      //   model: "technicalStandards",
      //   value: false,
      //   text: "Certificados de normas técnicas que le apliquen."
      // },
      // {
      //   model: "relationshipRequirements",
      //   value: false,
      //   text: "Requisitos varios especificos del relaciónamiento con Acesco"
      // }
    ];
    this.selfEvaluation = false;

    this.stageB = {
      isRelatedToAcesco: false,
      reasonRelatedToAcesco: "",
      acescoElementsProtection: false,
      activitiesAsSocialReason: false,
      additionalSafetyMeasures: false,
      annex6: false,
      authoritiesReporting: false,
      confidentiality: false,
      containersIntegity: false,
      contingencyPlan: false,
      continuousCommunication: false,
      dissuasionElements: false,
      documentationAndSystemsConfidentiality: false,
      economicActivityEvidence: false,
      illicitActivitiesAbsence: false,
      inadequateProposals: false,
      inadequateProposalsWhat: null,
      legalRequirementsAndRegulations: false,
      manifest: false,
      ethicCode: false,
      relatedToAcescoManifest: false,
      minimumSafetyRequirements: true,
      perimetersControl: false,
      physicalAccessControls: false,
      physicalSecurityAgreements: true,
      physicalSecurityGuarantee: false,
      productSpecifications: false,
      protectionProgram: false,
      qualityCertifications: false,
      recommendations: false,
      relationshipRequirements: false,
      safetyData: false,
      sanitaryRegulations: false,
      secureFacilities: false,
      securityAgreements: false,
      securityDocuments: false,
      securityService: false,
      selectionProgram: false,
      shippingDocumentation: false,
      storageAndTransportIntegrity: false,
      sustainabilityReport: false,
      technicalStandards: false,
      trainingPrograms: false,
      warningDevices: false
    };
  }

  updatedValue(event: ToggleInterface) {
    this.stageB[event.key] = event.value;
    // if(this.stageB["manifest"]){
    //   this.lists["lists"] = true;
    // }
  }

  toggleList(list: string) {
    this.lists[list] = !this.lists[list];
  }

  formData: FormData = new FormData();

  fileChange(event: any, model: string) {
    const fileList: FileList = event.target.files;
    if (!fileList.length) {
      return;
    }

    const file: File = fileList[0];
    this.formData.set(`${model}File`, file, file.name);
  }

  autoFill() {
    this.selfEvaluationToggles.forEach(el => {
      this.stageB[el.model] = true;
      el.value = true;
    });
    this.physicalSecurityAgreementsToggles.forEach(el => {
      this.stageB[el.model] = true;
      el.value = true;
    });
    this.annex2Toggles.forEach(el => {
      this.stageB[el.model] = true;
      el.value = true;
    });
  }

  onSubmit() {
    this.loading = true;
    this.procescoService.updateUser(this.stageB, "stage-b").subscribe(
      (res: any) => {
        this.procescoService.putFile(this.formData).subscribe(
          r => {
            this.router.navigate(["procesco/confirmacion"]);
            this.loading = false;
            console.log(r);
          },
          e => {
            console.error(e);
          }
        );
      },
      err => {
        console.error(err);
      }
    );
  }

  successMessage: string;
  approval() {
    this.loading = true;
    const finalObject = {
      stagea_id: null,
      currentStep: 3
    };
    this.procescoService.adminApproval(this.id, finalObject).subscribe(
      (response: any) => {
        this.loading = false;
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(["procesco/admin"]);
        }, 2000);
      },
      error1 => {
        console.error(error1);
      }
    );
  }
  updated(callback) {
    this.procescoService
      .updateUser(this.stageB, "stage-b")
      .subscribe(res => this.emitEvent.emit(true), err => console.error(err));
  }
  annexApplies(file){
    let c: any;
    if(this.user['pre_registro']){
     c = this.user['pre_registro']['classification_id'];
    }
    if(file == 'chamberCommerce'){
      if(c > 0){
          return true;
      }
    }
    if(file == 'identificationCard'){
      if(c > 0){
          return true;
      }
    }
    if(file == 'rut'){
      if(c > 0){
          return true;
      }
    }
    if(file == 'shareholdingStructure'){
      if(c > 0){
          return true;
      }
    }
    if(file == 'constanciaBancaria'){
      if(c > 0){
          return true;
      }
    }
    if(file == 'rucAndBasc'){
      if(c > 0){
          return true;
      }
    }
      
    if(file == 'safetyData' || file == 'contingencyPlan' || file == 'productSpecifications'){
      /*1:Agencia de publicidad 2:Alimentos/aseo/medicina 12:Gases industriales 16:Materia prima 20:Plastico/caucho/fibras 
      21:Quimicos/combustibles 28:Servicios generales 29:Servicios Informaticos*/
      if(c == 1 || c == 2 || c == 12 || c == 16 || c == 20 || c == 21 || c == 28 || c == 29){
          return true;
      }
    }

    if(file == 'aprovechamientoForestal' || file == 'salvoConductoMovilizacion'){
      /*3:Aserraderos*/
      if(c == 3){
          return true;
      }
    }

    if(file == 'relacionVehiculos' || file == 'planMantenimientoVehicular' || file == 'cursoBasicoManejo' || file == 'pesv' || file == 'specialContingencyPlan' || file == 'approvalContingencyPlan'){
      /*31:Servicios Logisticos 35:Transporte carga, 36:personal, 37:maritimo y 38:paqueteo*/
      if(c == 31 || c == 35 || c == 36 || c == 37 || c == 38){
          return true;
      }
    }
    return false;
  }
  downloadFile() {
    this.loadingTwo = true;
    this.procescoService
      .GET_FILE(`download-documents/${this.user.name}`)
      .subscribe((res: any) => {
        const blob = new Blob([res], {
          type: "application/zip"
        });
        this.loadingTwo = false;
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      });
  }
}

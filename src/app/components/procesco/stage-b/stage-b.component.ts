import { ChangeDetectorRef, Component} from '@angular/core';
import {faCaretDown, faCaretRight, faCaretUp, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {UserInterface} from '../../../Interfaces/user.interface';
import {ProcescoService} from '../../../services/procesco.service';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';

@Component({
  selector: 'app-stage-b',
  templateUrl: './stage-b.component.html',
  styleUrls: ['./stage-b.component.css']
})
export class StageBComponent implements AfterViewInit {
  faCaretRight = faCaretRight;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  faSpinner = faSpinner;
  height: number;
  loading: boolean;
  step: number;
  user: UserInterface;
  stageB: object;
  lists: object;
  selfEvaluation: boolean;
  selfEvaluationToggles: any [] = [];
  physicalSecurityAgreementsToggles: any [] = [];
  annex1Toggles: any [] = [];
  annex2Toggles: any [] = [];

  constructor(public procescoService: ProcescoService, private cdRef: ChangeDetectorRef) {
    this.lists = {
      selfEvaluation: false,
      manifest: false,
      physicalSecurityAgreements: false
    };
    this.selfEvaluationToggles = [
      {model: 'activitiesAsSocialReason', value: false, text: 'Las actividades realizadas coinciden con la Razón Social.'},
      {
        model: 'secureFacilities',
        value: false,
        text: 'La empresa cuenta con instalaciones seguras y acordes para el desarrollo del objeto social.'
      },
      {
        model: 'securityAgreements',
        value: false,
        text: 'Tiene acuerdos de seguridad y/o Manifiestos de cumplimientos de los requerimientos minimos de seguridad de la cadena de suministro.'
      },
      {
        model: 'qualityCertifications',
        value: false,
        text: 'Cuenta con certificaciones de seguridad y calidad. En caso de ser afirmativo relacionar en observaciones el numero del certificado.'
      },
      {
        model: 'selectionProgram',
        value: false,
        text: 'Cuenta con un exigente programa de selección, control de seguridad y monitoreo continuo de los asociados de negocio, para protegerse de las actividades ilícitas o verse involucrado en incidentes de contaminación de sus cadenas de suministro.'
      },
      {
        model: 'containersIntegity',
        value: false,
        text: 'Implementa medidas orientadas a mantener la integridad de los controles de los contenedores y demás unidades de carga, así como de los medios de transporte, con el fin de prevenir la ocurrencia de incidentes de seguridad.'
      },
      {
        model: 'storageAndTransportIntegrity',
        value: false,
        text: 'Cuenta con procedimientos para garantizar la integridad y seguridad de los procesos relativos al manejo, almacenamiento y transporte de carga en la caena de suministro.'
      },
      {
        model: 'shippingDocumentation',
        value: false,
        text: 'Se asegura que la carga concuerde con la documentación del envío y que esté disponible antes de la llegada del despacho o recepción de la carga al igual que garantizar su trazabilidad.'
      },
      {
        model: 'documentationAndSystemsConfidentiality',
        value: false,
        text: 'Cuenta con medidas que protejan el acceso no autorizado a la información, documentación y a los sistemas informáticos, para mantener la confidencialidad de la información de sus operaciones.'
      },
      {
        model: 'trainingPrograms',
        value: false,
        text: 'Implementa programas de formación para que sus empleados, en todos los niveles, desarrollen la capacidad de mantener la seguridad de la cadena de suministros reconociendo amenazas internas y externas en cada punto de la cadena.'
      },
      {
        model: 'physicalAccessControls',
        value: false,
        text: 'Tienen controles de acceso fisico en las instalaciones de la empresa que ingluya medidas de seguridad para prevenir el acceso no autorizado a las instalaciones tanto de empleados como visitantes.'
      },
      {
        model: 'perimetersControl',
        value: false,
        text: 'Implementa medidas que aranticen la seguridad de todas sus instalaciones, asi como la vigilancia y control de los perimetros exterior e interior.'
      },
      {
        model: 'dissuasionElements',
        value: false,
        text: 'Sus instalaciones de manejo y almacenamiento cuentan con barreras fisicas y elementos de disuación para protegerlas contra el acceso no autorizado.'
      },
      {model: 'securityService', value: false, text: 'La empresa cuenta con un servicio de seguridad propio o contratado.'},
      {
        model: 'warningDevices',
        value: false,
        text: 'Hay procedimientos o dispositivos de alerta para evacuación en caso de amenaza o fallos en las medidas de protección.'
      },
      {
        model: 'authoritiesReporting',
        value: false,
        text: 'Cuenta con instrumentos para reportar a las autoridades nacionale so extranjeras los casos en que detecten irregularidades o actividades ilegales o sospechosas en sus cadenas de suministro.'
      },
      {
        model: 'secureFacilities',
        value: false,
        text: 'Se han recibido propuestas inadecuadas por parte de algun asociado de negocio (Negocios no seguros, metodologias de pagos en efectivo, cambios, presiones para el embarque sin documentación u omisiones de aranceles). Si la respuesta es afirmativa relacionar en las observaciones cuáles fueron las propuestas.'
      },
      {
        model: 'economicActivityEvidence',
        value: false,
        text: 'En los ingresos de empresa hay evidencia que corresponden a la actividad económica a la cual se dedica.'
      },
      {
        model: 'sanitaryRegulations',
        value: false,
        text: 'Se asegura que sus asociados de negocio cumplan con toda la normatividad sanitaria y fitosanitaria vigente.'
      },
    ];
    this.physicalSecurityAgreementsToggles = [
      {
        model: 'legalRequirementsAndRegulations',
        value: false,
        text: 'Cumpliremos todas y cada una de los requisitos legales y la normatividad vigente en lo que se aplicable para la actividad económica desarrollada en el territorio nacional e internacional.'
      },
      {
        model: 'protectionProgram',
        value: false,
        text: 'Implementaremos un programa de protección al alcance de oda la compañia a través del cual se garantice que los bienes y/o serivcios suministrados se encuentran libres de cualquier tipo de actividad ilícita.'
      },
      {
        model: 'physicalSecurityGuarantee',
        value: false,
        text: 'Garantizaremos la seguridad fisica de las instalaciones o sitios en los cuales ejecutamos las actividades asociadas al siministro de bienes y servicios para proteger si integridad.'
      },
      {
        model: 'illicitActivitiesAbsence',
        value: false,
        text: 'Desarollaremos procesos de selcción y mantenimiento de persona orientados al aseguramiento de su confiabilidad, incluyendo la ausencia de vinculación con actividades ilicitas incluyendo el lavado de activos y la financiación del terrorismo.'
      },
      {
        model: 'confidentiality',
        value: false,
        text: 'Mantendremos bajo estricta confidencialidad la información relacionada con ACESCO a la cual pueda tener acceso.'
      },
      {
        model: 'acescoElementsProtection',
        value: false,
        text: 'Protegeremos los elementos de propiedad de ACESCO, necesarios para la prestación del servicio y propenderemos pro la ejecución de acciones que eviten afectar su imagen y seguridad operativa.'
      },
      {
        model: 'continuousCommunication',
        value: false,
        text: 'Cooperaremos y manendremos una comunicación continua y oportuna con ACESCO de las novedades que puedan presentarse en nuestra empresa con relación a eventos criticos de seguridad.'
      },
      {
        model: 'recommendations',
        value: false,
        text: 'Consultaremos preiódicamente las recomendaciones de seguridad que ACESCO publica en su pagina web corporativa y otros mecanismos de comunicación establecidos, atendiéndolos con la debida diligencia.'
      },
      {
        model: 'additionalSafetyMeasures',
        value: false,
        text: 'Informaremos a ACESCO aceca de medidas de seguridad adicionale requeridas para el suministro de bienes y servicios y de acuerdo con la evaluación de riesgo correspondiente.'
      },
      {
        model: 'securityDocuments',
        value: false,
        text: 'Estaremos dispuestos a suministrar a ACESCO, en caso de ser requerido, los documentos y registros en materia de seguridad relacionados con el suministro de bienes y servicios, y atender visitas periódicas para evaluar el cumplimiento de este acuerdo.'
      },
    ];
    this.annex1Toggles = [
      {model: 'chamberCommerce', value: false, text: 'Certificado de cámara de comercio (Vigencia no mayor a un (1) mes).'},
      {model: 'identificationCard', value: false, text: 'Fotocopia de la cédula del representante legal.'},
      {model: 'rut', value: false, text: 'Copia del RUT (Fecha de impresión no mayor a un (1) mes).'},
      {model: 'shareholdingStructure', value: false, text: 'Composición accionaria.'},
      {
        model: 'rucAndBasc',
        value: false,
        text: 'Copias de la calificación en ruc y de las certificaciones/acreditaciones en sistemas de gestión, BASC y sello de producto que pose vigentes.'
      },
      {model: 'declarationOfRiskPrevention', value: false, text: 'Declaración de prevención del riesgo - la/fa (anexo página 5)'},
    ];
    this.annex2Toggles = [
      {model: 'annex6', value: false, text: 'Declaración de compromiso de seguridad (anexo pagina 6)'},
      {model: 'safetyData', value: false, text: 'Ficha de seguridad de los productos'},
      {model: 'contingencyPlan', value: false, text: 'Plan de contingencia - preparación y respuesta ante emergencias.'},
      {model: 'productSpecifications.', value: false, text: 'Ficha técnica del producto cone specificaciones.'},
      {model: 'sustainabilityReport', value: false, text: 'Reporte de sostenibilidad.'},
      {model: 'technicalStandards ', value: false, text: 'Certificados de normas técnicas que le apliquen.'},
      {model: 'relationshipRequirements', value: false, text: 'Requisitos varios especificos del relaciónamiento con Acesco'},
    ];
    this.selfEvaluation = false;
    // this.user = this.procescoService.getLogedUser();
    // this.step = this.user.currentStep;
    this.stageB = {
      minimumSafetyRequirements: true,
      manifest: true,
      physicalSecurityAgreements: true,
    };
  }

  updatedValue(event: ToggleInterface) {
    console.log(event);
    this.stageB[event.key] = event.value;
  }

  toggleList(list: string) {
    this.lists[list] = !this.lists[list];
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (!fileList.length) {
      return;
    }
    const file: File = fileList[0];
    console.log(file);
    /*this.uploadService.uploadFile(this.appCfg.baseUrl + '/api/flash/upload', file)
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            console.log(`File is ${percentDone}% loaded.`);
          } else if (event instanceof HttpResponse) {
            console.log('File is completely loaded!');
          }
        },
        (err) => {
          console.log('Upload Error:', err);
        }, () => {
          console.log('Upload done');
        }
      );*/
  }

  onSubmit() {
    console.log(this.stageB);
  }

}

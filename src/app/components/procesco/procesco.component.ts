import {Component} from '@angular/core';
import {faFacebook, faGoogleDrive, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faClipboardCheck, faListAlt, faLongArrowAltRight, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-procesco',
  templateUrl: './procesco.component.html',
  styleUrls: ['./procesco.component.css']
})
export class ProcescoComponent {
  options: any [] = [];
  socialLinks: any [] = [];
  buttons: any [] = [];
  faGoogleDrive = faGoogleDrive;
  faLongArrowAltRight = faLongArrowAltRight;
  faYoutube = faYoutube;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faQuestionCircle = faQuestionCircle;
  faListAlt = faListAlt;
  faClipboardCheck = faClipboardCheck;
  faCaretRight = faCaretRight;

  constructor() {
    this.options = [
      {label: 'FAQs', tooltipMessage: 'Preguntas Frecuentes'},
      {label: 'Registro', tooltipMessage: 'Proceso para registrarse como proveedor'},
      {label: 'Evaluación', tooltipMessage: 'Para proveedores antiguos con mas de 6 meses de relacionamiento'},
    ];

    this.socialLinks = [
      {icon: this.faFacebook, url: '', classes: 'list-inline-item social-link instagram'},
      {icon: this.faInstagram, url: '', classes: 'list-inline-item social-link youtube'},
      {icon: this.faYoutube, url: '', classes: 'list-inline-item social-link facebook'},
    ];

    this.buttons = [
      {text: 'FAQ\'s', icon: faQuestionCircle},
      {text: 'Registro', icon: faListAlt},
      {text: 'Evaluación', icon: faClipboardCheck}
    ];
  }

  nextPage(index: number) {
    console.log(index);
  }
}

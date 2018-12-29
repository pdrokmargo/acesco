import {Component} from '@angular/core';
import {faFacebook, faGoogleDrive, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {
  faCaretRight,
  faClipboardCheck, faEnvelope,
  faListAlt,
  faLongArrowAltRight,
  faQuestionCircle,
  faUnlock,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-procesco',
  templateUrl: './procesco.component.html',
  styleUrls: ['./procesco.component.css']
})
export class ProcescoComponent {
  options: any [] = [];
  socialLinks: any [] = [];
  buttons: any [] = [];
  user: any;
  faGoogleDrive = faGoogleDrive;
  faLongArrowAltRight = faLongArrowAltRight;
  faYoutube = faYoutube;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faQuestionCircle = faQuestionCircle;
  faListAlt = faListAlt;
  faClipboardCheck = faClipboardCheck;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  faUser = faUser;
  faEnvelope = faEnvelope;
  explanation: string;
  showRegister: boolean;
  showLogin: boolean;

  constructor(private router: Router) {
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

    this.explanation = '';
    this.showRegister = false;
    this.showLogin = true;
    this.user = {
      name: null,
      password: null,
      repeatPassword: null,
      email: null
    };
  }

  nextPage(index: number) {
    // this.router.navigate(['/artist', id]);
    switch (index) {
      case 0: {
        this.router.navigate(['faq']);
        break;
      }
      case 1: {
        this.showLogin = true;
        break;
      }
      case 2: {
        this.router.navigate(['evaluacion']);
        break;
      }
      case 3: {
        this.showLogin = false;
        this.showRegister = true;
        break;
      }
    }
  }

  showExplanation(index: number) {
    switch (index) {
      case 0: {
        this.explanation = 'Preguntas frecuentes.';
        break;
      }
      case 1: {
        this.explanation = 'Proceso para registrarse como proveedor.';
        break;
      }
      case 2: {
        this.explanation = 'Para proveedores activos con mas de 6 meses de relacionamiento.';
        break;
      }
    }
  }

  hideExplanation() {
    this.explanation = '';
  }

  back(event: string) {
    switch (event) {
      case 'menu': {
        this.showRegister = false;
        this.showLogin = false;
        break;
      }
      case 'login': {
        this.showRegister = false;
        this.showLogin = true;
        break;
      }
      case 'register': {
        this.showRegister = true;
        this.showLogin = false;
        break;
      }

    }
  }
}

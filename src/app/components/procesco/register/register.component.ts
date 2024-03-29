/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 28/12/08
 */

import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faEnvelope, faSpinner, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() back: EventEmitter<any> = new EventEmitter();
  faGoogleDrive = faGoogleDrive;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  user: any;
  passwordsMatch: boolean;
  loading: boolean;
  height: number;
  errorMessage: string;
  successMessage: string;
  redirectMessage: string;
  suppliersType: any;
  languages: any;
  showLanguage: boolean;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, public procescoService: ProcescoService) {
    this.user = {
      name: null,
      email: null,
      password: null,
      password_confirmation: null,
      language: null,
      supplier_type: null
    };
    this.suppliersType = ['Nacional', 'Internacional'];
    this.languages = ['Español', 'Ingles'];
    this.passwordsMatch = true;
    this.loading = false;
    this.showLanguage = this.user.language === 'Nacional';
  }

  onSubmit(form: NgForm) {
    form.value['user_profile_id'] = 2;
    form.value['language'] = this.user.language;
    this.loading = true;
    this.procescoService.createNewUser(form.value).subscribe((response: any) => {
      this.successMessage = 'Usuario creado satisfactoriamente';
      this.errorMessage = null;
      setTimeout(() => {
        this.successMessage = null;
        this.errorMessage = null;
        this.redirectMessage = 'Regresando al login!';
        setTimeout(() => {
          this.loading = false;
          this.back.emit('login');
        }, 2000);
      }, 3000);
    }, error1 => {
      this.loading = false;
      this.errorMessage = 'No es posible registrar este usuario';
      form.reset();
    });
  }

  validatePasswords() {
    this.passwordsMatch = this.user.password === this.user.password_confirmation;
  }

  changeLanguage() {
    console.log(this.user);
    this.user.language = this.user.supplier_type === 'Nacional' ? 'Español' : null;
    this.showLanguage = this.user.supplier_type === 'Internacional';
    console.log(this.showLanguage);
  }

  backHome() {
    this.back.emit('menu');
  }
}

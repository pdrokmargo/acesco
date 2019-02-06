/**
 * @author  Sergio Zapata
 * @contact sergio8016@gmail.com
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

  constructor(private router: Router, private cdRef: ChangeDetectorRef, public procescoService: ProcescoService) {
    this.user = {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
    };
    this.passwordsMatch = true;
    this.loading = false;
  }

  onSubmit(form: NgForm) {
    form.value['user_profile_id'] = 2;
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

  backHome() {
    this.back.emit('menu');
  }
}

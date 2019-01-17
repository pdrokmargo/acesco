import { ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
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
  @Output() isLoading: EventEmitter<any> = new EventEmitter();
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
    this.isLoading.emit(this.loading);
    this.procescoService.createNewUser(form.value).subscribe((response: any) => {
      this.loading = false;
      this.isLoading.emit(this.loading);
      this.back.emit('login');
    }, error1 => {
      this.loading = false;
      this.errorMessage = error1.error.message;
    });
  }

  validatePasswords() {
    this.passwordsMatch = this.user.password === this.user.password_confirmation;
  }

  backHome() {
    this.back.emit('menu');
  }
}

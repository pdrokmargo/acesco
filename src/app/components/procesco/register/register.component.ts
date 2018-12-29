import {Component} from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faEnvelope, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  faGoogleDrive = faGoogleDrive;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  user: any;
  passwordsMatch: boolean;

  constructor() {
    this.user = {
      name: null,
      email: null,
      password: null,
      repeatPassword: null
    };
    this.passwordsMatch = true;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    console.log(form.valid);
  }

  validatePasswords() {
    console.log(this.user.password === this.user.repeatPassword);
    this.passwordsMatch = this.user.password === this.user.repeatPassword;
  }
}

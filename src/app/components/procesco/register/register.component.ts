import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faEnvelope, faSpinner, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
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

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    this.user = {
      name: null,
      email: null,
      password: null,
      repeatPassword: null
    };
    this.passwordsMatch = true;
    this.loading = false;
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.loading = true;
    this.isLoading.emit(this.loading);
    setTimeout(() => {
      this.loading = false;
      this.isLoading.emit(this.loading);
      this.back.emit('login');
    }, 3000);
  }

  validatePasswords() {
    this.passwordsMatch = this.user.password === this.user.repeatPassword;
  }

  backHome() {
    this.back.emit('menu');
  }
}

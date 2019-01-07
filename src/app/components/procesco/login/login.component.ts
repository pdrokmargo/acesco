import {Component, EventEmitter, Output} from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faSpinner, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Output() isLoading: EventEmitter<any> = new EventEmitter();
  faGoogleDrive = faGoogleDrive;
  faUser = faUser;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  user: any;
  loading: boolean;
  loginInfo: object;

  constructor(private router: Router, public procescoService: ProcescoService) {
    this.loading = false;
    this.loginInfo = {
      error: false,
      errorType: null,
      message: null
    };
    this.user = {
      name: null,
      password: null
    };
    this.loading = false;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.isLoading.emit(this.loading);
    setTimeout(() => {
      this.loginInfo = this.procescoService.validateUser(form.value);
      this.loading = false;
      this.isLoading.emit(this.loading);
      console.log(this.loginInfo);
      if (!this.loginInfo.error) {
        if (this.loginInfo.user.userType === 'user') {
          this.router.navigate(['procesco/perfil']);
        } else if (this.loginInfo.user.userType === 'admin') {

        }
      }
    }, 3000);
  }

  backHome(where?: string) {
    if (where) {
      this.back.emit(where);
      return;
    }
    this.back.emit('menu');
  }

}

import {Component, EventEmitter, Output} from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faSpinner, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';

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
  currentUser: UserInterface;

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
    this.procescoService.validateUser(form.value).subscribe((response: any) => {
      localStorage.setItem('acctnk', JSON.stringify(response.access_token));
      console.log(response);
      switch (response.currentStep) {
        case 0: {
          this.router.navigate(['procesco/perfil']);
          break;
        }
        case 1: {
          this.router.navigate(['procesco/preseleccionStapaA']);
          break;
        }
        case 2: {
          break;
        }
        case 3: {
          break;
        }
      }
      this.loading = false;
      this.isLoading.emit(this.loading);
    }, error1 => {
      console.log(error1);
    });
    /*setTimeout(() => {
      this.loginInfo = this.procescoService.validateUser(form.value);
      this.loading = false;
      this.isLoading.emit(this.loading);
      console.log(this.loginInfo);
      if (!this.loginInfo['error']) {
        if (this.loginInfo['user'].userType === 'user') {
          this.user = this.procescoService.getLogedUser();
          switch (this.user.currentStep) {
            case 0: {
              this.router.navigate(['procesco/perfil']);
              break;
            }
            case 1: {
              this.router.navigate(['procesco/preseleccionStapaA']);
            }
          }

        } else if (this.loginInfo['user'].userType === 'admin') {

        }
      }
    }, 3000);*/
  }

  backHome(where?: string) {
    if (where) {
      this.back.emit(where);
      return;
    }
    this.back.emit('menu');
  }

}

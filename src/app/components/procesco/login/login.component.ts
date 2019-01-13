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
      localStorage.setItem('acctkn', JSON.stringify(response.access_token));
      console.log(response);
      switch (response.user.userType) {
        case '0': {
          this.router.navigate(['procesco/admin']);
          break;
        }
        case '1': {
          switch (response.user.currentStep) {
            case '0': {
              this.router.navigate(['procesco/perfil']);
              break;
            }
            case '1': {
              this.router.navigate(['procesco/preseleccionEtapaA']);
              break;
            }
            case '2': {
              this.router.navigate(['procesco/preseleccionEtapaB']);
              break;
            }
            case '3': {
              break;
            }
          }
          break;
        }
      }

      this.loading = false;
      this.isLoading.emit(this.loading);
    }, error1 => {
      console.log(error1);
      this.loading = false;
      this.isLoading.emit(this.loading);
    });
  }

  backHome(where?: string) {
    if (where) {
      this.back.emit(where);
      return;
    }
    this.back.emit('menu');
  }

}

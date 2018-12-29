import {Component, EventEmitter, Output} from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faSpinner, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() back: EventEmitter<any> = new EventEmitter();
  faGoogleDrive = faGoogleDrive;
  faUser = faUser;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  user: any;
  loading: boolean;

  constructor(private router: Router) {
    this.user = {
      name: null,
      password: null
    };
    this.loading = false;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    setTimeout(() => {
      console.log(form.value);
      console.log('Logged In!!');
      this.loading = false;
      this.router.navigate(['perfil']);
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

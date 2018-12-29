import { Component } from '@angular/core';
import {faGoogleDrive} from '@fortawesome/free-brands-svg-icons';
import {faCaretRight, faUnlock, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faGoogleDrive = faGoogleDrive;
  faUser = faUser;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  user: any;

  constructor() {
    this.user = {
      name: null,
      password: null
    };
  }

}

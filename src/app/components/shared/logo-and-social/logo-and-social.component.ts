import { Component } from '@angular/core';
import {faFacebook, faGoogleDrive, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logo-and-social',
  templateUrl: './logo-and-social.component.html',
  styleUrls: ['./logo-and-social.component.css']
})
export class LogoAndSocialComponent {
  socialLinks: any [] = [];
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faGoogleDrive = faGoogleDrive;
  constructor(private router: Router) {
    this.socialLinks = [
      {icon: this.faFacebook, url: '', classes: 'list-inline-item social-link instagram'},
      {icon: this.faInstagram, url: '', classes: 'list-inline-item social-link youtube'},
      {icon: this.faYoutube, url: '', classes: 'list-inline-item social-link facebook'},
    ];
  }

  backHome() {
    this.router.navigate(['procesco']);
  }

}

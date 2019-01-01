import { Component, OnInit } from '@angular/core';
import {faFacebook, faGoogleDrive, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-logo-and-social',
  templateUrl: './logo-and-social.component.html',
  styleUrls: ['./logo-and-social.component.css']
})
export class LogoAndSocialComponent implements OnInit {
  socialLinks: any [] = [];
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faGoogleDrive = faGoogleDrive;
  constructor() {
    this.socialLinks = [
      {icon: this.faFacebook, url: '', classes: 'list-inline-item social-link instagram'},
      {icon: this.faInstagram, url: '', classes: 'list-inline-item social-link youtube'},
      {icon: this.faYoutube, url: '', classes: 'list-inline-item social-link facebook'},
    ];
  }

  ngOnInit() {
  }

}

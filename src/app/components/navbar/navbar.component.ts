import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  links: any[] = [];

  constructor() {
    this.links = [
      {label: 'Procesco', href: 'procesco' },
      {label: 'Sistema de garantias', href: 'sistemaDeGarantias' },
    ];
  }

  ngOnInit() {
  }

}

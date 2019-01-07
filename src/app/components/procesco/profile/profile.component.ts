import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter} from '@angular/core';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit {
  nationalOptions: any [] = [];
  internationalOptions: any [] = [];
  loading: boolean;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  action: string;
  providerType: string;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, public procescoService: ProcescoService) {
    this.nationalOptions = [
      {label: 'Proveedor', value: 'proveedor', active: false},
      {label: 'Tercero', value: 'tercero', active: false},
      {label: 'Nuevo', value: 'nuevo', active: false},
      {label: 'Actualización', value: 'actualizacion', active: false}
    ];

    this.internationalOptions = [
      {label: 'Supplier', value: 'supplier', active: false},
      {label: 'In house', value: 'inHouse', active: false},
      {label: 'New', value: 'new', active: false},
      {label: 'Update', value: 'update', active: false}
    ];
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  submitProfile() {
    if (!this.action) {
      return;
    }
    this.loading = true;
    setTimeout(() => {
      const user = this.procescoService.getLogedUser();
      switch (this.providerType) {
        case 'national': {
          user['nationalOptions'] = this.nationalOptions;
          this.procescoService.updateUser(user);
          this.router.navigate(['procesco/nuevoProveedor']);
          break;
        }
        case 'international': {
          user['internationalOptions'] = this.internationalOptions;
          break;
        }
      }
      this.loading = false;
    }, 3000);
  }

  updatedValue(event: EventEmitter) {
    this.providerType = this.checkProviderType(event);
    if (this.providerType === 'national') {
      this.internationalOptions.forEach(element => element.active = false);
      const index = this.nationalOptions.findIndex(element => element.value === event.key);
      switch (event.key) {
        case 'nuevo': {
          this.nationalOptions[3].active = false;
          event.value ? this.action = event.key : this.action = null;
          break;
        }
        case 'actualizacion': {
          this.nationalOptions[2].active = false;
          event.value ? this.action = event.key : this.action = null;
        }
      }
      this.nationalOptions[index].active = event.value;
    } else {
      this.nationalOptions.forEach(element => element.active = false);
      const index = this.internationalOptions.findIndex(element => element.value === event.key);
      switch (event.key) {
        case 'new': {
          this.internationalOptions[3].active = false;
          event.value ? this.action = event.key : this.action = null;
          break;
        }
        case 'update': {
          this.internationalOptions[2].active = false;
          event.value ? this.action = event.key : this.action = null;
        }
      }
      this.internationalOptions[index].active = event.value;
    }
  }

  checkProviderType(obj: object) {
    let type = 'international';
    this.nationalOptions.forEach(element => {
      if (element.value === obj.key) {
        type = 'national';
      }
    });
    return type;
  }
}

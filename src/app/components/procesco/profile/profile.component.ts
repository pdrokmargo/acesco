import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter} from '@angular/core';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';

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
  user: UserInterface;

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
    this.procescoService.getLogedUser().subscribe((user: any) => {
      if (user.preregistro_id) {
        switch (user.national) {
          case 0: {
            this.nationalOptions[0].active = user.supplier === 1;
            this.nationalOptions[1].active = user.inHouse === 1;
            break;
          }
          case 1: {
            console.log('international');
            break;
          }
        }
      }
    });
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
    if (this.providerType === 'national') {
      const supplier = this.nationalOptions[0].active ? 1 : 0;
      const inHouse = this.nationalOptions[1].active ? 1 : 0;
      const national = this.providerType === 'national' ? 1 : 0;
      this.procescoService.updateUser({supplier: supplier, inHouse: inHouse, national: national}, 'profile').subscribe((response: any) => {
        this.loading = false;
        this.router.navigate(['procesco/nuevoProveedor']);
      }, error1 => {
        console.error(error1);
        this.loading = false;
      });

    } else {
      const supplier = this.internationalOptions[0].active;
      const inHouse = this.internationalOptions[1].active;
      this.procescoService.updateUser({supplier: supplier, inHouse: inHouse}, 'profile');
    }


  }

  updatedValue(event: any) {
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

  checkProviderType(obj: any) {
    let type = 'international';
    this.nationalOptions.forEach(element => {
      if (element.value === obj.key) {
        type = 'national';
      }
    });
    return type;
  }
}

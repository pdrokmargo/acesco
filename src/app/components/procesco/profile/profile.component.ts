import {Component} from '@angular/core';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  nationalOptions: any [] = [];
  internationalOptions: any [] = [];
  loading: boolean;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;

  constructor(private router: Router) {
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

  submitProfile() {
    const newProvider = this.nationalOptions.find(element => element.value === 'nuevo');
    const updateProvider = this.nationalOptions.find(element => element.value === 'actualizacion');
    if (!newProvider.active && !updateProvider.active) {
      return;
    }
    this.loading = true;
    setTimeout(() => {

      if (newProvider.active) {
        this.router.navigate(['procesco/nuevoProveedor']);
      } else if (updateProvider.active) {
        this.router.navigate(['procesco/actualizarDatos']);
      }
      this.loading = false;
    }, 3000);
  }

}

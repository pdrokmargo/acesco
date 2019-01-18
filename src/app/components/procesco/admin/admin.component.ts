import {Component} from '@angular/core';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userList: any [] = [];
  tableTitles: any [] = [];
  states: any [] = [];
  loading: boolean;

  constructor(public procescoService: ProcescoService, private router: Router) {
    this.loading = true;
    this.states = [
      'Pre selección',
      'Etapa A',
      'Etapa B',
      'Seleccionado',
    ];
    this.tableTitles = [
      {label: 'id'},
      {label: 'Razón Social'},
      {label: 'Razón Comercial'},
      {label: 'Codigo CIUU'},
      {label: 'Tipo Identificación'},
      {label: 'Numero Identificación'},
      {label: 'Ciudad Exp IDE'},
      {label: 'Tipo Clasific.'},
      {label: 'Estado'},
      {label: 'Fecha Elaboración'},
      {label: 'Persona contacto Acesco'},
      {label: 'Tipo Perfil'},
      {label: 'Tipo Estado Rol'},
      {label: ''},
    ];
    this.procescoService.getAllUsers().subscribe((response: any) => {
      console.log(response);
      this.userList = response;
      this.loading = false;
    });
  }

  onButtonClick(user: UserInterface) {
    console.log(user);
    switch (user.currentStep) {
      case 0: {
        this.router.navigate(['procesco/nuevoProveedor/', user.id]);
        break;
      }
      case 1: {
        this.router.navigate(['procesco/preseleccionEtapaA/', user.id]);
        break;
      }
      case 2: {
        break;
      }
      case 3: {
        break;
      }
    }
  }

}

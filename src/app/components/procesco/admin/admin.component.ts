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
  pagination: object = {};
  classifications: any[] = [];

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
      this.userList = response.data;
      this.pagination = {
        last_page_url: response.last_page_url,
        next_page_url: response.next_page_url,
        prev_page_url: response.prev_page_url,
        per_page: response.per_page,
        last_page: response.last_page,
        current_page: response.current_page,
        total: response.total,
        to: response.to,
      };
      this.loading = false;
      this.procescoService.getClassificationsList().subscribe((classifications: any) => {
        this.userList.forEach(user => {
          const selectedClass = classifications.find(classification => classification.id === user.pre_registro.classification_id);
          user.pre_registro.classification_id = selectedClass.classification;
        });
      });
      this.procescoService.getDocumentTypeList().subscribe((documentTypeList: any) => {
        this.userList.forEach(user => {
          const selectedDocument = documentTypeList.find(documentType => documentType.id === user.pre_registro.documentType_id);
          user.pre_registro.documentType_id = selectedDocument.description;
        });
      });
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
        this.router.navigate(['procesco/preseleccionEtapaB/', user.id]);
        break;
      }
      case 3: {
        break;
      }
    }
  }

  search(searchText: any) {
    this.procescoService.getAllUsers(searchText).subscribe((response: any) => {
      console.log(response);
      this.userList = response.data;
      this.pagination = {
        last_page_url: response.last_page_url,
        next_page_url: response.next_page_url,
        prev_page_url: response.prev_page_url,
        per_page: response.per_page,
        last_page: response.last_page,
        current_page: response.current_page,
        total: response.total,
        to: response.to,
      };
    }, error1 => {
      console.log(error1);
    });
  }
}

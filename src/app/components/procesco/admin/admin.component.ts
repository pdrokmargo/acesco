/**
 * @author  Sergio Enrique Zapata Donado
 * @version 1.0, 12/01/09
 */

import { Component } from "@angular/core";
import { ProcescoService } from "../../../services/procesco.service";
import { UserInterface } from "../../../Interfaces/user.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent {
  userList: any[] = [];
  tableTitles: any[] = [];
  states: any[] = [];
  loading: boolean;
  pagination: object = {};
  classifications: any[] = [];

  constructor(public procescoService: ProcescoService, private router: Router) {
    this.loading = true;
    this.states = ["Registro", "Información Financiera", "Control Documental", "Seleccionado"];
    this.tableTitles = [
      { label: "id" },
      { label: "Razón Social" },
      // { label: "Razón Comercial" },
      // { label: "Codigo CIUU" },
      { label: "Identificación" },
      // { label: "Tipo Identificación" },
      // { label: "Numero Identificación" },
      // { label: "Ciudad Exp IDE" },
      { label: "Tipo Clasific." },
      { label: "Departamento" },
      { label: "Ciudad" },
      { label: "Dirección" },
      { label: "Teléfono" },
      { label: "Celular" },
      { label: "Email" },
      { label: "Fecha Elaboración" },
      // { label: "Persona contacto Acesco" },
      { label: "Tipo Perfil" },
      { label: "Estado" },
      // { label: "Tipo Estado Rol" },
      { label: "" }
    ];
    this.procescoService.getAllUsers().subscribe((response: any) => {
      this.userList = response.data;
      const {
        last_page_url,
        next_page_url,
        prev_page_url,
        per_page,
        last_page,
        current_page,
        total,
        to
      } = response;
      this.pagination = {
        last_page_url,
        next_page_url,
        prev_page_url,
        per_page,
        last_page,
        current_page,
        total,
        to
      };
      this.loading = false;
      this.procescoService
        .getClassificationsList()
        .subscribe((classifications: any) => {          
          this.userList.forEach(user => {
            const selectedClass = classifications.find(
              classification =>
                classification.id === user.pre_registro.classification_id
            );
            user.pre_registro.classification_id = selectedClass.classification;
          });
        });
      this.procescoService
        .getDocumentTypeList()
        .subscribe((documentTypeList: any) => {
          this.userList.forEach(user => {
            const selectedDocument = documentTypeList.find(
              documentType =>
                documentType.id === user.pre_registro.documentType_id
            );
            user.pre_registro.documentType_id = selectedDocument.description;
          });
        });
    });
  }

  setNewList(newData: any) {
    this.userList = newData.data;
  }

  onButtonClick(user: UserInterface) {
    switch (user.currentStep) {
      case 0: {
        this.router.navigate(["procesco/nuevoProveedor/", user.id]);
        break;
      }
      case 1: {
        this.router.navigate(["procesco/preseleccionEtapaA/", user.id]);
        break;
      }
      case 2: {
        this.router.navigate(["procesco/preseleccionEtapaB/", user.id]);
        break;
      }
      case 3: {
        break;
      }
    }
  }

  logOut () {
    localStorage.setItem("acctkn", '');
    this.router.navigateByUrl('/procesco');
  }

  search(searchText: any) {
    this.procescoService.getAllUsers(searchText).subscribe(
      (response: any) => {
        this.userList = response.data;
        const {
          last_page_url,
          next_page_url,
          prev_page_url,
          per_page,
          last_page,
          current_page,
          total,
          to
        } = response;
        this.pagination = {
          last_page_url,
          next_page_url,
          prev_page_url,
          per_page,
          last_page,
          current_page,
          total,
          to
        };
      },
      error1 => {
        console.error(error1);
      }
    );
  }
}

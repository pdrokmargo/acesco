/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 29/12/08
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input
} from "@angular/core";
import { faCaretRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";
import { ProcescoService } from "../../../services/procesco.service";
import { UserInterface } from "../../../Interfaces/user.interface";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements AfterViewInit {
  @Input() approved: boolean;

  nationalOptions: any[] = [];
  internationalOptions: any[] = [];
  placeholderSub: any;
  language: any;
  languageOptions: any[] = [];
  loading: boolean;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  action: string;
  providerType: string;
  user: UserInterface;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public procescoService: ProcescoService
  ) {
    this.placeholderSub = {
      whoRefers: null
    };
    this.nationalOptions = [
      { label: "Proveedor", value: "proveedor", active: false },
      { label: "Tercero", value: "tercero", active: false },
      { label: "Nuevo", value: "nuevo", active: false },
      { label: "Actualización", value: "actualizacion", active: false }
    ];

    this.internationalOptions = [
      { label: "Supplier", value: "supplier", active: false },
      { label: "In house", value: "inHouse", active: false },
      { label: "New", value: "new", active: false },
      { label: "Update", value: "update", active: false }
    ];

    this.languageOptions = [
      { label: "English", value: "ingles", active: false },
      { label: "Español", value: "español", active: true }
    ];
    this.procescoService.getLogedUser().subscribe((user: any) => {
      console.log(user);
      this.changeSubs(user.language);
      this.language = user.language;
      if (user.preregistro_id) {
        switch (user.national) {
          case 0:
            this.nationalOptions[0].active = user.supplier === 1;
            this.nationalOptions[1].active = user.inHouse === 1;
            break;
          case 1:
            console.log(user.supplier === 1);
            console.log(user.inHouse === 1);

            this.internationalOptions[0].active = user.supplier === 1;
            this.internationalOptions[1].active = user.inHouse === 1;
            console.log(this.internationalOptions);

            break;
        }
      }
    });
  }

  changeSubs(language){
    if(language==0){
      //English subs
      this.placeholderSub.supplierProfile = "Supplier Profile";
      this.placeholderSub.national = "National";
      this.placeholderSub.international = "International";
      this.placeholderSub.select = "Select";
      this.placeholderSub.requiredField = "This field is required";
      this.placeholderSub.chooseSocialObject = "Choose according social object";
      this.placeholderSub.seeDescriptions = "Descriptions";
      this.placeholderSub.whoRefers = "Contact person in Acesco*";
      this.placeholderSub.classification = "Classification";
      this.placeholderSub.descriptionServiceOrGoodOffered = "Description of service or good offered*";
      this.placeholderSub.supplierGeneralInformation = "General Information of the company";
      this.placeholderSub.documentType = "Document Type";
      this.placeholderSub.chooseOne = "Choose one*";
      this.placeholderSub.businessName = "Company name or full name*";
      this.placeholderSub.legalInformation = "Legal Information";
      this.placeholderSub.legalRepresentativeName = "Legal representative name and surname";
      this.placeholderSub.supplierContactInformation = "Contact Information of the company";
      this.placeholderSub.contactName = "Contact Person*";
      this.placeholderSub.position = "Position*";
      this.placeholderSub.address = "Address*";
      this.placeholderSub.state = "State*";
      this.placeholderSub.city = "City*";
      this.placeholderSub.zipCode = "ZipCode*";
      this.placeholderSub.telephone = "Telephone";
      this.placeholderSub.mobile = "Mobile";
      this.placeholderSub.email = "E-mail";
      this.placeholderSub.website = "Website";
    }else{
      //Spsnish subs
      this.placeholderSub.supplierProfile = "Definición de Perfil";
      this.placeholderSub.national = "Nacional";
      this.placeholderSub.international = "International";
      this.placeholderSub.select = "Seleccionar";
      this.placeholderSub.requiredField = "Este campo es obligatorio";
      this.placeholderSub.chooseSocialObject = "Escoja de acuerdo con objeto social";
      this.placeholderSub.seeDescriptions = "Descripciones";
      this.placeholderSub.whoRefers = "Persona de contacto en Acesco*";
      this.placeholderSub.classification = "Clasificación";
      this.placeholderSub.descriptionServiceOrGoodOffered = "Descripción de bien o servicio a ofrecer*";
      this.placeholderSub.supplierGeneralInformation = "información general de proveedor";
      this.placeholderSub.documentType = "Tipo de documento";
      this.placeholderSub.chooseOne = "Elije uno*";
      this.placeholderSub.businessName = "Razón social/Nombre completo*";
      this.placeholderSub.legalInformation = "Información Legal";
      this.placeholderSub.legalRepresentativeName = "Nombres y apellidos del representante legal:*";
      this.placeholderSub.supplierContactInformation = "Datos de contacto del proveedor";
      this.placeholderSub.contactName = "Persona de Contacto*";
      this.placeholderSub.position = "Cargo*";
      this.placeholderSub.address = "Dirección*";
      this.placeholderSub.state = "Departamento*";
      this.placeholderSub.city = "Ciudad*";
      this.placeholderSub.zipCode = "Código postal*";
      this.placeholderSub.telephone = "Teléfono";
      this.placeholderSub.mobile = "Celular";
      this.placeholderSub.email = "Correo electrónico";
      this.placeholderSub.website = "Sitio web";
      
      
    }
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  submitProfile(providerType) {
    // if (!this.action) return;
    this.loading = true;
    if (providerType === 1) {
      const supplier = this.nationalOptions[0].active ? 1 : 0;
      const inHouse = this.nationalOptions[1].active ? 1 : 0;
      const national = 1;//providerType === "national" ? 1 : 0;
      this.procescoService
        .updateUser(
          { supplier: supplier, inHouse: inHouse, national: national },
          "profile"
        )
        .subscribe(
          (response: any) => {
            this.loading = false;
            this.router.navigate(["procesco/nuevoProveedor"]);
          },
          error1 => {
            console.error(error1);
            this.loading = false;
          }
        );
    } else {
      const supplier = this.internationalOptions[0].active;
      const inHouse = this.internationalOptions[1].active;
      const national = 0;
      this.procescoService.updateUser(
        { supplier: supplier, inHouse: inHouse, national: national },
        "profile"
      ).subscribe(
        (response: any) => {
          this.loading = false;
          this.router.navigate(["procesco/nuevoProveedor"]);
        },
        error1 => {
          console.error(error1);
          this.loading = false;
        }
      );
    }
  }

  updatedValue(event: any) {
    this.providerType = this.checkProviderType(event);
    if (this.providerType === "national") {
      this.internationalOptions.forEach(element => (element.active = false));
      const index = this.nationalOptions.findIndex(
        element => element.value === event.key
      );
      switch (event.key) {
        case "nuevo": {
          this.nationalOptions[3].active = false;
          // this.action = event.event.value ? event.key : null;
          event.value ? (this.action = event.key) : (this.action = null);

          break;
        }
        case "actualizacion": {
          this.nationalOptions[2].active = false;
          // this.action = event.event.value ? event.key : null;
          event.value ? (this.action = event.key) : (this.action = null);

        }
      }
      this.nationalOptions[index].active = event.value;
    } else {
      this.nationalOptions.forEach(element => (element.active = false));
      const index = this.internationalOptions.findIndex(
        element => element.value === event.key
      );
      switch (event.key) {
        case "new": {
          this.internationalOptions[3].active = false;
          // this.action = event.value ? event.key : null;
          event.value ? (this.action = event.key) : (this.action = null);

          break;
        }
        case "update": {
          this.internationalOptions[2].active = false;
          // this.action = event.event.value ? event.key : null;
          event.value ? (this.action = event.key) : (this.action = null);

        }
      }
      this.internationalOptions[index].active = event.value;
    }
  }

  checkProviderType(obj: any) {
    let type = "international";
    this.nationalOptions.forEach(element => {
      if (element.value === obj.key) {
        type = "national";
      }
    });
    return type;
  }

  updated() {
    // if (!this.action) return;
    this.loading = true;
    if (this.providerType === "national") {
      const supplier = this.nationalOptions[0].active ? 1 : 0;
      const inHouse = this.nationalOptions[1].active ? 1 : 0;
      const national = this.providerType === "national" ? 1 : 0;
      this.procescoService
        .updateUser(
          { supplier: supplier, inHouse: inHouse, national: national },
          "profile"
        )
        .subscribe(
          response => (this.loading = false), //this.router.navigate(["procesco/nuevoProveedor"]);
          error1 => console.error(error1) //this.loading = false;
        );
    } else {
      const supplier = this.internationalOptions[0].active;
      const inHouse = this.internationalOptions[1].active;
      this.procescoService.updateUser(
        { supplier: supplier, inHouse: inHouse },
        "profile"
      );
    }
  }
}

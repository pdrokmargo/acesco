/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 29/12/08
 */

import {
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { faCaretRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToggleInterface } from "../../../Interfaces/toggle.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { ProcescoService } from "../../../services/procesco.service";
import { UserInterface } from "../../../Interfaces/user.interface";
import { NgForm } from "@angular/forms";
import { cities } from '../../../../utils/cities';

@Component({
  selector: "app-new-provider",
  templateUrl: "./new-provider.component.html",
  styleUrls: ["./new-provider.component.css"]
})
export class NewProviderComponent {
  private __approved: boolean = false;
  @Input() set approved(approved: boolean) {
    this.__approved = approved;
    this.isAdminUser = false;
  }
  @Output() emitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  cityList: string[] = cities;
  keyword: string = 'descripcion';
  ciiuInitial: string = '';
  documentIssuedInitial: string = '';
  preRegister: any;
  placeholderSubES: {whoRefers: "Persona"};
  placeholderSubEN: {whoRefers: "Person"};
  placeholderSub: any;
  national: any;
  language: any;
  hideStuff = false;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  now: Date = new Date();
  classifications: any[] = [];
  classifications_es: any[] = [];
  classifications_en: any[] = [];
  documentTypes: any[] = [];
  ciiuCodes: any[] = [];
  countries: any[] = [];
  loading: boolean;
  step: string;
  currentUser: UserInterface;
  id: number;
  isAdminUser: boolean;
  successMessage: string;
  user: any;
  preregistro_id:number;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public procescoService: ProcescoService,
    private activatedRoute: ActivatedRoute
  ) {    
    this.activatedRoute.params.subscribe(
      activeRoute => {
        if (activeRoute["id"]) {
          
          this.isAdminUser = true;
          
          this.procescoService.getUserById(activeRoute["id"]).subscribe(
            ({ currentStep, id, preregistro_id, language }: any) => {

              if(language == 1)
              {
                this.changeSubs(1);
              }else{
                this.changeSubs(0);
              }
              this.step = currentStep;
              this.language = language;
              this.id = id;
              this.preregistro_id = preregistro_id;
              this.procescoService
                .getStepById(preregistro_id, "pre-register")
                .subscribe(
                  ({ register }: any) => {
                    this.preRegister = { ...register };
                    this.procescoService.getCountriesList().subscribe(
                      countries => {
                        this.countries = [...countries];
                        this.procescoService.getDocumentTypeList().subscribe(
                          documents => {
                            this.documentTypes = [...documents];
                            this.procescoService
                              .getClassificationsList()
                              .subscribe(
                                classifications => {
                                  this.classifications = [...classifications];
                                  this.procescoService.getActividadesEconomicasList().subscribe(
                                      act_economicas => {
                                      
                                      this.ciiuCodes = [...act_economicas];
                                      this.ciiuInitial = this.ciiuCodes.find(item => item.id === this.preRegister.ciiu).descripcion;
                                      this.documentIssuedInitial = register.documentIssued;
                                      // document.getElementsByTagName
                                      // console.log(this.preRegister.ciiu)
                                      // console.log(this.ciiuCodes)
                                      // this.preRegister.country_id = this.countries.find(
                                      //   el => el.id === this.preRegister.country_id
                                      // );
                                      this.preRegister.country_id = this.countries.find(
                                        el => el.id === this.preRegister.country_id
                                      );
                                      this.preRegister.documentType_id = this.documentTypes.find(
                                        el =>
                                          el.id === this.preRegister.documentType_id
                                      );
                                      this.preRegister.legalRepresentativeDocType_id = this.documentTypes.find(
                                        el =>
                                          el.id === this.preRegister.legalRepresentativeDocType_id
                                      );
                                      console.log(this.preRegister.classification_id);
                                      // this.preRegister.classification_id = this.classifications.find(
                                      //   el =>
                                      //     el.id ===
                                      //     this.preRegister.classification_id
                                      // );
                                    },
                                    error1 => {
                                      console.error(error1);
                                    }
                                    );
                                },
                                error1 => {
                                  console.error(error1);
                                }
                              );
                          },
                          error1 => {
                            console.error(error1);
                          }
                        );
                      },
                      error1 => {
                        console.error(error1);
                      }
                    );
                  },
                  error1 => {
                    console.error(error1);
                  }
                );
            },
            error1 => {
              console.error(error1);
            }
          );
        } else {
          this.procescoService.getClassificationsList().subscribe(
            classifications => {
              this.classifications = [...classifications];
              this.classifications.forEach(classi => {
                if(classi.classification_en != undefined || classi.classification_en != null){
                  this.classifications_en.push(classi);
                }
                if(classi.classification != undefined || classi.classification != null){
                  this.classifications_es.push(classi);
                }
              });
            },
            error1 => {
              console.error(error1);
            }
          );
          this.procescoService.getActividadesEconomicasList().subscribe(
            act_economicas => {
            this.ciiuCodes = [...act_economicas];
            },
            error1 => {
              console.error(error1);
            }
          );
          this.procescoService.getDocumentTypeList().subscribe(
            documentTypes => {
              this.documentTypes = [...documentTypes];
            },
            error1 => {
              console.error(error1);
            }
          );
          this.procescoService.getLogedUser().subscribe(
            ({ name, currentStep, language, national }) => {
              if(language == 1)
              {
                this.changeSubs(1);
              }else{
                this.changeSubs(0);
              }
              this.preRegister.documentNumber = name;
              this.step = currentStep;
              this.language = language;
              this.procescoService.getCountriesList().subscribe(
                countries => {
                  this.countries = [...countries];
                  if (national === 1) {
                    this.preRegister.country_id = this.countries.find(
                      el => el.name === "Colombia"
                    );
                  }else{
                    this.national = national;
                  }
                },
                error1 => {
                  console.error(error1);
                }
              );
            },
            error1 => {
              console.error(error1);
            }
          );
        }
      },
      error1 => {
        console.error(error1);
      }
    );
    const day = ("0" + this.now.getDate()).slice(-2);
    const month = ("0" + (this.now.getMonth() + 1)).slice(-2);
    this.placeholderSub = {
      whoRefers: null
    }
    this.preRegister = {
      whoRefers: null,
      id: null,
      personalDataProtection: true,
      habeas: true,
      created_at: this.now.getFullYear() + "-" + month + "-" + day,
      classification_id: null,
      serviceDescription: null,
      documentType_id: null,
      legalRepresentativeDocType_id: null,
      legalRepresentativeDocNumber: null,
      documentNumber: null,
      documentIssued: null,
      businessName: null,
      commercialName: null,
      ciiu: null,
      legalRepresentative: null,
      profession: null,
      professionalCard: null,
      issuedBy: null,
      contactName: null,
      position: null,
      address: null,
      country_id: null,
      dpto: null,
      city: null,
      zipcode: null,
      phone: null,
      mobile: null,
      fax: null,
      email: null,
      website: null,
      iso9001: false,
      iso14001: false,
      oshas18001: false,
      antiCorruptionPolicy: false,
      sustainability: false,
      dueDiligence: false,
      socialResponsability: false,
      socialResponsabilityName: null,
      productSeal: false,
      productSealName: null
    };
  }

  selectEvent(item) {
    this.preRegister.ciiu = item.id;
    // do something with selected item
  }

  selectCity(item) {
    this.preRegister.documentIssued = item;
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  }

  changeSubs(national){
    if(national==0){
      //English subs
      this.placeholderSub.requiredField = "This field is required";
      this.placeholderSub.which = "Which?";
      this.placeholderSub.chooseSocialObject = "Choose according social object";
      this.placeholderSub.seeDescriptions = "Descriptions";
      this.placeholderSub.whoRefers = "Contact person in Acesco*";
      this.placeholderSub.classification = "Classification";
      this.placeholderSub.descriptionServiceOrGoodOffered = "Description of service or good offered*";
      this.placeholderSub.supplierGeneralInformation = "General Information of the company";
      this.placeholderSub.documentType = "Document Type";
      this.placeholderSub.chooseOne = "Choose one*";
      this.placeholderSub.ciiu = "CIIU";
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
      this.placeholderSub.requiredField = "Este campo es obligatorio";
      this.placeholderSub.which = "Cuál?";
      this.placeholderSub.chooseSocialObject = "Escoja de acuerdo con objeto social";
      this.placeholderSub.seeDescriptions = "Descripciones";
      this.placeholderSub.whoRefers = "Persona de contacto en Acesco*";
      this.placeholderSub.classification = "Clasificación";
      this.placeholderSub.descriptionServiceOrGoodOffered = "Descripción de bien o servicio a ofrecer*";
      this.placeholderSub.supplierGeneralInformation = "información general de proveedor";
      this.placeholderSub.documentType = "Tipo de documento";
      this.placeholderSub.chooseOne = "Elije uno*";
      this.placeholderSub.ciiu = "CIIU";
      this.placeholderSub.businessName = "Razón social/Nombre completo*";
      this.placeholderSub.legalInformation = "Información Legal";
      this.placeholderSub.legalRepresentativeName = "Nombres y apellidos del representante legal:*";
      this.placeholderSub.supplierContactInformation = "Datos de contacto del proveedor";
      this.placeholderSub.contactName = "Persona de Contacto*";
      this.placeholderSub.position = "Cargo*";
      this.placeholderSub.address = "Dirección*";
      this.placeholderSub.state = "Estado*";
      this.placeholderSub.city = "Ciudad*";
      this.placeholderSub.zipCode = "Código postal*";
      this.placeholderSub.telephone = "Teléfono";
      this.placeholderSub.mobile = "Celular";
      this.placeholderSub.email = "Correo electrónico";
      this.placeholderSub.website = "Sitio web";
      
      
    }
  }
  updateValue(newValue: ToggleInterface) {
    if (newValue.key2) {
      this.preRegister[newValue.key][newValue.key2] = newValue.value;
    } else {
      this.preRegister[newValue.key] = newValue.value;
    }
  }

  approval() {
    this.loading = true;
    this.procescoService.adminApproval(this.id, { currentStep: 1 }).subscribe(
      (response: any) => {
        this.successMessage = "Usuario aprobado con éxito";
        setTimeout(() => {
          this.router.navigate(["procesco/admin"]);
        }, 2000);
      },
      error1 => {
        console.error(error1);
      }
    );
  }

  autoFill() {
    console.log(this.preRegister.productSeal);
    this.preRegister.whoRefers = "Alguien";
    this.preRegister.personalDataProtection = true;
    this.preRegister.habeas = true;
    this.preRegister.serviceDescription = "serviceDescription";
    this.preRegister.documentIssued = "documentIssued";
    this.preRegister.businessName = "businessName";
    this.preRegister.commercialName = "commercialName";
    this.preRegister.ciiu = "ciiu";
    this.preRegister.legalRepresentative = "legalRepresentative";
    this.preRegister.profession = "profession";
    this.preRegister.professionalCard = "professionalCard";
    this.preRegister.issuedBy = "issuedBy";
    this.preRegister.contactName = "contactName";
    this.preRegister.position = "position";
    this.preRegister.address = "address";
    this.preRegister.city = "City";
    this.preRegister.dpto = "dpto";
    this.preRegister.zipcode = 11111;
    this.preRegister.phone = 5235325235;
    this.preRegister.mobile = 253525235;
    this.preRegister.fax = 52352;
    this.preRegister.email = "email";
    this.preRegister.website = "website";
    this.preRegister.iso9001 = true;
    this.preRegister.iso14001 = true;
    this.preRegister.oshas18001 = true;
    this.preRegister.antiCorruptionPolicy = true;
    this.preRegister.sustainability = true;
    this.preRegister.dueDiligence = true;
    this.preRegister.socialResponsability = true;
    this.preRegister.socialResponsabilityName = "socialResponsabilityName";
    this.preRegister.productSeal = true;
    this.preRegister.productSealName = "productSealName";
  }
  showNaturalPersonaBody() {
    if (this.preRegister.documentType_id) {
      if (this.preRegister.documentType_id.id == 1) {
        return true;
      }
    }
    return false;
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    const { country_id, classification_id, documentType_id, legalRepresentativeDocType_id } = this.preRegister;
    this.preRegister.country_id = country_id.id;
    this.preRegister.classification_id = classification_id;
    this.preRegister.documentType_id = documentType_id.id;
    this.preRegister.legalRepresentativeDocType_id = legalRepresentativeDocType_id.id;
    this.procescoService.updateUser(this.preRegister, "pre-register").subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(["procesco/confirmacion"]);
      },
      error1 => {
        console.error(error1);
      }
    );
  }
  updated() {
    const { country_id, classification_id, documentType_id, language } = this.preRegister;
    this.preRegister.language = language.id;
    this.preRegister.country_id = country_id.id;
    this.preRegister.classification_id = classification_id.id;
    this.preRegister.documentType_id = documentType_id.id;
    
    this.procescoService.updateUser(this.preRegister, "pre-register").subscribe(
      rs => {
        this.procescoService
          .getStepById(this.preregistro_id, "pre-register")
          .subscribe(
            ({ register }: any) => {
              this.preRegister = { ...register };
              this.procescoService.getCountriesList().subscribe(
                countries => {
                  this.countries = [...countries];
                  this.procescoService.getDocumentTypeList().subscribe(
                    documents => {
                      this.documentTypes = [...documents];
                      this.procescoService.getClassificationsList().subscribe(
                        classifications => {
                          this.classifications = [...classifications];
                          this.preRegister.country_id = this.countries.find(
                            el => el.id === this.preRegister.country_id
                          );
                          this.preRegister.documentType_id = this.documentTypes.find(
                            el => el.id === this.preRegister.documentType_id
                          );
                          this.preRegister.classification_id = this.classifications.find(
                            el => el.id === this.preRegister.classification_id
                          );
                        },
                        error1 => {
                          console.error(error1);
                        }
                      );
                    },
                    error1 => {
                      console.error(error1);
                    }
                  );
                },
                error1 => {
                  console.error(error1);
                }
              );
            },
            error1 => {
              console.error(error1);
            }
          );

        this.emitEvent.emit(true);
      },
      err => console.error(err)
    );
  }
}


/**
 * @author  Sergio Zapata
 * @contact sergio8016@gmail.com
 * @version 1.0, 29/12/08
 */

import {ChangeDetectorRef, Component} from '@angular/core';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']
})
export class NewProviderComponent {
  preRegister: any;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  now: Date = new Date();
  classifications: any[] = [];
  documentTypes: any[] = [];
  countries: any[] = [];
  loading: boolean;
  step: string;
  currentUser: UserInterface;
  id: number;
  isAdminUser: boolean;
  successMessage: string;
  user: any;

  constructor(private router: Router,
              private cdRef: ChangeDetectorRef,
              public procescoService: ProcescoService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(activeRoute => {
      if (activeRoute['id']) {
        this.isAdminUser = true;
        this.procescoService.getUserById(activeRoute['id']).subscribe(({currentStep, id, preregistro_id}: any) => {
          this.step = currentStep;
          this.id = id;
          this.procescoService.getStepById(preregistro_id, 'pre-register').subscribe(({register}: any) => {
            this.preRegister = {...register};
            this.procescoService.getCountriesList().subscribe(countries => {
              this.countries = [...countries];
              this.procescoService.getDocumentTypeList().subscribe(documents => {
                this.documentTypes = [...documents];
                this.procescoService.getClassificationsList().subscribe(classifications => {
                  this.classifications = [...classifications];
                  this.preRegister.country_id = this.countries.find(el => el.id === this.preRegister.country_id);
                  this.preRegister.documentType_id = this.documentTypes.find(el => el.id === this.preRegister.documentType_id);
                  this.preRegister.classification_id = this.classifications.find(el => el.id === this.preRegister.classification_id);
                }, error1 => {
                  console.error(error1);
                });
              }, error1 => {
                console.error(error1);
              });
            }, error1 => {
              console.error(error1);
            });
          }, error1 => {
            console.error(error1);
          });
        }, error1 => {
          console.error(error1);
        });
      } else {
        this.procescoService.getClassificationsList().subscribe(classifications => {
          this.classifications = [...classifications];
        }, error1 => {
          console.error(error1);
        });
        this.procescoService.getDocumentTypeList().subscribe(documentTypes => {
          this.documentTypes = [...documentTypes];
        }, error1 => {
          console.error(error1);
        });
        this.procescoService.getLogedUser().subscribe(({id, currentStep, national}) => {
          this.preRegister.documentNumber = id;
          this.step = currentStep;
          this.procescoService.getCountriesList().subscribe(countries => {
            this.countries = [...countries];
            if (national === 1) {
              this.preRegister.country_id = this.countries.find(el => el.name === 'Colombia');
            }
          }, error1 => {
            console.error(error1);
          });
        }, error1 => {
          console.error(error1);
        });
      }
    }, error1 => {
      console.error(error1);
    });
    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);
    this.preRegister = {
      whoRefers: null,
      id: null,
      personalDataProtection: true,
      habeas: true,
      created_at: this.now.getFullYear() + '-' + (month) + '-' + (day),
      classification_id: null,
      serviceDescription: null,
      documentType_id: null,
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
      productSealName: null,
    };
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
    this.procescoService.adminApproval(this.id, {currentStep: 1}).subscribe((response: any) => {
      this.successMessage = 'Usuario aprobado con éxito';
      setTimeout(() => {
        this.router.navigate(['procesco/admin']);
      }, 2000);
    }, error1 => {
      console.error(error1);
    });
  }

  autoFill() {
    this.preRegister.whoRefers = 'Alguien';
    this.preRegister.personalDataProtection = true;
    this.preRegister.habeas = true;
    this.preRegister.serviceDescription = 'serviceDescription';
    this.preRegister.documentNumber = 'documentNumber';
    this.preRegister.documentIssued = 'documentIssued';
    this.preRegister.businessName = 'businessName';
    this.preRegister.commercialName = 'commercialName';
    this.preRegister.ciiu = 'ciiu';
    this.preRegister.legalRepresentative = 'legalRepresentative';
    this.preRegister.profession = 'profession';
    this.preRegister.professionalCard = 'professionalCard';
    this.preRegister.issuedBy = 'issuedBy';
    this.preRegister.contactName = 'contactName';
    this.preRegister.position = 'position';
    this.preRegister.address = 'address';
    this.preRegister.city = 'City';
    this.preRegister.dpto = 'dpto';
    this.preRegister.zipcode = 11111;
    this.preRegister.phone = 5235325235;
    this.preRegister.mobile = 253525235;
    this.preRegister.fax = 52352;
    this.preRegister.email = 'email';
    this.preRegister.website = 'website';
    this.preRegister.iso9001 = true;
    this.preRegister.iso14001 = true;
    this.preRegister.oshas18001 = true;
    this.preRegister.antiCorruptionPolicy = true;
    this.preRegister.sustainability = true;
    this.preRegister.dueDiligence = true;
    this.preRegister.socialResponsability = true;
    this.preRegister.socialResponsabilityName = 'socialResponsabilityName';
    this.preRegister.productSeal = true;
    this.preRegister.productSealName = 'productSealName';
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    const {country_id, classification_id, documentType_id} = this.preRegister;
    this.preRegister.country_id = country_id.id;
    this.preRegister.classification_id = classification_id.id;
    this.preRegister.documentType_id = documentType_id.id;
    this.procescoService.updateUser(this.preRegister, 'pre-register').subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['procesco/confirmacion']);
    }, error1 => {
      console.error(error1);
    });
  }
}

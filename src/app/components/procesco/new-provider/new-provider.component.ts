import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
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

  constructor(private router: Router,
              private cdRef: ChangeDetectorRef,
              public procescoService: ProcescoService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(activeRoute => {
      if (activeRoute['id']) {
        this.isAdminUser = true;
        this.procescoService.getUserById(activeRoute['id']).subscribe(user => {
          this.step = user.currentStep;
          this.id = user.id;
          this.procescoService.getStepById(user.preregistro_id, 'pre-register').subscribe((preRegister: any) => {
            console.log(preRegister.register);
            this.preRegister = preRegister.register;
            this.procescoService.getCountriesList().subscribe(countries => {
              this.countries = countries;
              this.procescoService.getDocumentTypeList().subscribe(documents => {
                this.documentTypes = documents;
                this.procescoService.getClassificationsList().subscribe(classifications => {
                  this.classifications = classifications;
                  this.preRegister.country_id = this.countries.find(el => el.id === this.preRegister.country_id);
                  this.preRegister.documentType = this.documentTypes.find(el => el.id === this.preRegister.documentType);
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
          console.log('classifications', classifications);
          this.classifications = classifications;
        }, error1 => {
          console.error(error1);
        });
        this.procescoService.getDocumentTypeList().subscribe(documentTypes => {
          console.log('documentTypes', documentTypes);
          this.documentTypes = documentTypes;
        }, error1 => {
          console.error(error1);
        });
        this.procescoService.getLogedUser().subscribe((user: any) => {
          console.log(user);
          this.currentUser = user;
          this.step = user.currentStep;
          this.procescoService.getCountriesList().subscribe(countries => {
            this.countries = countries;
            if (user.national === 0) {
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
    /*this.procescoService.getLogedUser().subscribe((response: any) => {
      this.currentUser = response;
      this.step = this.currentUser.currentStep;
      this.isAdminUser = this.currentUser.userType === 0;
      this.procescoService.getCountriesList().subscribe((countries: Array<object>) => {
        this.countries = countries;
        if (this.currentUser.national === 0) {
          this.preRegister.country_id = this.countries.find(el => el.id === 48);
        }
        this.procescoService.getClassificationsList().subscribe((classifications: Array<object>) => {
          this.classifications = classifications;
          this.procescoService.getDocumentTypeList().subscribe((documents: any) => {
            this.documentTypes = documents;
            this.activatedRoute.params.subscribe((activeRoute => {
              if (!activeRoute['id']) {
                return;
              }
              this.id = +activeRoute.id;
              this.toggleDisabled = true;
              this.procescoService.getUserById(activeRoute.id).subscribe((user: any) => {
                this.procescoService.getStepById(user.preregistro_id, 'pre-register').subscribe((data: any) => {
                  this.preRegister = data.register;
                  console.log(this.preRegister);
                  console.log(this.countries.find(el => el.id === data.register.country_id));
                  console.log(this.classifications.find(el => el.id === data.register.classification_id));
                  console.log(this.documentTypes.find(el => el.id === data.register.documentType));
                  this.preRegister.country_id = this.countries.find(el => el.id === data.register.country_id);
                  this.preRegister.classification_id = this.countries.find(el => el.id === data.register.classification_id);
                  this.preRegister.documentType = this.documentTypes.find(el => el.id === data.register.documentType);
                  /!*this.preRegister.classification_id = this.countries.find(el => el.id === data.register.classification_id);
                  this.preRegister.documentType = this.countries.find(el => el.id === data.register.documentType);*!/
                });
              });
            }));
          }, error1 => {
            console.log(error1);
          });
        });
      });
    }, error1 => {
      console.log(error1);
    });*/
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
      documentType: null,
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
    this.preRegister.currentStep = 1;
    console.log(this.id);
    console.log(this.preRegister);
    this.procescoService.adminApproval(this.id, this.preRegister).subscribe((response: any) => {
      this.successMessage = response.message;
      setTimeout(() => {
        this.router.navigate(['procesco/admin']);
      }, 2000);
    }, error1 => {
      console.error(error1);
    });
  }

  autoFill() {
    this.preRegister.whoRefers = 'Tu madre';
    this.preRegister.personalDataProtection = true;
    this.preRegister.habeas = true;
    this.preRegister.serviceDescription = 'serviceDescription';
    this.preRegister.documentType = 'documentType';
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
    this.preRegister.country_id = this.preRegister.country_id.id;
    this.preRegister.classification_id = this.preRegister.classification_id.id;
    this.preRegister.documentType = this.preRegister.documentType.id;
    console.log(this.preRegister);
    this.procescoService.updateUser(this.preRegister, 'pre-register').subscribe((response: any) => {
      this.router.navigate(['procesco/confirmacion']);
    }, error1 => {
      console.error(error1);
    });
  }
}

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
  id: string;
  isAdminUser: boolean;
  toggleDisabled: boolean;

  constructor(private router: Router,
              private cdRef: ChangeDetectorRef,
              public procescoService: ProcescoService,
              private activatedRoute: ActivatedRoute) {
    this.procescoService.getLogedUser().subscribe((response: any) => {
      this.currentUser = response;
      this.step = this.currentUser.currentStep;
      this.isAdminUser = this.currentUser.userType === 0;
      this.procescoService.getCointriesList().subscribe((data: Array<object>) => {
        this.countries = data;
        if (this.currentUser.national === 0) {
          this.preRegister.country = this.countries.find(el => el.id === 48);
          console.log(this.preRegister.country);
        }
      });
    }, error1 => {
      console.log(error1);
    });
    this.procescoService.getClassificationsList().subscribe((data: Array<object>) => {
      this.classifications = data;
    });


    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);

    this.preRegister = {
      whoRefers: null,
      currentStep: null,
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
    this.documentTypes = [
      {label: 'CC', value: 'cc'},
      {label: 'TI', value: 'ti'}
    ];

    this.activatedRoute.params.subscribe((response => {
      if (!response['id']) {
        return;
      }
      this.id = response.id;
      this.toggleDisabled = true;
      this.procescoService.getUserById(response.id).subscribe((user: any) => {
        console.log(user);
        this.procescoService.getStepById(user.preregistro_id, 'pre-register').subscribe((data: any) => {
          console.log(data.register);
          this.preRegister = data.register;
        });
      });
    }));
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
      console.log(response);
      this.router.navigate(['procesco/admin']);
    }, error1 => {
      console.log(error1);
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
    this.procescoService.updateUser(this.preRegister, 'pre-register').subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['procesco/confirmacion']);
    }, error1 => {
      console.log(error1);
    });
  }
}

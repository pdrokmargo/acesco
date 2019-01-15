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
export class NewProviderComponent implements AfterViewInit {
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

  constructor(private router: Router,
              private cdRef: ChangeDetectorRef,
              public procescoService: ProcescoService,
              private activatedRoute: ActivatedRoute) {
    this.procescoService.getLogedUser().subscribe((response: any) => {
      this.currentUser = response;
      this.step = this.currentUser.currentStep;
      this.isAdminUser = this.currentUser.userType === '0';
      console.log(response);
    });
    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);
    this.classifications = [
      {label: 'CLasificación 1', value: 'classification1'},
      {label: 'CLasificación 2', value: 'classification2'},
      {label: 'CLasificación 3', value: 'classification3'},
      {label: 'CLasificación 4', value: 'classification4'}
    ];

    this.preRegister = {
      whoRefers: null,
      currentStep: null,
      id: null,
      personalDataProtection: true,
      habeas: true,
      createdAt: this.now.getFullYear() + '-' + (month) + '-' + (day),
      classification: null,
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
      country: null,
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
    this.countries = [
      {label: 'Colombia', value: 'colombia'},
      {label: 'Argentina', value: 'argentina'}
    ];

    this.activatedRoute.params.subscribe((response => {
      if (!response) {
        return;
      }
      this.id = response.id;
      this.procescoService.getUserById(response.id).subscribe((user: any) => {
        console.log(user);
        this.procescoService.getStepById(user.preregistro_id, 'pre-register').subscribe((data: any) => {
          console.log(data);
          this.preRegister = data;
        });
      });
    }));
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
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
    this.procescoService.adminApproval(this.id, this.preRegister).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['procesco/admin']);
    }, error1 => {
      console.log(error1);
    });
  }

  autoFill() {
    this.preRegister = {
      whoRefers: 'Tu madre',
      personalDataProtection: true,
      habeas: true,
      classification: 'Clasificación 1',
      serviceDescription: 'serviceDescription',
      documentType: 'documentType',
      documentNumber: 'documentNumber',
      documentIssued: 'documentIssued',
      businessName: 'businessName',
      commercialName: 'commercialName',
      ciiu: 'ciiu',
      legalRepresentative: 'legalRepresentative',
      profession: 'profession',
      professionalCard: 'professionalCard',
      issuedBy: 'issuedBy',
      contactName: 'contactName',
      position: 'position',
      address: 'address',
      country: 'country',
      dpto: 'dpto',
      city: 'city',
      zipcode: 11111,
      phone: 5235325235,
      mobile: 25352523523,
      fax: 52352,
      email: 'email',
      website: 'website',
      iso9001: true,
      iso14001: true,
      oshas18001: true,
      antiCorruptionPolicy: true,
      sustainability: true,
      dueDiligence: true,
      socialResponsability: true,
      socialResponsabilityName: 'socialResponsabilityName',
      productSeal: true,
      productSealName: 'productSealName',
    };
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

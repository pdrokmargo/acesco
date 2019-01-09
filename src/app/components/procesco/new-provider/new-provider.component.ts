import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-provider',
  templateUrl: './new-provider.component.html',
  styleUrls: ['./new-provider.component.css']
})
export class NewProviderComponent implements AfterViewInit {
  preRegistro: Object;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  now: Date = new Date();
  classifications: any[] = [];
  documentTypes: any[] = [];
  countries: any[] = [];
  loading: boolean;
  step: number;
  currentUser: UserInterface;

  constructor(private router: Router, private cdRef: ChangeDetectorRef, procescoService: ProcescoService) {
    this.currentUser = procescoService.getLogedUser();
    this.step = this.currentUser.currentStep;
    this.loading = false;
    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);
    this.classifications = [
      {label: 'CLasificación 1', value: 'classification1'},
      {label: 'CLasificación 2', value: 'classification2'},
      {label: 'CLasificación 3', value: 'classification3'},
      {label: 'CLasificación 4', value: 'classification4'}
    ];

    this.preRegistro = {
      whoRefers: null,
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
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  updateValue(newValue: ToggleInterface) {
    if (newValue.key2) {
      this.preRegistro[newValue.key][newValue.key2] = newValue.value;
    } else {
      this.preRegistro[newValue.key] = newValue.value;
    }
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.loading = true;
    console.log(form.value);
    console.log(this.preRegistro);
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['procesco/confirmacion']);
    }, 3000);
  }
}

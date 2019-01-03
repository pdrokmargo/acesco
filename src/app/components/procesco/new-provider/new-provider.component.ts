import {AfterViewInit, Component} from '@angular/core';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';
import {Router} from '@angular/router';

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
  documentType: any[] = [];
  countries: any[] = [];
  loading: boolean;

  constructor(private router: Router) {
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
      autorizations: {
        personalDataProtection: true,
        habeas: true,
        createdAt: this.now.getFullYear() + '-' + (month) + '-' + (day),
        whoRefers: null,
        classification: null,
        serviceDescription: null,
      },
      generalInfo: {
        documentType: null,
        documentNumber: null,
        documentIssued: null,
        businessName: null,
        comercialName: null,
        ciiu: null,
        professionalCard: null,
      },
      supplierContactInfo: {
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
        website: null
      },
      managementSystemInformation: {
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
      }
    };
    this.documentType = [
      {label: 'CC', value: 'cc'},
      {label: 'TI', value: 'ti'},
    ];
    this.countries = [
      {label: 'Colombia', value: 'colombia'},
      {label: 'Argentina', value: 'argentina'}
    ];
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
  }

  updateValue(newValue: ToggleInterface) {
    if (newValue.key2) {
      this.preRegistro[newValue.key][newValue.key2] = newValue.value;
    } else {
      this.preRegistro[newValue.key] = newValue.value;
    }
  }

  submitPreRegistro() {
    this.loading = true;
    console.log(this.preRegistro);
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['procesco/confirmacion']);
    }, 3000);
  }

}

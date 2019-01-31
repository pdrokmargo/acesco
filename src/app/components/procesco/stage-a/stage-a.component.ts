/**
 * @author  Sergio Zapata
 * @contact sergio8016@gmail.com
 * @version 1.0, 09/01/08
 */

import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter} from '@angular/core';
import {UserInterface} from '../../../Interfaces/user.interface';
import {ProcescoService} from '../../../services/procesco.service';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-stage-a',
  templateUrl: './stage-a.component.html',
  styleUrls: ['./stage-a.component.css']
})
export class StageAComponent {
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  loading: boolean;
  step: number;
  user: UserInterface;
  stageA: object;
  now: Date = new Date();
  id: number;
  isAdminUser: boolean;
  successMessage: string;
  reserved_space: any;
  impactLevelToggles: any [] = [];
  paymentConditionToggles: any[] = [];
  currencies: any [] = [];
  languages: any [] = [];

  constructor(private cdRef: ChangeDetectorRef,
              public procescoService: ProcescoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(activeRoute => {
      if (activeRoute['id']) {
        this.isAdminUser = true;
        this.procescoService.getUserById(activeRoute['id']).subscribe((user: any) => {
          this.id = user.id;
          this.step = user.currentStep;
          this.user = user;
          this.procescoService.getStepById(user.stagea_id, 'stage-a').subscribe((stage: any) => {
            this.stageA = stage.stage_a;
          }, error1 => {
            console.error(error1);
          });
        }, error1 => {
          console.error(error1);
        });
      } else {
        this.procescoService.getLogedUser().subscribe((user: UserInterface) => {
          this.step = user.currentStep;
        }, error1 => {
          console.error(error1);
        });
      }
    }, error1 => {
      console.error(error1);
    });
    this.procescoService.getLanguages().subscribe((languages: any) => {
      this.languages = languages;
    });
    this.procescoService.getCurrencies().subscribe((currencies: any) => {
      this.currencies = currencies;
    });
    this.stageA = {
      pep: false,
      pep_name: null,
      pep_identification: null,
      society_position: null,
      public_position: null,
      linkup_date: null,
      unlink_date: null,
      commonRegime: false,
      simplifiedRegimen: false,
      greatContributor: false,
      greatContributorRes: null,
      greatContributorFrom: null,
      selfWithholdingByRent: false,
      selfWithholdingByRentRes: null,
      selfWithholdingByRentFrom: null,
      industryAndCommerceTaxBogota: false,
      industryAndCommerceTaxCodBogota: null,
      industryAndCommerceTaxRateBogota: null,
      industryAndCommerceTaxMalambo: false,
      industryAndCommerceTaxCodMalambo: null,
      industryAndCommerceTaxRateMalambo: null,
      industryAndCommerceTaxOther: null,
      industryAndCommerceTaxCodOther: null,
      industryAndCommerceTaxRateOther: null,
      tributaryYear: this.now.getFullYear() - 1,
      tributaryOperationalIncome: null,
      tributaryOperationalExpenses: null,
      totalIncome: null,
      totalActive: null,
      totalPassive: null,
      commercialReferenceName1: null,
      commercialReferencePhone1: null,
      commercialReferenceContact1: null,
      commercialReferenceName2: null,
      commercialReferencePhone2: null,
      commercialReferenceContact2: null,
      commercialReferenceName3: null,
      commercialReferencePhone3: null,
      commercialReferenceContact3: null,
      personalReferenceName: null,
      personalReferenceEmail: null,
      personalReferencePosition: null,
      personalReferencePhone: null,
      personalReferenceMobile: null
    };
    this.reserved_space = {
      language_id: null,
      currency_id: null,
      level_of_impact: 2,
      payment_condition: 60
    };
    this.impactLevelToggles = [
      {label: 'Bajo', value: false, model: 'level_of_impact', key: 1},
      {label: 'Medio', value: true, model: 'level_of_impact', key: 2},
      {label: 'Alto', value: false, model: 'level_of_impact', key: 3}
    ];
    this.paymentConditionToggles = [
      {model: 'payment_condition', value: false, key: 15},
      {model: 'payment_condition', value: false, key: 30},
      {model: 'payment_condition', value: false, key: 45},
      {model: 'payment_condition', value: true, key: 60},
      {model: 'payment_condition', value: false, key: 90},
      {model: 'payment_condition', value: false, key: 120}
    ];
  }

  updatedValue(event: ToggleInterface) {
    switch (event.key) {
      case 'commonRegime': {
        this.stageA['simplifiedRegimen'] = false;
        break;
      }
      case 'simplifiedRegimen': {
        this.stageA['commonRegime'] = false;
        break;
      }
      case 'industryAndCommerceTaxBogota': {
        if (event.value) {
          this.stageA['industryAndCommerceTaxMalambo'] = false;
        }
        break;
      }
      case 'industryAndCommerceTaxMalambo': {
        if (event.value) {
          this.stageA['industryAndCommerceTaxBogota'] = false;
        }
        break;
      }
      case 'level_of_impact': {
        if (event.value) {
          this.impactLevelToggles.forEach(el => el.value = false);
        }
        this.reserved_space['level_of_impact'] = event.key2;
        const index = this.impactLevelToggles.findIndex(el => el.key === event.key2);
        this.impactLevelToggles[index].value = true;
        break;
      }
      case 'payment_condition': {
        if (event.value) {
          this.paymentConditionToggles.forEach(el => el.value = false);
        }
        const index = this.paymentConditionToggles.findIndex(el => el.key === event.key2);
        this.paymentConditionToggles[index].value = true;
        this.reserved_space['payment_condition'] = event.key2;
        break;
      }
    }
    this.stageA[event.key] = event.value;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.procescoService.updateUser(this.stageA, 'stage-a').subscribe((response: any) => {
      this.router.navigate(['procesco/confirmacion']);
      this.loading = false;
    }, error1 => {
      console.error(error1);
    });
  }

  approval() {
    this.loading = true;
    this.reserved_space.language_id = this.reserved_space.language_id.id;
    this.reserved_space.currency_id = this.reserved_space.currency_id.id;
    const {language_id, currency_id, level_of_impact, payment_condition} = this.reserved_space;
    const finalObject = {
      currentStep: 2,
      reserved_space: {language_id, currency_id, level_of_impact, payment_condition}
    };
    this.procescoService.adminApproval(this.id, finalObject).subscribe((response: any) => {
      this.successMessage = response.message;
      setTimeout(() => {
        this.router.navigate(['procesco/admin']);
      }, 2000);
    }, error1 => {
      console.error(error1);
    });
  }

  autoFill() {
    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);
    this.stageA = {
      pep: true,
      pep_name: 'pep_name',
      pep_identification: 324515,
      society_position: 'society_position',
      public_position: 'public_position',
      linkup_date: this.now.getFullYear() + '-' + (month) + '-' + (day),
      unlink_date: this.now.getFullYear() + '-' + (month) + '-' + (day),
      commonRegime: true,
      simplifiedRegimen: true,
      greatContributor: true,
      tributaryYear: this.now.getFullYear() - 1,
      greatContributorRes: 'greatContributorRes',
      greatContributorFrom: this.now.getFullYear() + '-' + (month) + '-' + (day),
      selfWithholdingByRent: true,
      selfWithholdingByRentRes: 'selfWithholdingByRentRes',
      selfWithholdingByRentFrom: this.now.getFullYear() + '-' + (month) + '-' + (day),
      industryAndCommerceTaxBogota: true,
      industryAndCommerceTaxCodBogota: 79823759825,
      industryAndCommerceTaxRateBogota: parseFloat('635253255'),
      industryAndCommerceTaxMalambo: true,
      industryAndCommerceTaxCodMalambo: 79823759825,
      industryAndCommerceTaxRateMalambo: parseFloat('346632626'),
      industryAndCommerceTaxOther: 857298357295,
      industryAndCommerceTaxCodOther: 59863578623587,
      industryAndCommerceTaxRateOther: parseFloat('762336623'),
      tributaryOperationalIncome: parseFloat('762336623'),
      tributaryOperationalExpenses: parseFloat('762336623'),
      totalIncome: parseFloat('762336623'),
      totalActive: parseFloat('762336623'),
      totalPassive: parseFloat('762336623'),
      commercialReferenceName1: 'commercialReferenceName1',
      commercialReferencePhone1: 8478917259,
      commercialReferenceContact1: 'commercialReferenceContact1',
      commercialReferenceName2: 'commercialReferenceName2',
      commercialReferencePhone2: 8478917259,
      commercialReferenceContact2: 'commercialReferenceContact2',
      commercialReferenceName3: 'commercialReferenceName3',
      commercialReferencePhone3: 8478917259,
      commercialReferenceContact3: 'commercialReferenceContact3',
      personalReferenceName: 'personalReferenceName',
      personalReferenceEmail: 'personalReferenceEmail',
      personalReferencePosition: 'personalReferencePosition',
      personalReferencePhone: 8478917259,
      personalReferenceMobile: 98479817421
    };
  }
}

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
export class StageAComponent  {
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  loading: boolean;
  step: string;
  user: UserInterface;
  stageA: object;
  now: Date = new Date();
  id: number;
  isAdminUser: boolean;

  constructor(private cdRef: ChangeDetectorRef,
              public procescoService: ProcescoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.loading = false;
    this.procescoService.getLogedUser().subscribe((response: any) => {
      console.log(response);
      this.user = response;
      this.step = this.user.currentStep;
      this.isAdminUser = this.user.userType === '0';
    });

    this.stageA = {
      pep: false,
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
    this.activatedRoute.params.subscribe((response => {
      if (!response.length) {
        return;
      }
      this.id = response.id;
      this.procescoService.getUserById(response.id).subscribe((user: any) => {
        this.step = user.currentStep;
        this.procescoService.getStepById(user.stagea_id, 'stage-a').subscribe((data: any) => {
          this.stageA = data;
        });
      }, error1 => {
        console.log(error1);
      });

    }));
  }

  updatedValue(event: ToggleInterface) {
    console.log(event);
    switch (event.key) {
      case 'industryAndCommerceTaxBogota': {
        if (event.value) {
          this.stageA['industryAndCommerceTaxMalambo'] = false;
          console.log(this.stageA['industryAndCommerceTaxMalambo']);
        }
        break;
      }
      case 'industryAndCommerceTaxMalambo': {
        console.log('industryAndCommerceTaxMalambo');
        if (event.value) {
          this.stageA['industryAndCommerceTaxBogota'] = false;
          console.log(this.stageA['industryAndCommerceTaxBogota']);
        }
        break;
      }
    }
    this.stageA[event.key] = event.value;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    console.log(this.stageA);
    this.procescoService.updateUser(this.stageA, 'stage-a').subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['procesco/confirmacion']);
      this.loading = false;
    }, error1 => {
      console.log(error1);
    });
  }

  autoFill() {
    const day = ('0' + this.now.getDate()).slice(-2);
    const month = ('0' + (this.now.getMonth() + 1)).slice(-2);
    this.stageA = {
      pep: true,
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
      industryAndCommerceTaxOther: 'industryAndCommerceTaxOther',
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
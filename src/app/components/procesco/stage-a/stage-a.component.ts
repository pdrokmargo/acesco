import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter} from '@angular/core';
import {UserInterface} from '../../../Interfaces/user.interface';
import {ProcescoService} from '../../../services/procesco.service';
import {ToggleInterface} from '../../../Interfaces/toggle.interface';
import {faCaretRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stage-a',
  templateUrl: './stage-a.component.html',
  styleUrls: ['./stage-a.component.css']
})
export class StageAComponent implements AfterViewInit {
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  height: number;
  loading: boolean;
  step: number;
  user: UserInterface;
  stageA: object;
  now: Date = new Date();

  constructor(private cdRef: ChangeDetectorRef, public procescoService: ProcescoService, private router: Router) {
    this.loading = false;
    //this.user = this.procescoService.getLogedUser();
    this.step = this.user.currentStep;
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
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
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
    console.log(form);
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['procesco/confirmacion']);
    }, 3000);
  }
}

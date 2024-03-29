/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 09/01/08
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { UserInterface } from "../../../Interfaces/user.interface";
import { ProcescoService } from "../../../services/procesco.service";
import { ToggleInterface } from "../../../Interfaces/toggle.interface";
import { faCaretRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-stage-a",
  templateUrl: "./stage-a.component.html",
  styleUrls: ["./stage-a.component.css"]
})
export class StageAComponent {
  private __approved: boolean = false;
  isSimplified = false;
  @Input() set approved(approved: boolean) {
    this.__approved = approved;
    this.isAdminUser = false;
  }

  @Output() emitEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  keyword: string = 'descripcion'
  ciiuInitial: string[] = ['', '', ''];
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
  impactLevelToggles: any[] = [];
  paymentConditionToggles: any[] = [];
  currencies: any[] = [];
  languages: any[] = [];
  ciiuCodes: any[] = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    public procescoService: ProcescoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(
      activeRoute => {
        if (activeRoute["id"]) {
          // this.isAdminUser = !this.approved ? false : true;
          this.isAdminUser = true;
          this.procescoService.getUserById(activeRoute["id"]).subscribe(
            ({ id, currentStep, stagea_id }: any) => {
              this.id = id;
              this.step = currentStep;
              this.procescoService.getStepById(stagea_id, "stage-a").subscribe(
                ({ stage_a }: any) => {
                  console.log(stage_a);

                  this.stageA = { ...stage_a };
                  this.stageA["pep_info"] = JSON.parse(this.stageA["pep_info"]);
                  this.procescoService.getActividadesEconomicasList().subscribe(
                    act_economicas => {
                    this.ciiuCodes = [...act_economicas];
                    const ciuuInitialOne = this.ciiuCodes.find(item => item.id === stage_a.industryAndCommerceTaxCodBogota);
                    const ciuuInitialTwo = this.ciiuCodes.find(item => item.id === stage_a.industryAndCommerceTaxCodMalambo);
                    const ciuuInitialThree = this.ciiuCodes.find(item => item.id === stage_a.industryAndCommerceTaxCodOther);
                    this.ciiuInitial = [
                      ciuuInitialOne ? ciuuInitialOne.descripcion : '',
                      ciuuInitialTwo ? ciuuInitialTwo.descripcion : '',
                      ciuuInitialThree ? ciuuInitialThree.descripcion : '',
                    ];
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
          this.procescoService.getLogedUser().subscribe(
            ({ currentStep }: any) => {
              this.step = currentStep;
              this.procescoService.getActividadesEconomicasList().subscribe(
                act_economicas => {
                this.ciiuCodes = [...act_economicas];
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
    this.procescoService.getLanguages().subscribe((languages: any) => {
      this.languages = [...languages];
    });
    this.procescoService.getCurrencies().subscribe((currencies: any) => {
      this.currencies = [...currencies];
    });
    this.stageA = {
      pep: false,
      pep_info: null,
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
      // personalReferenceName: null,
      // personalReferenceEmail: null,
      // personalReferencePosition: null,
      // personalReferencePhone: null,
      // personalReferenceMobile: null,
      bankReferenceName: null,
      bankReferenceBranchName: null,
      bankReferenceNameContact: null,
      bankReferenceMobile: null,
      bankReferenceEmail: null      
    };
    this.reserved_space = {
      language_id: null,
      currency_id: null,
      level_of_impact: 2,
      payment_condition: 60
    };
    this.impactLevelToggles = [
      { label: "Bajo", value: false, model: "level_of_impact", key: 1 },
      { label: "Medio", value: true, model: "level_of_impact", key: 2 },
      { label: "Alto", value: false, model: "level_of_impact", key: 3 }
    ];
    this.paymentConditionToggles = [
      { model: "payment_condition", value: false, key: 0 },
      { model: "payment_condition", value: false, key: 15 },
      { model: "payment_condition", value: false, key: 30 },
      { model: "payment_condition", value: false, key: 45 },
      { model: "payment_condition", value: true, key: 60 },
      { model: "payment_condition", value: false, key: 90 },
      { model: "payment_condition", value: false, key: 120 }
    ];
  }
  addPEP(){
    var pep_info = {pep_name: "", pep_identification: 0, society_position: "", public_position: "", linkup_date:"", unlink_date: ""};
    pep_info.pep_name = this.stageA["pep_name"];
    pep_info.pep_identification = this.stageA["pep_identification"];
    pep_info.society_position = this.stageA["society_position"];
    pep_info.public_position = this.stageA["public_position"];
    pep_info.linkup_date = this.stageA["linkup_date"];
    pep_info.unlink_date = this.stageA["unlink_date"];
    
    if(this.stageA["pep_info"] == null){
      this.stageA["pep_info"] = [];
      this.stageA["pep_info"].push(pep_info);
    }else{
      
      this.stageA["pep_info"].push(pep_info);
    }

    this.stageA["pep_name"] = "";
    this.stageA["pep_identification"] = "";
    this.stageA["society_position"] = "";
    this.stageA["public_position"] = "";
    this.stageA["linkup_date"] = "";
    this.stageA["unlink_date"] = "";
    
  }
  removePEP(i){
    this.stageA["pep_info"].slice(i, 1);
  }
  seePEP(pep_info){
    this.stageA["pep_name"] = pep_info.pep_name;
    this.stageA["pep_identification"] = pep_info.pep_identification;
    this.stageA["society_position"] = pep_info.society_position;
    this.stageA["public_position"] = pep_info.public_position;
    this.stageA["linkup_date"] = pep_info.linkup_date
    this.stageA["unlink_date"] = pep_info.unlink_date;
  }
  updatedValue(event: ToggleInterface) {
    switch (event.key) {
      case "commonRegime": {
        this.isSimplified = false;
        this.stageA["simplifiedRegimen"] = false;
        break;
      }
      case "simplifiedRegimen": {
        this.isSimplified = true;
        this.stageA["commonRegime"] = false;
        break;
      }
      case "industryAndCommerceTaxBogota": {
        if (event.value) {
          this.stageA["industryAndCommerceTaxMalambo"] = false;
        }
        break;
      }
      case "industryAndCommerceTaxMalambo": {
        if (event.value) {
          this.stageA["industryAndCommerceTaxBogota"] = false;
        }
        break;
      }
      case "level_of_impact": {
        if (event.value) {
          this.impactLevelToggles.forEach(el => (el.value = false));
        }
        this.reserved_space["level_of_impact"] = event.key2;
        const index = this.impactLevelToggles.findIndex(
          el => el.key === event.key2
        );
        this.impactLevelToggles[index].value = true;
        break;
      }
      case "payment_condition": {
        if (event.value) {
          this.paymentConditionToggles.forEach(el => (el.value = false));
        }
        const index = this.paymentConditionToggles.findIndex(
          el => el.key === event.key2
        );
        this.paymentConditionToggles[index].value = true;
        this.reserved_space["payment_condition"] = event.key2;
        break;
      }
      }
    this.stageA[event.key] = event.value;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.stageA["pep_info"] = JSON.stringify(this.stageA["pep_info"]);
    this.procescoService.updateUser(this.stageA, "stage-a").subscribe(
      response => {
        this.router.navigate(["procesco/confirmacion"]);
        this.loading = false;
      },
      error1 => console.error(error1)
    );
  }

  selectCiiuOne(item) {
    this.stageA = {
      ...this.stageA,
      industryAndCommerceTaxCodBogota: item.id
    };
  }

  selectCiiuTwo(item) {
    this.stageA = {
      ...this.stageA,
      industryAndCommerceTaxCodMalambo: item.id
    };
  }

  selectCiiuThree(item) {
    this.stageA = {
      ...this.stageA,
      industryAndCommerceTaxCodOther: item.id
    };
  }

  approval() {
    this.loading = true;
    this.reserved_space.language_id = this.reserved_space.language_id.id;
    this.reserved_space.currency_id = this.reserved_space.currency_id.id;

    const {
      language_id,
      currency_id,
      level_of_impact,
      payment_condition
    } = this.reserved_space;

    const finalObject = {
      currentStep: 2,
      reserved_space: {
        language_id,
        currency_id,
        level_of_impact,
        payment_condition
      }
    };
    this.procescoService.adminApproval(this.id, finalObject).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(["procesco/admin"]);
        }, 2000);
      },
      error1 => console.error(error1)
    );
  }

  autoFill() {
    const day = ("0" + this.now.getDate()).slice(-2);
    const month = ("0" + (this.now.getMonth() + 1)).slice(-2);
    this.stageA = {
      pep: true,
      pep_name: "pep_name",
      pep_identification: 324515,
      society_position: "society_position",
      public_position: "public_position",
      linkup_date: this.now.getFullYear() + "-" + month + "-" + day,
      unlink_date: this.now.getFullYear() + "-" + month + "-" + day,
      commonRegime: true,
      simplifiedRegimen: true,
      greatContributor: true,
      tributaryYear: this.now.getFullYear() - 1,
      greatContributorRes: "greatContributorRes",
      greatContributorFrom: this.now.getFullYear() + "-" + month + "-" + day,
      selfWithholdingByRent: true,
      selfWithholdingByRentRes: "selfWithholdingByRentRes",
      selfWithholdingByRentFrom:
        this.now.getFullYear() + "-" + month + "-" + day,
      industryAndCommerceTaxBogota: true,
      industryAndCommerceTaxCodBogota: 79823759825,
      industryAndCommerceTaxRateBogota: parseFloat("635253255"),
      industryAndCommerceTaxMalambo: true,
      industryAndCommerceTaxCodMalambo: 79823759825,
      industryAndCommerceTaxRateMalambo: parseFloat("346632626"),
      industryAndCommerceTaxOther: 857298357295,
      industryAndCommerceTaxCodOther: 59863578623587,
      industryAndCommerceTaxRateOther: parseFloat("762336623"),
      tributaryOperationalIncome: parseFloat("762336623"),
      tributaryOperationalExpenses: parseFloat("762336623"),
      totalIncome: parseFloat("762336623"),
      totalActive: parseFloat("762336623"),
      totalPassive: parseFloat("762336623"),
      commercialReferenceName1: "commercialReferenceName1",
      commercialReferencePhone1: 8478917259,
      commercialReferenceContact1: "commercialReferenceContact1",
      commercialReferenceName2: "commercialReferenceName2",
      commercialReferencePhone2: 8478917259,
      commercialReferenceContact2: "commercialReferenceContact2",
      commercialReferenceName3: "commercialReferenceName3",
      commercialReferencePhone3: 8478917259,
      commercialReferenceContact3: "commercialReferenceContact3",
      // personalReferenceName: "personalReferenceName",
      // personalReferenceEmail: "personalReferenceEmail",
      // personalReferencePosition: "personalReferencePosition",
      // personalReferencePhone: 8478917259,
      // personalReferenceMobile: 98479817421
      bankReferenceName: "bankReferenceName",
      bankReferenceBranchName: "bankReferenceBranchName",
      bankReferenceNameContact: "bankReferenceNameContact",
      bankReferenceMobile: 98479817421,
      bankReferenceEmail: "bankReferenceEmail" 
    };
  }

  updated(callback) {
    this.procescoService
      .updateUser(this.stageA, "stage-a")
      .subscribe(rs => this.emitEvent.emit(true), err => console.error(err));
  }
}

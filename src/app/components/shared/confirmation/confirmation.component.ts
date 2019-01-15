import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {faCaretRight, faCheck, faEnvelope, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements AfterViewInit{
  @Input() step: number;
  faCheck = faCheck;
  faEnvelope = faEnvelope;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  steps: any[] = [];
  loading: boolean;
  height: number;
  currentUser: UserInterface;
  currentStep: any;

  constructor(private cdRef: ChangeDetectorRef, public procescoService: ProcescoService) {
    this.currentStep = null;
    this.procescoService.getLogedUser().subscribe((response: any) => {
      console.log(response);
      this.currentUser = response;
      this.currentStep = +this.currentUser.currentStep + 1;
    });

    this.steps = [
      {},
      { position: 'Primera', stepText: 'Pre - registro' },
      { position: 'Segunda', stepText: 'Pre - selección-etapa A' },
      { position: 'Tercera', stepText: 'Pre - selección-etapa B' },
    ];
    this.loading = false;
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('Go to email');
    }, 3000);
  }

}

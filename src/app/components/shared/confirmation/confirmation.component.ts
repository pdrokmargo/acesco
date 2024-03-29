/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 02/01/09
 */

import {AfterViewInit, Component, Input} from '@angular/core';
import {faCaretRight, faCheck, faEnvelope, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {ProcescoService} from '../../../services/procesco.service';
import {UserInterface} from '../../../Interfaces/user.interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
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

  constructor( public procescoService: ProcescoService) {
    this.procescoService.getLogedUser().subscribe((response: any) => {
      this.currentUser = response;
      this.currentStep = this.currentUser.currentStep + 1;
    });

    this.steps = [
      {position: 'fake'},
      {position: 'Primera', stepText: 'Registro'},
      {position: 'Segunda', stepText: 'Información Financiera'},
      {position: 'Tercera', stepText: 'Control Documental'},
    ];
    this.loading = false;
  }

}

import {Component, Input} from '@angular/core';
import {faCaretRight, faCheck, faEnvelope, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

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
  constructor(private router: Router) {
    this.step = 0;
    this.steps = [
      { position: 'Primera', step: 'Pre - registro' },
      { position: 'Segunda', step: 'Pre - selección' },
    ];
    this.loading = false;
  }

  submit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('Go to email');
    }, 3000);
  }

}

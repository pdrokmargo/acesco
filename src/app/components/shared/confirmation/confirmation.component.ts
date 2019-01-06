import {AfterViewInit, ChangeDetectorRef, Component, Input} from '@angular/core';
import {faCaretRight, faCheck, faEnvelope, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

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
  constructor(private cdRef: ChangeDetectorRef) {
    this.step = 0;
    this.steps = [
      { position: 'Primera', step: 'Pre - registro' },
      { position: 'Segunda', step: 'Pre - selección' },
      { position: 'Tercera', step: 'Pre - selección-etapa B' },
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

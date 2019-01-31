import {Component, Input} from '@angular/core';
import {ProcescoService} from '../../../services/procesco.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent {
  @Input() user;
  returned: boolean;
  returnReason: string;

  constructor(public procescoService: ProcescoService, private router: Router) {
    this.returnReason = null;
  }

  onlinkClick() {
    this.returned = !this.returned;
  }

  onButtonClick(input) {
    this.procescoService.adminApproval(this.user.id, {message: input.value}).subscribe((response: any) => {
      this.router.navigate(['procesco/admin']);
    }, error1 => {
      console.error(error1);
    });
  }


}

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

  constructor(public procescoService: ProcescoService, private router: Router) {

  }

  onlinkClick() {
    console.log(this.user);
    this.procescoService.adminApproval(this.user.id, this.user).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['procesco/admin']);
    }, error1 => {
      console.error(error1);
    });
  }


}

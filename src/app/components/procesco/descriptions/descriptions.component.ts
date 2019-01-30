import {Component} from '@angular/core';
import {ProcescoService} from '../../../services/procesco.service';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css']
})
export class DescriptionsComponent {
  classifications: any [] = [];
  classificationsTitles: any [] = [];

  constructor(public procescoService: ProcescoService) {
    this.procescoService.getClassificationsList().subscribe((classifications: any) => {
      this.classifications = classifications;
      console.log(this.classifications);
    }, error1 => {
      console.error(error1);
    });

    this.classificationsTitles = [
      'Clasificación',
      'Descripción'
    ];
  }

}

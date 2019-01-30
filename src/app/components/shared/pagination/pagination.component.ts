import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {faAngleDoubleLeft, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';
import {ProcescoService} from '../../../services/procesco.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() options: any;
  pageItems: any [] = [];
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(public procescoService: ProcescoService) {

  }

  ngOnChanges(changes: SimpleChanges) {
    // Action for change
    if (changes['options']) {
      if (this.options.total > 15) {
        for (let i = 0; i < this.options.total / 15; i++) {
          this.pageItems.push({label: i + 1});
        }
      }
    }
  }

  onButtonClick(param: any, page?: number) {
    switch (param) {
      case 'first': {
        this.procescoService.getAllUsers(1).subscribe((response: any) => {
          const {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total} = response;
          this.options = {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total};
        });
        break;
      }
      case 'last': {
        this.procescoService.getAllUsers(this.options.last_page).subscribe((response: any) => {
          const {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total} = response;
          this.options = {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total};
        });
        break;
      }
      case 'prev': {
        this.procescoService.getAllUsers(this.options.current_page - 1).subscribe((response: any) => {
          const {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total} = response;
          this.options = {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total};
        });
        break;
      }
      case 'next': {
        this.procescoService.getAllUsers(this.options.current_page + 1).subscribe((response: any) => {
          const {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total} = response;
          this.options = {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total};
        });
        break;
      }
      case 'selected': {
        this.procescoService.getAllUsers(page).subscribe((response: any) => {
          const {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total} = response;
          this.options = {current_page, last_page, last_page_url, next_page_url, per_page, prev_page_url, to, total};
        });
      }
    }
  }

}

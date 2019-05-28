import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
declare var $: any;

@Component({
  selector: "app-approved-profile",
  templateUrl: "./approved-profile.component.html",
  styleUrls: ["./approved-profile.component.css"]
})
export class ApprovedProfileComponent implements AfterViewInit {
  loading: boolean;
  height: number;
  update: number = 0;

  constructor(private cdRef: ChangeDetectorRef, private toastr: ToastrService) {
    this.update = 0;
    console.log(this.update);
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }

  callback(e) {
    this.update++;
    if (this.update == 3) {
      $(".toast").toast({ autohide: false });
      $(".toast").toast("show");
      setTimeout(() => {
        $(".toast").toast("hide");
      }, 3000);
      this.update = 0;
    }
  }
}

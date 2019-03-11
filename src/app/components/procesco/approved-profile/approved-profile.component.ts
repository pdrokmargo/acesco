import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-approved-profile",
  templateUrl: "./approved-profile.component.html",
  styleUrls: ["./approved-profile.component.css"]
})
export class ApprovedProfileComponent implements AfterViewInit {
  loading: boolean;
  height: number;

  constructor(
    private cdRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) {
    // this.loading = false;
    // this.activatedRoute.params.subscribe(
    //   activeRoute => {
    //     if (activeRoute.id) {
    //       console.log(activeRoute.id);
    //     }
    //   },
    //   error1 => {
    //     console.error(error1);
    //   }
    // );
  }

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }
}

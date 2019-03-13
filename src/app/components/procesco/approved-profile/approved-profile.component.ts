import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-approved-profile",
  templateUrl: "./approved-profile.component.html",
  styleUrls: ["./approved-profile.component.css"]
})
export class ApprovedProfileComponent implements AfterViewInit {
  loading: boolean;
  height: number;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.height = document.body.offsetHeight;
    this.cdRef.detectChanges();
  }
}

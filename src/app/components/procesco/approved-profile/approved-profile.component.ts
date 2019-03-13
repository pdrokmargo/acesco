import { Component, ChangeDetectorRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-approved-profile",
  templateUrl: "./approved-profile.component.html",
  styleUrls: ["./approved-profile.component.css"]
})
export class ApprovedProfileComponent implements AfterViewInit {
  loading: boolean;
  height: number;
  update: number = 0;

  constructor(private cdRef: ChangeDetectorRef) {
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
      console.log("entra");
      
      this.update = 0;
    }
  }
}

/**
 * @author  Pedro Camargo
 * @contact pedrocamargo@imagilogic.com
 * @version 1.0, 28/12/08
 */

import { Component, EventEmitter, Output } from "@angular/core";
import { faGoogleDrive } from "@fortawesome/free-brands-svg-icons";
import {
  faCaretRight,
  faSpinner,
  faUnlock,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProcescoService } from "../../../services/procesco.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  @Output() back: EventEmitter<any> = new EventEmitter();

  private IS_ADMIN: number = 0;

  faGoogleDrive = faGoogleDrive;
  faUser = faUser;
  faUnlock = faUnlock;
  faCaretRight = faCaretRight;
  faSpinner = faSpinner;
  user: any;
  loading: boolean;
  loginInfo: object;
  errorMessage: string;

  constructor(private router: Router, public procescoService: ProcescoService) {
    this.loading = false;
    this.loginInfo = {
      error: false,
      errorType: null,
      message: null
    };
    this.user = {
      name: null,
      password: null
    };
    this.loading = false;
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.procescoService.validateUser(form.value).subscribe(
      (response: any) => {
        localStorage.setItem("acctkn", JSON.stringify(response.access_token));
        this.user = response.user;

        if (this.user.userType === this.IS_ADMIN) {
          this.router.navigate(["procesco/admin"]);
        } else {
          switch (this.user.currentStep) {
            // case 0:
            //   this.router.navigate(["procesco/perfil"]);
            //   break;
            case 0:
              this.router.navigate(["procesco/nuevoProveedor"]);
              break;
            case 1:
              this.router.navigate(["procesco/preseleccionEtapaA"]);
              break;
            case 2:
              this.router.navigate(["procesco/preseleccionEtapaB"]);
              break;
            case 3:
              this.router.navigate(["procesco/perfilAprobado/" + this.user.id]);
              break;
          }
        }
        this.loading = false;
      },
      error1 => {
        this.loading = false;
        this.errorMessage =
          "Usuario y/o contraseña ingresados no son correctos";
      }
    );
  }

  backHome(where?: string) {
    if (where) {
      this.back.emit(where);
      return;
    }
    this.back.emit("menu");
  }
}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// Http
import { HttpClientModule } from "@angular/common/http";

// Routes
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main/main.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ProcescoComponent } from "./components/procesco/procesco.component";
import { SistemaDeGarantiasComponent } from "./components/sistema-de-garantias/sistema-de-garantias.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FaqComponent } from "./components/procesco/faq/faq.component";
import { EvaluacionComponent } from "./components/procesco/evaluacion/evaluacion.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./components/procesco/login/login.component";
import { RegisterComponent } from "./components/procesco/register/register.component";
import { ProfileComponent } from "./components/procesco/profile/profile.component";
import { LogoAndSocialComponent } from "./components/shared/logo-and-social/logo-and-social.component";
import { NewProviderComponent } from "./components/procesco/new-provider/new-provider.component";
import { UpdateComponent } from "./components/procesco/update/update.component";
import { TimelineComponent } from "./components/shared/timeline/timeline.component";
import { FormTitleComponent } from "./components/shared/form-title/form-title.component";
import { ToggleComponent } from "./components/shared/toggle/toggle.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { ConfirmationComponent } from "./components/shared/confirmation/confirmation.component";
import { LoaderComponent } from "./components/shared/loader/loader.component";
import { StageAComponent } from "./components/procesco/stage-a/stage-a.component";
import { StageBComponent } from "./components/procesco/stage-b/stage-b.component";
import { AdminComponent } from "./components/procesco/admin/admin.component";
import { SpinnerComponent } from "./components/shared/spinner/spinner.component";
import { PaginationComponent } from "./components/shared/pagination/pagination.component";
import { ReturnComponent } from "./components/shared/return/return.component";
import { DescriptionsComponent } from "./components/procesco/descriptions/descriptions.component";
import { RoofSimulatorComponent } from "./components/roof-simulator/roof-simulator.component";
import { MyCurrencyDirective } from "./directive/my-currency.directive";
import { MyCurrencyPipe } from "./pipe/my-currency.pipe";

import { CommonModule } from '@angular/common';
import { ApprovedProfileComponent } from "./components/procesco/approved-profile/approved-profile.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { SistemaPinturasComponent } from './components/sistema-pinturas/sistema-pinturas.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    ProcescoComponent,
    SistemaDeGarantiasComponent,
    RoofSimulatorComponent,
    FaqComponent,
    EvaluacionComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LogoAndSocialComponent,
    NewProviderComponent,
    UpdateComponent,
    TimelineComponent,
    FormTitleComponent,
    ToggleComponent,
    FooterComponent,
    ConfirmationComponent,
    LoaderComponent,
    StageAComponent,
    StageBComponent,
    AdminComponent,
    SpinnerComponent,
    PaginationComponent,
    ReturnComponent,
    DescriptionsComponent,
    RoofSimulatorComponent,
    MyCurrencyDirective,
    MyCurrencyPipe,
    ApprovedProfileComponent,
    SistemaPinturasComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AutocompleteLibModule
  ],
  providers: [MyCurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}

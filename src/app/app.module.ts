import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Http
import {HttpClientModule} from '@angular/common/http';

// Routes
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProcescoComponent } from './components/procesco/procesco.component';
import { SistemaDeGarantiasComponent } from './components/sistema-de-garantias/sistema-de-garantias.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FaqComponent } from './components/procesco/faq/faq.component';
import { EvaluacionComponent } from './components/procesco/evaluacion/evaluacion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/procesco/login/login.component';
import { RegisterComponent } from './components/procesco/register/register.component';
import { ProfileComponent } from './components/procesco/profile/profile.component';
import { LogoAndSocialComponent } from './components/shared/logo-and-social/logo-and-social.component';
import { TogglesComponent } from './components/shared/toggles/toggles.component';
import { NewProviderComponent } from './components/procesco/new-provider/new-provider.component';
import { UpdateComponent } from './components/procesco/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    ProcescoComponent,
    SistemaDeGarantiasComponent,
    FaqComponent,
    EvaluacionComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    LogoAndSocialComponent,
    TogglesComponent,
    NewProviderComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

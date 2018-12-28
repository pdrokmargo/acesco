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

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    ProcescoComponent,
    SistemaDeGarantiasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

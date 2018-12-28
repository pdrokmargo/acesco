import {Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {ProcescoComponent} from './components/procesco/procesco.component';
import {SistemaDeGarantiasComponent} from './components/sistema-de-garantias/sistema-de-garantias.component';

export const ROUTES: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'procesco', component: ProcescoComponent},
  {path: 'sistemaDeGarantias', component: SistemaDeGarantiasComponent},
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: '**', pathMatch: 'full', redirectTo: 'main'}
];

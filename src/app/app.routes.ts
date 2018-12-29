import {Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {ProcescoComponent} from './components/procesco/procesco.component';
import {SistemaDeGarantiasComponent} from './components/sistema-de-garantias/sistema-de-garantias.component';
import {FaqComponent} from './components/procesco/faq/faq.component';
import {EvaluacionComponent} from './components/procesco/evaluacion/evaluacion.component';
import {ProfileComponent} from './components/procesco/profile/profile.component';

export const ROUTES: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'procesco', component: ProcescoComponent},
  {path: 'sistemaDeGarantias', component: SistemaDeGarantiasComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'evaluacion', component: EvaluacionComponent},
  {path: 'perfil', component: ProfileComponent},
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path: '**', pathMatch: 'full', redirectTo: 'main'}
];

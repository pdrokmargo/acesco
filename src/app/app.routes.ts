import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ProcescoComponent } from './components/procesco/procesco.component';
import { SistemaDeGarantiasComponent } from './components/sistema-de-garantias/sistema-de-garantias.component';
import { FaqComponent } from './components/procesco/faq/faq.component';
import { EvaluacionComponent } from './components/procesco/evaluacion/evaluacion.component';
import { ProfileComponent } from './components/procesco/profile/profile.component';
import { NewProviderComponent } from './components/procesco/new-provider/new-provider.component';
import { UpdateComponent } from './components/procesco/update/update.component';
import { ConfirmationComponent } from './components/shared/confirmation/confirmation.component';
import { StageAComponent } from './components/procesco/stage-a/stage-a.component';
import { StageBComponent } from './components/procesco/stage-b/stage-b.component';
import { AdminComponent } from './components/procesco/admin/admin.component';
import { DescriptionsComponent } from './components/procesco/descriptions/descriptions.component';
import { RoofSimulatorComponent } from './components/roof-simulator/roof-simulator.component';

export const ROUTES: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'procesco', component: ProcescoComponent },
  { path: 'procesco/nuevoProveedor', component: NewProviderComponent },
  { path: 'procesco/nuevoProveedor/descripciones', component: DescriptionsComponent },
  { path: 'procesco/nuevoProveedor/:id', component: NewProviderComponent },
  { path: 'procesco/admin', component: AdminComponent },
  { path: 'procesco/actualizarDatos', component: UpdateComponent },
  { path: 'procesco/confirmacion', component: ConfirmationComponent },
  { path: 'procesco/preseleccionEtapaA', component: StageAComponent },
  { path: 'procesco/preseleccionEtapaA/:id', component: StageAComponent },
  { path: 'procesco/preseleccionEtapaB', component: StageBComponent },
  { path: 'procesco/preseleccionEtapaB/:id', component: StageBComponent },
  { path: 'sistema-de-garantias', component: SistemaDeGarantiasComponent },
  { path: 'simulador-de-cubiertas', component: RoofSimulatorComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'evaluacion', component: EvaluacionComponent },
  { path: 'procesco/perfil', component: ProfileComponent },
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: '**', pathMatch: 'full', redirectTo: 'main' }
];

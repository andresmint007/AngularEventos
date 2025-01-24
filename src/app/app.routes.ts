import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { GestionarEventosComponent } from './gestionar-eventos/gestionar-eventos.component';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gestionEventos', component: GestionarEventosComponent },

];



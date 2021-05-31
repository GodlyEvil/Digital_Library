import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenrePageComponent } from './components/genre-page/genre-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'page/:genre', canActivate: [AuthGuardService], component: GenrePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

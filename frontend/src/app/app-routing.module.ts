import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from './pages/comics/comics.component';
import { ComicComponent } from './pages/comic/comic.component';
import { LogginComponent } from  './pages/loggin/loggin.component';
import { RegisterComponent } from  './pages/register/register.component';
import { AuthGuard } from './servives/auth.guard';
import { FavoriteComicsComponent } from './pages/favorite-comics/favorite-comics.component';

const routes: Routes = [

  { path: 'comics', component: ComicsComponent, canActivate: [AuthGuard] },
  { path: 'favorites', component: FavoriteComicsComponent, canActivate: [AuthGuard] },
  { path: 'comic/:id', component: ComicComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LogginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/comics', pathMatch: 'full' },
  { path: '**', redirectTo: '/comics', pathMatch: 'full' },

];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }

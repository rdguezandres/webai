import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NewPage } from './pages/new/new.page';
import { FavoritesPage } from './pages/fav/fav.page';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'new/:id',
    component: NewPage,
  },
  {
    path: 'favorites',
    component: FavoritesPage,
  },
  {
    path: 'who',
    loadChildren: () => import('./pages/who/who.module').then( m => m.WhoPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';

import {authGuard } from '../authentification/auth.guard';

const routes: Routes = [
  { path: 'products', component: IndexComponent , canActivate: [authGuard]},
  {path: 'home', component: HomeComponent  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

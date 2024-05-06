import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { RegisterComponent } from './components/register/register.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';








const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent },
  {path: 'register', component : RegisterComponent },
  {path: 'varify-email', component : VarifyEmailComponent },
  {path: 'forgot-password', component : ForgetPasswordComponent },
  {path: 'dashboard', component : DashboardComponent },
  {path: 'about', component : AboutComponent },
  {path: 'contact', component : ContactComponent },
  {path: 'product', component : ListProductComponent },
  {path: 'cart', component : CartComponent },
  {path: 'product-detail/:id', component : DetailsProduitComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

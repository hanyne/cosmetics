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
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ListMessageComponent } from './components/list-message/list-message.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';













const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'category/:category', component: CategoryProductsComponent },
  {path: 'login', component : LoginComponent },
  {path: 'register', component : RegisterComponent },
  {path: 'varify-email', component : VarifyEmailComponent },
  {path: 'forgot-password', component : ForgetPasswordComponent },
  {path: 'dashboard', component : DashboardComponent },
  {path: 'about', component : AboutComponent },
  {path: 'contact', component : ContactComponent },
  {path: 'admin/product', component : ListProductComponent },
  {path: 'cart', component : CartComponent },
  {path: 'product-detail/:id', component : DetailsProduitComponent },
  {path: 'product', component : ProductPageComponent },
  { path: 'category/:category/:subcategory', component: CategoryProductsComponent },
  { path: 'category/:category/:subcategory/:subsubcategory', component: CategoryProductsComponent },
  { path: 'admin/dash', component: DashAdminComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'list-message', component: ListMessageComponent },
  { path: 'admin/order-details/:id', component: OrderDetailsComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

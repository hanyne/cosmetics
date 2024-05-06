import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environement } from 'src/environement/environement';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './shared/cart.service';
import { DetailsProduitComponent } from './components/details-produit/details-produit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VarifyEmailComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    AboutComponent,
    NavbarComponent,
    ContactComponent,
    ListProductComponent,
    CartComponent,
    DetailsProduitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environement.firebase),
    FormsModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    HttpClientModule
    
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }

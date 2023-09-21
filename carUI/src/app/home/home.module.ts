import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module';
import { NavComponent } from './Home&Nav Component/nav/nav.component';
import { HomepageComponent } from './Home&Nav Component/homepage/homepage.component';
import { LoginComponent } from './Authentication Component/login/login.component';
import { RentalComponent } from './User Components/rental/rental.component';
import { MyRentalsComponent } from './User Components/my-rentals/my-rentals.component';
import { SuccessComponent } from './EndComponent/success/success.component';
import { AdminViewComponent } from './Admin Components/admin-view/admin-view.component';
import { AdminEditComponent } from './Admin Components/admin-edit/admin-edit.component';
import { AdminAddCarComponent } from './Admin Components/admin-add-car/admin-add-car.component';
import { AdminEditCarComponent } from './Admin Components/admin-edit-car/admin-edit-car.component';
import { AdminCarViewComponent } from './Admin Components/admin-car-view/admin-car-view.component';
import { RegisterUserComponent } from './Authentication Component/register-user/register-user.component';
import { NotAuthorisedComponent } from './EndComponent/not-authorised/not-authorised.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './EndComponent/not-found/not-found.component';


@NgModule({
  declarations: [
    NavComponent,
    HomepageComponent,
    LoginComponent,
    RentalComponent,
    MyRentalsComponent,
    SuccessComponent,
    AdminViewComponent,
    AdminEditComponent,
    AdminAddCarComponent,
    AdminEditCarComponent,
    AdminCarViewComponent,
    RegisterUserComponent,
    NotAuthorisedComponent,
    NotFoundComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule
  ],
  exports:[NavComponent]
})
export class HomeModule { }

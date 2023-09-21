import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { loginAuthGuard } from '../service/gaurds/login-auth.guard';
import { NotAuthorisedComponent } from './EndComponent/not-authorised/not-authorised.component';
import { roleGuard } from '../service/gaurds/role.guard';
import { NotFoundComponent } from './EndComponent/not-found/not-found.component';


const routes: Routes = [
  {path:'home',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegisterUserComponent},
  {path:'rental/:id',component:RentalComponent,canActivate:[loginAuthGuard]},
  {path:'myrentals',component:MyRentalsComponent,canActivate:[loginAuthGuard]},
  {path:'success',component:SuccessComponent,canActivate:[loginAuthGuard]},
  {path:'admin',component:AdminViewComponent,canActivate:[roleGuard]},
  {path:'edit/:id',component:AdminEditComponent,canActivate:[roleGuard]},
  {path:'addcar',component:AdminAddCarComponent,canActivate:[roleGuard]},
  {path:'admincarview',component:AdminCarViewComponent,canActivate:[roleGuard]},
  {path:'editcar/:id',component:AdminEditCarComponent,canActivate:[roleGuard]},
  {path:'notauthorised?@abruptuser',component:NotAuthorisedComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

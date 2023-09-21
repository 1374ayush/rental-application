import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-admin-add-car',
  templateUrl: './admin-add-car.component.html',
  styleUrls: ['./admin-add-car.component.css']
})
export class AdminAddCarComponent {

  constructor(private service:ServicesService,private route:Router,private toastr:ToastrService){}

  addform=new FormGroup({
    carModel:new FormControl("",[Validators.required,Validators.maxLength(100),Validators.minLength(1)]),
    carMaker:new FormControl("",[Validators.required,Validators.maxLength(255)]),
    carRentalPrice:new FormControl("",[Validators.required,Validators.max(100000)]),
  });
  
  
addSubmitted(){

  this.service.addCar(
    [this.addform.value. carModel,
      this.addform.value.carMaker,
      this.addform.value. carRentalPrice
      ]
  ).subscribe((val:any)=>{
  //console.log(val);
  this.toastr.info("CarHub App","New Car Added",{
    positionClass: 'toast-bottom-center'
  })
  this.route.navigate([`admincarview`]);
  }
    )
}
  // console.log("Ayush is here")
get CarModel():FormControl{
  return this.addform.get("carModel") as FormControl
}
get CarMaker():FormControl{
  return this.addform.get("carMaker") as FormControl
}
get CarRentalPrice():FormControl{
  return this.addform.get("carRentalPrice") as FormControl
}

checkAdmin():any{
  return this.service.checkAdmin();
}

}

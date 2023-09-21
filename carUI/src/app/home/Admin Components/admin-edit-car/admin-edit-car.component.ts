import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-admin-edit-car',
  templateUrl: './admin-edit-car.component.html',
  styleUrls: ['./admin-edit-car.component.css']
})
export class AdminEditCarComponent implements OnInit {
  carData:any={carModel:"none",carMaker:"none",carRentalPrice:10};
  id:any;
  idd:any;
  constructor(private service:ServicesService,private route:Router,private activatedRoute:ActivatedRoute,private toastr:ToastrService){}

  ngOnInit():void {
    this.getCar();
  }

  getCar():any{
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.idd=parseInt(this.id,10);
    this.service.particularCar(this.idd).subscribe((data:any)=>{
      //console.log(data);
      this.carData=data;
    })
  }

  editform=new FormGroup({
    carModel:new FormControl("",[Validators.required,Validators.maxLength(100),Validators.minLength(1)]),
    carMaker:new FormControl("",[Validators.required,Validators.maxLength(255)]),
    carRentalPrice:new FormControl("",[Validators.required,Validators.max(100000)])
  });
  
  
editSubmitted(){
  this.service.editCar(
    [this.idd,
      this.editform.value.carModel,
      this.editform.value.carMaker,
      this.editform.value.carRentalPrice
      ]
  ).subscribe((val:any)=>{
 // console.log(val);
  this.toastr.info("CarHub App"," Car Edited",{
    positionClass: 'toast-bottom-center'
  })
  this.route.navigate([`admincarview`]);
  }
  )
}

get CarModel():FormControl{
  return this.editform.get("carModel") as FormControl
}
get CarMaker():FormControl{
  return this.editform.get("carMaker") as FormControl
}
get CarRentalPrice():FormControl{
  return this.editform.get("carRentalPrice") as FormControl
}


checkAdmin():any{
  return this.service.checkAdmin();
  }
}

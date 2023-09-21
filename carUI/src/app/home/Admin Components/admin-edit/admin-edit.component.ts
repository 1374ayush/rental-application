import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  data:any;
  id:any;
  idd:any;
  days:any=0;
  cost:any;
  totalCost:any=0;
  accept:any=true;

  constructor(private service :ServicesService, private activatedRoute:ActivatedRoute,private route:Router,private toastr:ToastrService){}

  ngOnInit(): void {
    this.particularRental();
    this.totalCost=this.data.totalCost;
    this.days=this.data.duration;
  }

  Dayform=new FormGroup(
    {
      days:new FormControl("",[Validators.required,Validators.max(100),Validators.min(1)])
    }
  );
  get Days():FormControl{
    return this.Dayform.get("days") as FormControl
  }
  DaySubmitted(){
    this.days=this.Dayform.value.days;
    this.totalCost=this.cost * this.days;
    this.accept=false;
  }
  
  acceptButton(){
   this.data.duration=this.days;
   this.data.totalCost=this.totalCost

   this.service.editRentalData(this.data).subscribe((response:any)=>{
    // console.log(response);
    this.toastr.info("CarHub App","Agreement Updated",{
      positionClass: 'toast-bottom-center'
    })
   })
  }
  
  particularRental(){
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.idd=parseInt(this.id,10);
    this.service.particularRentalList(this.idd).subscribe((data:any)=>{
      if(data==null){
        this.route.navigate([`admin`]);
      }
      this.data=data;
      this.cost=data.totalCost/data.duration;
        // console.log("Ayush is here")
    })

  }
  checkAdmin():any{
    return this.service.checkAdmin();
  }
}

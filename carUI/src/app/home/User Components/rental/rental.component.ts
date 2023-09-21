import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit, OnChanges {   
   id:any;
  idd:number;
  carData:any;
  data:any;
  days:any=0;
  @Input()totalCost:any;
  fullDate:any=new Date()
  date:any;
  month:any;
  year:any;
  rentDate:any;
  rentPrice:any=0;
  accept:boolean=true;
  email:any;
  constructor(private service:ServicesService, private activatedRoute:ActivatedRoute,private route:Router){
    this.idd=1;
    this.totalCost=0;
    this.date=this.fullDate.getDate().toString();
    this.month=(this.fullDate.getMonth()+1).toString();
    this.year=this.fullDate.getFullYear().toString();
    this.rentDate=this.date+"/"+this.month+"/"+this.year;
   // console.log(this.rentDate);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.days);
    if(changes['totalCost']){
      this.totalCost=changes['message'].currentValue;
    }
  }

  ngOnInit(): void {
    this.getCars();
    //console.log(this.accept);
    this.email=localStorage.getItem("email");
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
    this.rentPrice=this.carData.carRentalPrice;
    this.totalCost=this.carData.carRentalPrice * this.days;
    this.accept=false;
  }
  acceptButton(){
    let token=localStorage.getItem("access_token")
    let email=localStorage.getItem("email")
    this.service.addRentalDetail([this.carData.id,token,this.days,this.totalCost,this.carData.carMaker,this.carData.carModel,email,this.rentDate]).subscribe((response:any)=>{
      console.log(response);
    })
    this.route.navigate([`success`])
  }

  checkLogin():any{
    //console.log(this.service.checkLogin())
    if(this.service.checkLogin()!=null)
      return true;
    return false;
  }


  getCars():any{
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.idd=parseInt(this.id,10);
    this.service.particularCar(this.idd).subscribe((data:any)=>{
      console.log(data);
      this.carData=data;
    })
  }
  
}

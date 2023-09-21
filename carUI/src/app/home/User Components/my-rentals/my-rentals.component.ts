import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-my-rentals',
  templateUrl: './my-rentals.component.html',
  styleUrls: ['./my-rentals.component.css']
})
export class MyRentalsComponent implements OnInit,OnChanges {

  @Input() rentalData:any;

  constructor(private service:ServicesService , private route:Router,private toastr: ToastrService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.rentalData=changes['rentalData'].currentValue
  }

  ngOnInit(): void {
    this.userRentalData();
  }

  userRentalData(){
    this.service.userRentalData().subscribe((data:any)=>{
      console.log(data);
      this.rentalData=data;
    })
  }

  returnRequest(carid:any){
    this.service.returnRequest(carid).subscribe((response:any)=>{
      console.log(response);
      this.userRentalData();
      this.toastr.info("CarHub App","Initiated Return Request",{
        positionClass: 'toast-bottom-center'
      })
    let accc=localStorage.getItem("access_token");
    this.route.navigate([`myrentals`]);
    })
  }

  noData(){
    console.log(this.rentalData.length)
    if(this.rentalData==undefined || this.rentalData.length==0)
      return true;
    return false;
  }
  
  }


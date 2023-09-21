import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-admin-car-view',
  templateUrl: './admin-car-view.component.html',
  styleUrls: ['./admin-car-view.component.css']
})
export class AdminCarViewComponent implements OnInit{
  carData:any;
  rentedCarData:any;
  constructor(private service:ServicesService,private route:Router,private toastr:ToastrService){}
  
   ngOnInit(): void {
    this.getCars();
    this.getRentedCar();
  }

  getCars():any{
    this.service.getAllCars().subscribe((data:any)=>{
      //console.log(data);
      this.carData=data;
    })
  }

  deleteCar(carid:any){
    this.service.delteCars(carid).subscribe((response:any)=>{
     // console.log(response);
      this.getCars();
      this.toastr.info("CarHub App","Car Delted",{
        positionClass: 'toast-bottom-center'
      })
      this.route.navigate([`admincarview`])
    })
  }

  getRentedCar() {
    this.service.getRentedCar().subscribe((data: any) => {
      this.rentedCarData = data;
    })
  }

  checkAdmin():any{
    return this.service.checkAdmin();
  }
  noData(){
    console.log(this.carData.length)
    if(this.carData==undefined || this.carData.length==0)
      return true;
    return false;
  }

  noRentedData(){
    console.log(this.rentedCarData.length)
    if(this.rentedCarData==undefined || this.rentedCarData.length==0)
      return true;
    return false;
  }
}

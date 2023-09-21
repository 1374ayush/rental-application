import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  data:any=[];

  constructor(private service:ServicesService, private route:Router,private toastr:ToastrService){}
  ngOnInit(): void {  
    this.rentalList();
    this.noData();
  }

  rentalList(){
    this.service.allRentalList().subscribe((data:any)=>{
    //  console.log(data);
      this.data=data;
    })
  }
  deleteButton(Carid:any){
    this.service.deleteRental(Carid).subscribe((response:any)=>{
      this.rentalList();
      this.toastr.info("CarHub App","Rent Agreement Deleted",{
        positionClass: 'toast-bottom-center'
      })
      this.route.navigate([`admin`])
    })
      // console.log("Ayush is here")
  }
  returnButton(Carid:any){
    this.service.deleteRental(Carid).subscribe((response:any)=>{
      this.rentalList();
      this.toastr.info("CarHub App","Car Returned",{
        positionClass: 'toast-bottom-center'
      })
      this.route.navigate([`admin`])
    })
  }
  checkAdmin():any{
    return this.service.checkAdmin();
  }
  noData(){
    console.log(this.data.length)
    if(this.data==undefined || this.data.length==0)
      return true;
    return false;
  }
}

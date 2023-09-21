import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  carData: any;
  rentedCarData: any
  filteredCar: any = []
  filteredRentedCar: any = []
  searchForm = new FormGroup(
    {
      searchTerm: new FormControl('')
    }
  )
  constructor(private service: ServicesService, private route: Router) {

  }

  ngOnInit(): void {
    const email = localStorage.getItem("email");
    if (email == "admin@official.com") {
      this.route.navigate([`admin`])
    } else {
      this.getCars();
      this.getRentedCar();
    }
  }

  getCars(): any {
    this.service.getAllCars().subscribe((data: any) => {
      //console.log(data);
      this.carData = data;
      this.filteredCar = data;//at the start all cars are available
      this.searchForm.valueChanges.subscribe(() => {
        this.updateFilteredCar();
      })

    })
  }
  getRentedCar() {
    this.service.getRentedCar().subscribe((data: any) => {
      this.rentedCarData = data;
      this.filteredRentedCar = data; //at start all rented cars will be displayed.
    })
  }

  updateFilteredCar() {
    const searchItem = this.searchForm.value.searchTerm
    console.log(searchItem)
    //filter for available cars
    this.filteredCar = this.carData.filter((item: any) =>
      item.carMaker.toString().toLowerCase().includes(searchItem?.toString().toLowerCase()) || item.carModel.toString().toLowerCase().includes(searchItem?.toString().toLowerCase()) || item.carRentalPrice.toString().toLowerCase().includes(searchItem?.toString().toLowerCase())
    )

    //filter for rented cars
    this.filteredRentedCar = this.rentedCarData.filter((item: any) =>
      item.carMaker.toString().toLowerCase().includes(searchItem?.toString().toLowerCase()) || item.carModel.toString().toLowerCase().includes(searchItem?.toString().toLowerCase()) || item.carRentalPrice.toString().toLowerCase().includes(searchItem?.toString().toLowerCase())
    )
  }

  checkAdmin(): any {
    return this.service.checkAdmin();
  }
  checkLogin(): any {
    if (this.service.checkLogin() != null) {
      return true;
    }
    return false;
  }
  noRentedData(){
    if((this.filteredRentedCar==undefined || this.filteredRentedCar.length==0) && (this.carData==undefined || this.carData.length==0))
      return true;
    return false;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService implements OnInit {

  constructor(private http:HttpClient) { }
  url:string="https://localhost:7296/api/Car/"

  //return all data of cars
  getAllCars():any{
    return this.http.get(this.url+"GetData");
  }

  getRentedCar(){
    return this.http.get(this.url+"GetRentedData");
  }

  //checl login
  loginUser(user: Array<any>):any{
    return this.http.post(this.url+"Login",
    {
      email:user[0],
      pwd:user[1]
    },{responseType:'text'})
  }

  registerUser(user:Array<any>){
    // console.log("Ayush is here")
    return this.http.post(this.url+"SignUp",{
      userName:user[0],
      email:user[1],
      password:user[2]
    },{responseType:'text'})
  }

  // ###############localStorage################################################LocalStorage
  setToken(data:Array<any>) {
    localStorage.setItem("access_token", data[0]);
      // console.log("Ayush is here")
    localStorage.setItem("email", data[1]);
  }
  checkLogin(){
    return localStorage.getItem("access_token");
  }
  checkAdmin(){
    if(localStorage.getItem("email")=="admin@official.com")
        return true;
      return false;
  }
  removeToken(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
  }

  particularCar(id:any){
    return this.http.get(this.url+"CarDetail?id="+id)
  }

  //Add rental detail
  addRentalDetail(user:Array<any>){
    return this.http.post(this.url+"AddRental",{
      carId: user[0],
      userId:user[1],
      duration: user[2],
      totalCost: user[3],
      carMaker:user[4],
      carModel:user[5],
      email:user[6],
      userRequest: false,
      returned: user[7]
    },{responseType:'text'})
  }

  //user Rental Data
  userRentalData(){
    let userId=this.checkLogin();
    return this.http.get(this.url+"UserRentalData/?id="+userId);
  }

  //request return
  returnRequest(carid:any){
    return this.http.put(this.url+"ReturnRquest?Carid="+carid,carid);
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ###############Admin######################Admin######################Admin############
  allRentalList(){
    return this.http.get(this.url+"RentalDataList")
  }
  particularRentalList(carid:any){
    return this.http.get(this.url+"particularRent?carid="+carid);
  }
    // console.log("Ayush is here")
  editRentalData(data:any){
    return this.http.put(this.url+"EditRental",data);
  }
  deleteRental(Carid:any){
    return this.http.put(this.url+"AdminDeleteRental?carId="+Carid,Carid,{responseType:'text'});
  }
  addCar(data:Array<any>){
    return this.http.post(this.url+"AddCars",{
      carModel:data[0],
      carMaker:data[1],
      carRentalPrice:data[2],
      carStatus:true
    },{responseType:'text'});
  }
  editCar(data:Array<any>){
    console.log(typeof(data[4]))
    if(data[4]=="false")
        data[4]=false;
    else
      data[4]=true;

    return this.http.put(this.url+"update",{
      id:data[0],
      carModel:data[1],
      carMaker:data[2],
      carRentalPrice:data[3],
      carStatus:true
    },{responseType:'text'});
  }
  delteCars(Carid:any){
    return this.http.delete(this.url+"delete?carId="+Carid);
  }
}

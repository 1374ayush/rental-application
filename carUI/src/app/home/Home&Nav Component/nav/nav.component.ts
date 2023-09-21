import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/service/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userId:any;
  email:any;
  constructor(private service:ServicesService,private route:Router){}
  ngOnInit(): void {
    this.checkLogin();
    this.checkAdmin();
  }

  checkLogin():any{
    //console.log(this.service.checkLogin())
    if(this.service.checkLogin()!=null){
      this.email=localStorage.getItem("email");
      this.userId=this.service.checkLogin();
      return true;
    }
      return false;
  }

  checkAdmin():any{
    return this.service.checkAdmin();
  }

  userLogin():any{
    this.route.navigate([`login`]);
  }

  userLogout():any{
    console.log("logout")
    this.service.removeToken();
    this.route.navigate([`home`]);
  }
}

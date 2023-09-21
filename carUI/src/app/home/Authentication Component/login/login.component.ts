import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/service/services.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public _displayMsg:any;
  
  constructor(private _service:ServicesService, private route:Router,private toastr: ToastrService){}
  ngOnInit(): void {
    
  }

  loginform=new FormGroup(
    {
      email:new FormControl("",[Validators.required,Validators.email]),
      pwd:new FormControl("",[Validators.required,Validators.minLength(6),Validators.maxLength(10)])
    }
  );

  get Email():FormControl{
    return this.loginform.get("email") as FormControl
  }
  get PWD():FormControl{
    return this.loginform.get("pwd") as FormControl
  }

  LoginSubmitted()
  {
      this._service.loginUser( 
        [this.loginform.value.email,this.loginform.value.pwd]
        ).subscribe((data:any)=>{
        if(data==-1)
        {
          this.toastr.error("CarHub App","Invalid Credentials");
        }
        else
        {
          this._service.setToken([data,this.loginform.value.email]);
          this.toastr.success("CarHub App","Login Successfull");
          this.route.navigate(['/home']);
        }
    });
  }

  checkLogin():any{
    if(this._service.checkLogin()!=null){
      return true;
    }
      return false;
  }
}

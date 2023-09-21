import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/service/services.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  public _displayMsg: any;
  _repeatPass: string = 'none';
  constructor(private service: ServicesService, private route: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  registerform = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z].*')]),
    lastname: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern('[A-Za-z].*')]),
    email: new FormControl("", [Validators.required]),
    mobile: new FormControl("", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10)]),
    gender: new FormControl("", [Validators.required]),
    pwd: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    rpw: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  });

  registerSubmitted(): any {
    console.log(this.registerform);
    if (this.registerform.value.rpw != "" && (this.registerform.value.rpw == this.registerform.value.pwd)) {
      this.service.registerUser([this.registerform.value.firstname,
      this.registerform.value.email,
      this.registerform.value.pwd
      ]).subscribe((data: any) => {
        if(data=="User Registered")
          this.toastr.success("CarHub App","User Added Successfully")
          
        else
          this.toastr.error("CarHub App","User Already Exist")
        this._repeatPass='none';
      })
    }
    else{
      this._repeatPass='inline';
    }
  }

  get FirstName(): FormControl {
    return this.registerform.get("firstname") as FormControl
  }
  get LastName(): FormControl {
    return this.registerform.get("lastname") as FormControl
  }
  get Email(): FormControl {
    return this.registerform.get("email") as FormControl
  }
  get Gender(): FormControl {
    return this.registerform.get("gender") as FormControl
  }
  get Mobile(): FormControl {
    return this.registerform.get("mobile") as FormControl
  }
  get PWD(): FormControl {
    return this.registerform.get("pwd") as FormControl
  }

}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Storage } from '@ionic/storage';
import { LoginService } from "../service/login.service";
import { User } from '../entity/user';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  emailRegex = "[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}";
  userList: User[];
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4)]]
    });
  }

  getUserList() {
    this.loginService.getUserInfo().subscribe(
      (data: User[]) => {
        this.userList = data;
      }
    );
  }

  onSubmit(value) {
    if (this.loginForm.valid) {
      console.log(value);
      if(this.userList.length){
        for (let i = 0; i < this.userList.length; i++) {
          if(this.userList[i].email === value.email && this.userList[i].password === value.password){
          // set a key/value
          this.storage.set('role', this.userList[i].role);
            this.router.navigate(['/dashboard']);
          }
        }
      }
      
    }
  }

  ngOnInit() {
    this.getUserList();
  }
}

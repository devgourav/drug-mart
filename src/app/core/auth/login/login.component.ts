import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Auth } from '../../model/auth.model';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  auth: Auth = new Auth();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  loginInputForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  fetchUserDetails(){
    this.auth = Object.assign({},this.loginInputForm.value);
  }

  loginUser(event){
    event.preventDefault()
    this.fetchUserDetails()
    this._authService.getUserById(this.auth);
    console.log(this.auth.username,this.auth.password);
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { WindowService } from './core/service/window.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'drug-mart';
  phoneNumber: string;
  verificationCode: string;
  user: any;
  confirmationResult: auth.ConfirmationResult;
  recaptchaVerifier: auth.RecaptchaVerifier;
  windowRef: Window;

  constructor(public auth: AuthService,private _windowService:WindowService) {
    this.windowRef = this._windowService.getWindowRef();
  };
  ngOnInit(){
  }

  ngAfterViewInit(){
    this.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container',{
      'size':'invisible',
      'callback':function(response){
        this.onSignInSubmit();
      },
      'expired-callback':()=>{
        console.error("Recaptcha expired...Solve again")
      }
    })
    this.recaptchaVerifier.render();
  }

  onSignInSubmit(){
      const appVerifier = this.recaptchaVerifier;
      const phoneNumber = "+91"+this.phoneNumber;

      auth().signInWithPhoneNumber(phoneNumber,appVerifier)
      .then((confirmationResult)=>{
        // this.windowRef.confirmationResult = confirmationResult;
      }).catch((error)=> console.error(error,))


  }

  sendLoginCode(){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumber = "+91"+this.phoneNumber;
    auth().signInWithPhoneNumber(phoneNumber,appVerifier).then(
      result=>{
        window
      }).catch(
        error => console.log(error)
      );
  }

  verifyLoginCode(){
    this.confirmationResult.confirm(this.verificationCode)
    .then( result => {
      this.user = result.user;
    }).catch(error => {
      console.error(error,"Invalid Code Eneterd");
    })
  }

}

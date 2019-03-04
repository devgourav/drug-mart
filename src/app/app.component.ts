import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { auth } from 'firebase';
import { UserService } from './core/service/user.service';
import { User, Roles } from './core/model/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'drug-mart';
  phoneNumber: string = "";
  verificationCode: string = "";
  user: any;
  confirmationResult: auth.ConfirmationResult;
  recaptchaVerifier: auth.RecaptchaVerifier;

  credential: auth.AuthCredential;
  roles: Roles;

  constructor(public _authService: AuthService) {
  };
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': function(response) {
        this.onSignInSubmit();
      },
      'expired-callback': () => {
        console.error("Recaptcha expired...Solve again")
      }
    })
    this.recaptchaVerifier.render();
  }

  onSignInSubmit() {
    const appVerifier = this.recaptchaVerifier;
    const INDIA_COUNTRY_CODE = "91";
    const phoneNumber = `+${INDIA_COUNTRY_CODE + this.phoneNumber}`
    console.log(phoneNumber);
    console.log(appVerifier);

    auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
      }).catch(
        (error) => console.error("onSignInSubmitIn", error)
      )
  }

  verifyLoginCode(){
    this.credential = auth.PhoneAuthProvider.credential
    (this.confirmationResult.verificationId,this.verificationCode.toString());

    auth().signInAndRetrieveDataWithCredential(this.credential)
    .then(result => {
      this.user = this._authService.updateUserData(result.user)
      console.log(this.user);
    }).catch( error=> {
      console.error(error, "Invalid Code Entered");
    })

  }

}

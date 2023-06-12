import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log("Felicitaciones te has logeado existosamente!");
      })
      .catch((error) => {
        // Handle login error
        console.log(error);
      });
  }

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        // Registration successful, perform necessary actions (e.g., redirect to another page)
      })
      .catch((error) => {
        // Handle registration error
        console.log(error);
      });
  }
}


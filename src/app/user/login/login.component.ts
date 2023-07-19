import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AngularFireAuth){}
  credentials = {
    email: '',
    password: ''
  }

  showAlert: boolean = false;
  alertMsg: string = "Please Wait! You are logging in ";
  alertColor = "blue"
  inSubmission = false


  async login(){
    this.showAlert = true;
    this.alertMsg = "Please Wait! You are logging in ";
    this.alertColor = "blue"
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password)
    } catch (error) {
      this.inSubmission = false;
      this.alertMsg = "An unexpected error occures. Please try again later"
      this.alertColor = 'red'
      this.showAlert = true
      return
    }
    this.showAlert
    this.alertMsg = "Success! You are logged in."
    this.alertColor = 'green'
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private emailTaken: EmailTaken
    ){ }

  inSubmission = false;

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])

  email= new FormControl('',[
    Validators.required,
    Validators.email
  ], [this.emailTaken.validate])

  age= new FormControl<number | null>(null,[
    Validators.required,
    Validators.min(12),
    Validators.max(50)
  ])

  password= new FormControl('',[
    Validators.required,
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  ])

  confirmPassword= new FormControl('',[
    Validators.required
  ])

  phoneNumber= new FormControl('',[
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10)
  ])

  showAlert: boolean = false;
  alertMsg: string = "Please Wait! Your Account is being Created";
  alertColor = "blue"

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  }, [RegisterValidators.match('password', 'confirmPassword')])
  

  onSubmit(){
    console.log(this.registerForm.valid)
    console.log(this.registerForm.value)
  }

  async register(){
    this.showAlert = true
    this.alertMsg = "Please Wait! Your Account is being Created"
    this.alertColor = 'blue'
    this.inSubmission = true;

    const { email, password } = this.registerForm.value;
    try {
      this.auth.createUser(this.registerForm.value as IUser)
    } catch (e) {
      console.log(e)
      this.alertMsg = "An unexpected error occures. Please try again later"
      this.alertColor = 'red'
      this.inSubmission = false;
      return
    }

    this.alertMsg ='Success ! Your account has been created.';
    this.alertColor = 'green'
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, this.isValidPassword])
    });
  }

  isValidPassword(control: FormControl): ValidationErrors {
    if(!(new String(control.value).match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})'))) {
      return {'invalidPassword': true};
    }
  }

  onSubmit() {
    this.http.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(data => {
      if(data) {
        this.router.navigate(['/home']);
      }
    }, error => {
      console.log('Error', error);
    }, () => {
      console.log('Authentication Completed')
    })
  }

}

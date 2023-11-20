import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private FirebaseService: FirebaseService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.FirebaseService.login(this.formLogin.value)
      .then(response => {
        this.router.navigate(['/main']);
      })
      .catch(error => console.log(error));
  }

}
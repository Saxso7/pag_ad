import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  data: any; 
  
  users: any =[];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private api: ApiService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.user.getUser().subscribe((response) => {
      this.users = Object.values(response);
      console.log(this.users);
    })
  }

  userRole: string | undefined; // Simula el rol del usuario (puedes obtenerlo de tu sistema de autenticación)
  

  // Función para verificar si el usuario tiene el rol "admin"
  isUserAdmin(): boolean {
    return this.userRole === 'admin';
  }

}
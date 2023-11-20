import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private FirebaseService: FirebaseService,
    private router: Router
  ) { }

  // Método para eliminar el token del localStorage
  eliminarToken(): void {
    localStorage.removeItem('jwtToken');
  }


  ngOnInit() {


  }
  isLoginPage(): boolean {
    // Verifica si la ruta actual corresponde al componente de inicio de sesión
    return this.router.url === '/login';
  }

  onClick() {
    this.eliminarToken();
    this.FirebaseService.logout()
      .then(() => {
        console.log('Sesion cerrada');
      })
      .catch(error => console.log(error));
  }

}

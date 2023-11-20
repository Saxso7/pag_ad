import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';

import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges{
  data: any; 
  
  users: any =[];

  constructor(
    private api: ApiService,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.user.getUser().subscribe((response) => {
      this.users = Object.values(response);
      console.log(this.users);
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['users']) {
      this.users = [...this.users];
    }
  }
  

  eliminarUsuario(userId: string): void {
    this.user.deleteUserWithHeader(userId).subscribe(
      (response) => {
        // Manejar la respuesta del servidor
        if (response.success) {
          // Usuario eliminado con éxito
          console.log('Usuario eliminado con éxito.')
          // Actualiza la lista de usuarios para reflejar la eliminación
          this.user.eliminarUsuarioDeFirebaseAuth().subscribe(
            () => {
              console.log('Usuario eliminado con éxito de Firebase Authentication.');
            },
            (error) => {
              console.error('Error al eliminar el usuario de Firebase Authentication:', error);
            }
            
          );
        } else {
          // Error al eliminar el usuario
          console.error('Error al eliminar el usuario:', response.error);
        }
      },
      (error) => {
        // Manejar errores de la solicitud HTTP
        console.error('Error al realizar la solicitud HTTP:', error);
      }
    );
  }
  
  

}

import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetUser = 'http://127.0.0.1:5000/user';

  constructor(private http: HttpClient,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth
) {}

  private getHeaders(): HttpHeaders {
    // Accede al token del servicio firebaseService
    const userToken = this.firebaseService.getUserToken();

    if (userToken) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      });
      return headers;
    } else {
      throw new Error('No se encontró un token de usuario.');
    }
  }
  getUser() {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    // Realiza una solicitud GET a la API con los encabezados
    return this.http.get(`${this.apiGetUser}/get`, { headers });
    
  }
  // Actualizar un usuario existente
  updateUser(userId: string, userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiGetUser}/put/${userId}`, userData, { headers });
  }

  // Eliminar un usuario con encabezado (header) que incluye el token JWT
  deleteUserWithHeader(userId: string): Observable<any> {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    
    // Realiza una solicitud DELETE a la API con los encabezados
    return this.http.delete(`${this.apiGetUser}/delete/${userId}`, { headers });
  }

  // Eliminar un usuario sin encabezado (header)
  deleteUserWithoutHeader(userId: string): Observable<any> {
    // Realiza una solicitud DELETE a la API sin encabezado
    return this.http.delete(`${this.apiGetUser}/delete/${userId}`);
  }

  // Elimina el usuario de Firebase Authentication
  eliminarUsuarioDeFirebaseAuth(): Observable<void> {
    return new Observable<void>((observer) => {
      this.afAuth.currentUser.then((user) => {
        if (user) {
          user
            .delete()
            .then(() => {
              observer.next();
              observer.complete();
            })
            .catch((error) => {
              observer.error(error);
            });
        }
      });
    });
  }


  // Buscar un usuario por ID
  getUserById(userId: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiGetUser}/get/${userId}`, { headers });
  }

  
}

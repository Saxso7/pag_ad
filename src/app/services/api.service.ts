import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPostUser = 'http://127.0.0.1:5000/user/post';
  private apiGetUser = 'http://127.0.0.1:5000/user';
  private apiGetDiet = 'http://127.0.0.1:5000/diet';
  private apiGetGymAss = 'http://127.0.0.1:5000/gym';

  constructor(private http: HttpClient,
              private firebaseService: FirebaseService,
              private afAuth: AngularFireAuth
    ) {}

  // Método para obtener encabezados HTTP con el token JWT
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
  
  getGym(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    return this.http.get(`${this.apiGetGymAss}/get`, { headers });
  }
  getDiet(){
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();
    console.log(headers)
    // Realiza una solicitud GET a la API con los encabezados
    //return this.http.get(this.apiGetUser);
    return this.http.get(`${this.apiGetDiet}/get`, { headers });
  }

  

  // Realiza una solicitud POST con el token JWT incluido
  postUser(form: any) {
    // Obtiene los encabezados que incluyen el token JWT
    const headers = this.getHeaders();

    // Realiza una solicitud POST a la API con los encabezados
    return this.http.post(this.apiPostUser, form, { headers });
  }

  


  
}
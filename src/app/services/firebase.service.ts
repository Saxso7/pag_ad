import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, getAuth } from '@angular/fire/auth';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private userToken: string | null = null;

  private userEmail: string | null = null;


  constructor(private auth: Auth) { 
  }



  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(user: User): Promise<string | null> {
    try {
      const result = await signInWithEmailAndPassword(getAuth(), user.email, user.password);
      if (result.user) {
        // Inicio de sesión exitoso
        // Accede al token JWT
        const userToken = await result.user.getIdToken();

        // Almacena el token en una propiedad del servicio
        this.userToken = userToken;
        console.log(this.userToken)

        this.userEmail = user.email;

        // Muestra el token JWT en la consola solo en un entorno de desarrollo

        this.userToken = this.userToken;
        this.guardarToken(this.userToken);



        // Devuelve el token JWT
        return userToken;
      } else {
        throw new Error('No se encontró un usuario después del inicio de sesión.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para que se maneje en el componente
    }


  }

  isAuthenticated(): boolean {
    const user = getAuth().currentUser;
    return !!user;
  }



  // Método para obtener el token (puedes llamar a este método desde otros componentes o servicios)
  getUserToken(): string | null {
    return this.userToken;
  }
  public guardarToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  // Obtener la instancia de autenticación de Firebase
  getAuth() {
    return getAuth();
  }

}

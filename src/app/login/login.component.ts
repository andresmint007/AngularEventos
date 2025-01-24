import { Component,inject  } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Router } from '@angular/router';  
import {AuthService} from '../services/api/api/auth.service'
import {UsuarioService} from '../services/api/api/usuario.service'
import {AuthServiceJwt} from '../services/ownServices/auth.servicejwt'
import { LoginApp, Usuario, UsuarioRespuestaGeneral } from '../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private apiServiceLogin = inject(AuthService);  
  private apiServiceUsers = inject(UsuarioService); 

  username: string = '';
  password: string = '';
  constructor(private router: Router,private authServiceJwt: AuthServiceJwt) {
  } 

  onLogin(): void {
    this.loginApp(this.username,this.password)    
  }
  loginApp(email:string, password:string){
    const loginData: LoginApp = {};
    loginData.email=email,
    loginData.password=password,
    loginData.username =email,
    this.apiServiceLogin.apiAuthLoginPost(loginData, 'response').subscribe(
      (response:any) => {
        console.log('Full Response (response):', response);
        const token = response.body["token"]; 
        this.authServiceJwt.saveToken(token);
        this.guardarUsuario(email);
        this.router.navigate(["/home"]);
      },
      (error) => {
        alert('Error: '+ error["error"]["error"]);
      }
    );
  }
guardarUsuario(email:string){
  this.apiServiceUsers.apiUsuarioObtenerUsuarioEmailGet( email, 'response').subscribe(
    (response) => {
      const idUsuario = response.body?.data?.idUsuario ?? 0;
      this.authServiceJwt.saveUser(idUsuario);
    },
    (error) => {
      alert('Error: '+ error["error"]["error"]);
    }
  );
} 
}
 


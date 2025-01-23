import { Component,inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Para usar ngModel en el formulario
import { RouterModule, Router } from '@angular/router';  // Importa Router y RouterModule
import { EventosService } from '../services/api/api/eventos.service';  // Asegúrate de importar el servicio correcto
import { API_CONFIG } from '../app.config';  // Importa tu archivo de configuración

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private apiService = inject(EventosService);  // Inyectamos el servicio de la API

  username: string = '';
  password: string = '';
  constructor(private router: Router) {
  }  // Inyecta Router

  onLogin(): void {
    // Lógica simple de validación para el login
    if (this.username === 'admin' && this.password === 'admin') {
      this.obtenerEventos()
      //this.router.navigate(['/home']);  // Redirige a la ruta '/home'
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
  obtenerEventos() {
    this.apiService.apiEventosObtenerEventosGet().subscribe(
      (data) => {
       console.log(data)
      },
      (error) => {
        console.error('Error al obtener eventos:', error);
      }
    );
  }
}

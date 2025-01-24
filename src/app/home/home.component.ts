import { Component,ViewChild ,inject } from '@angular/core';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { RouterModule, Router } from '@angular/router';  
import {AuthServiceJwt} from '../services/ownServices/auth.servicejwt'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalCreateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private jwtService = inject(AuthServiceJwt); 
  
  @ViewChild(ModalCreateComponent) modal!: ModalCreateComponent; // Referencia del modal

  constructor (private router: Router){

  }
  abrirModal() {
    // Asegúrate de que la referencia modal esté disponible
    if (this.modal) {
      this.modal.mostrarModal();  // Llamada a mostrarModal
    } else {
      console.error('Modal no encontrado');
    }
  }

  crearRegistro() {
    // Lógica para crear registro
    console.log('Crear registro');
  }

  revisarRegistros() {
    this.router.navigate(["gestionEventos"])
  }
  procesarRegistro(registro: any) {
    console.log('Nuevo registro creado:', registro);
    // Aquí puedes enviar el registro a tu servicio o hacer algo con los datos
  }
  cerrarSesion() {
    this.jwtService.logout(); // Método para cerrar sesión en el servicio de autenticación
    this.router.navigate(['/']); // Redirige al usuario a la página de inicio de sesión
  }
}

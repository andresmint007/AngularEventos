import { Component,ViewChild  } from '@angular/core';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ModalCreateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(ModalCreateComponent) modal!: ModalCreateComponent; // Referencia del modal

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
    // Lógica para revisar registros
    console.log('Revisar registros');
  }
  procesarRegistro(registro: any) {
    console.log('Nuevo registro creado:', registro);
    // Aquí puedes enviar el registro a tu servicio o hacer algo con los datos
  }
}

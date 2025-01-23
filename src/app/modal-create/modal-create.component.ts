import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas estructurales como ngIf

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.css'
})
export class ModalCreateComponent {
  isModalVisible = false;
  registro = {
    nombre: '',
    edad: '',
    estatura: ''
  };

  @Output() registroCreado = new EventEmitter<any>();

  mostrarModal() {
    this.isModalVisible = true;
    setTimeout(() => {
      // Después de un pequeño retraso, aplicamos la clase `show`
      const modal = document.querySelector('.modal');
      const overlay = document.querySelector('.modal-overlay');
      if (modal && overlay) {
        modal.classList.add('show');
        overlay.classList.add('show');
      }
    }, 10);
  } // Retardo pequeño para asegurar que las transiciones funcionen  }

  cerrarModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.modal-overlay');
    if (modal && overlay) {
      modal.classList.remove('show');
      overlay.classList.remove('show');
    }
    setTimeout(() => {
      this.isModalVisible = false; // Se oculta después de la animación
    }, 500); // Tiempo de la animación (500ms)

  }

  crearRegistro() {
    if (this.registro.nombre && this.registro.edad && this.registro.estatura) {
      // Emitir el nuevo registro hacia el componente padre
      this.registroCreado.emit(this.registro);
      this.cerrarModal();  // Cerrar el modal después de crear el registro
    }
  }
}

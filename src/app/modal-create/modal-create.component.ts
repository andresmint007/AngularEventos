import { Component, EventEmitter, Output,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importa FormsModule aquí
import { CommonModule } from '@angular/common';  // Importa CommonModule para directivas estructurales como ngIf
import {EventosService} from '../services/api/api/eventos.service'
import { Evento } from '../services/api';
import {AuthServiceJwt} from '../services/ownServices/auth.servicejwt'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './modal-create.component.html',
  styleUrl: './modal-create.component.css'
})
export class ModalCreateComponent {
    private apiServiceEventos = inject(EventosService);  
    private apijwtService = inject(AuthServiceJwt);  

  isModalVisible = false;
  eventoForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]],
    });
  }

  @Output() registroCreado = new EventEmitter<any>();

  mostrarModal() {
    this.isModalVisible = true;
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      const overlay = document.querySelector('.modal-overlay');
      if (modal && overlay) {
        modal.classList.add('show');
        overlay.classList.add('show');
      }
    }, 10);
  }

  cerrarModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.modal-overlay');
    if (modal && overlay) {
      modal.classList.remove('show');
      overlay.classList.remove('show');
    }
    setTimeout(() => {
      this.isModalVisible = false;
    }, 500); 
  }

  crearEvento() {
    if (this.eventoForm.valid) {
      this.crearEventoService();
      this.cerrarModal();  
    } else {
      console.error('Formulario no válido');
    }
  }
  crearEventoService(){
    const idEventoUser: number=this.apijwtService.getUser()??0;

    const eventoData: Evento = {};
    const formValues = this.eventoForm.value;
    eventoData.idUsuario =idEventoUser;
    eventoData.capacidad = parseInt(formValues.capacidad, 10);
    eventoData.nombre = formValues.nombre;
    eventoData.fechaHora = formValues.fechaHora;
    eventoData.descripcion = formValues.descripcion;
    eventoData.ubicacion = formValues.ubicacion;

    this.apiServiceEventos.apiEventosCrearEventoPost(eventoData, 'response').subscribe(
      (response) => {
        const idEvento: Number = response.body?.data ?? 0;
        this.registroCreado.emit(this.eventoForm.value); // O formValues si usas la constante.
        this.cerrarModal();
        alert ("Evento creado")
      },
      (error) => {
        console.error('Error al crear el evento:', error);
        alert('Error: ' + error["error"]["error"]);
      }
    );
    
  }
}

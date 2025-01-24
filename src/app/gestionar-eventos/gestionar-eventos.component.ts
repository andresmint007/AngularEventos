import { Component, OnInit, inject } from '@angular/core';
import { EventosService } from '../services/api/api/eventos.service';
import { Evento, EventoIsncritos, Inscripcion } from '../services/api';
import { CommonModule } from '@angular/common';
import {AuthServiceJwt} from '../services/ownServices/auth.servicejwt'
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestionar-eventos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  templateUrl: './gestionar-eventos.component.html',
  styleUrls: ['./gestionar-eventos.component.css']
})
export class GestionarEventosComponent implements OnInit {
  private eventosService = inject(EventosService);
  private apijwtService = inject(AuthServiceJwt);

  public usuarioId: number =0;

  eventoForm: FormGroup;
  isEditing = false;
  eventoEditado: EventoIsncritos = {};

  eventos: EventoIsncritos[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'fechaHora', 'ubicacion', 'capacidad',"Usuarios Registrados","inscrito", 'acciones'];
  loading = false;
  constructor(private fb: FormBuilder, private location: Location
  ) {
    this.eventoForm = this.fb.group({
      capacidad: ['', [Validators.required, Validators.min(1)]],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.usuarioId = this.apijwtService.getUser() ?? 0;
    console.log(this.usuarioId);
    this.obtenerEventos();
  }

  editarEvento(evento: EventoIsncritos) {
    this.eventoEditado =evento ;
    this.eventoForm.patchValue(this.eventoEditado);
    this.isEditing = true;
    console.log(this.isEditing);
  }

  eliminarEvento(evento: EventoIsncritos) {
  this.eliminarEventoService(evento.idEvento??0)
  }

  inscribirseEvento(evento: EventoIsncritos) {
    this.inscrbirEvento(evento.idEvento??0)
  }

  obtenerEventos(): void {
    this.loading = true;
    this.eventosService.apiEventosObtenerEventosGet('response').subscribe(
      (response) => {
        this.eventos = response.body?.data || [];
        this.loading = false;
      },
      (error) => {
        console.error('Error al obtener los eventos:', error);
        this.loading = false;
      }
    );
  }
  guardarEdicion(): void {
    if (this.eventoForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }else{
      const formValues = this.eventoForm.value;
      this.editarEventoService(formValues.capacidad,formValues.fechaHora,formValues.ubicacion)
    }
  }

    cerrarModal(): void {
      this.isEditing = false;
    }
  inscrbirEvento(eventoId:number){
    const now = new Date();
    const formattedNow = now.toISOString();
    const inscripcion: Inscripcion = {};
    const idEventoUser: number=this.apijwtService.getUser()??0;
    inscripcion.fechaInscripcion = formattedNow;
    inscripcion.idInscripcion=0,
    inscripcion.idEvento=eventoId;
    inscripcion.idUsuario=idEventoUser;
    this.eventosService.apiEventosInscribirEventoPost(inscripcion,'response').subscribe(
      (response) => {
        const idIns: boolean = response.body?.data ?? false;
        this.obtenerEventos();
        alert ("Inscripcion Completada id")
       },
      (error) => {
        alert (error["error"]["message"])
      }
    );
  }
  eliminarEventoService(eventoId:number){
    this.eventosService.apiEventosDesactivarEventoPost(eventoId,'response').subscribe(
      (response) => {
        const idIns: boolean = response.body?.data ?? false;
        this.obtenerEventos();
        alert ("Evento Desactivado")
       },
      (error) => {
        alert (error["error"]["message"])
      }
    );
  }
editarEventoService(capacidad:string,fechaHora:string,ubicacion:string){
  const evento_actualizar: Evento =this.eventoEditado;
  evento_actualizar.capacidad=parseInt(capacidad);
  evento_actualizar.fechaHora =fechaHora;
  evento_actualizar.ubicacion=ubicacion;
  this.eventosService.apiEventosEditarEventoPost(evento_actualizar).subscribe(
    (response) => {
      alert("Evento Actualizado")
      this.obtenerEventos();
      this.cerrarModal();  // Cierra el modal
    },
    (error) => {
      alert( alert (error["error"]["message"])  );
    }
  );
}
volverAtras() {
  this.location.back(); // Navegar atrás en el historial del navegador
}
}

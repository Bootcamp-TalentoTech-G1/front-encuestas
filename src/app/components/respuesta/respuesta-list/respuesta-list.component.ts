import { Component } from '@angular/core';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-respuesta-list',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './respuesta-list.component.html',
  styleUrl: './respuesta-list.component.css'
})
export class RespuestaListComponent {

  respuestas:Respuesta[] = [];

  constructor(
    private respuestaService:RespuestaService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit():void{
    this.obtenerRespuestas();
  }

  obtenerRespuestas():void{
    const preguntaId = Number(this.route.snapshot.paramMap.get('preguntaId'));
    this.respuestaService.obtenerRespuestasPorPregunta(preguntaId)
      .subscribe(respuestas => this.respuestas = respuestas)
  }

  editarRespuesta(respuestaId:number):void{
    const preguntaId = Number(this.route.snapshot.paramMap.get('preguntaId'));
    this.router.navigate(['/respuestas/editar',respuestaId,'pregunta',preguntaId]);
  }

  eliminarRespuesta(respuestaId:number):void{
    this.respuestaService.eliminarRespuesta(respuestaId)
      .subscribe(() => {
        this.respuestas = this.respuestas.filter(r => r.id !== respuestaId);
      })
  }
  
  agregarResouesta():void{
    const preguntaId = Number(this.route.snapshot.paramMap.get('preguntaId'));
    this.router.navigate(['/respuestas/nueva',preguntaId]);
  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona{
  nombre:string;
  favoritos:Favoritos[]
}

interface Favoritos{
  id:number;
  nombre:string;

}
@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})

export class DinamicosComponent {

  @ViewChild(' miFormulario') miFormulario!:NgForm;
  nuevoJuego:string='';

  persona:Persona={
    nombre:'Dania',
    favoritos:[
      {id:1,nombre:'Yoga'},
      {id:2,nombre:'Aero Pilates'},
    ]

  }

  agregarJuego(){
    const nuevoFavorito: Favoritos={
      id:this.persona.favoritos.length+1,
      nombre: this.nuevoJuego,
    }
    if (this.nuevoJuego){
          this.persona.favoritos.push(nuevoFavorito);

    }
    this.nuevoJuego = '';
  }

  guardar(){
    console.log('posteado',this.persona.favoritos.length,this.miFormulario.value.nombre)
  }

  eliminar(i:number){
    this.persona.favoritos.splice(i, 1);
  }

}

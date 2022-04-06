import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear',Validators.required],
      ['Death Strainding',Validators.required],

    ],Validators.required)
  });
  nuevoFavorito:FormControl = this.fb.control('',Validators.required);

  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
   /* this.miFormulario.reset({
      nombre:""
    });*/
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray
  }

  agregarFavoritos(){
    console.log(this.nuevoFavorito.value);
    if (this.nuevoFavorito.invalid){return;}
   // this.favoritosArr.push(new FormControl(this.nuevoFavorito.value));
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value));
    this.nuevoFavorito.reset();
  }

  borrarFavoritos(index: number){
    if (this.favoritosArr.length)
    this.favoritosArr.removeAt(index);

  }


}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero:['M',Validators.required],
    notificaciones:[false,Validators.required],
    condiciones:[false,Validators.requiredTrue]

  });

  persona = {
    genero: 'F',
    notificaciones:true
  }
  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.miFormulario.reset({...this.persona,condiciones:true});
    this.miFormulario.valueChanges.subscribe(({condiciones,...rest}) =>{
      this.persona = rest;

    })

  }

  guardar(){
    const formValue = {...this.miFormulario.value};
    delete formValue.condiciones;
    this.persona = formValue;
    console.log(formValue);
  }
}

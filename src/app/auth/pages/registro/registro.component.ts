import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre:['',[Validators.required, Validators.pattern(this.validatorService.nombreApelllidoPattern)]],
    email:['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)],[this.emailValidator]],
    username:['',[Validators.required,this.validatorService.noPuedeSerStrider]],
    password:['',[Validators.required,Validators.minLength(6)]],
    password2:['',[Validators.required,]],
  },{
    validators: [ this.validatorService.camposIguales('password','password2')]
  });

  //emailErrorMsg: string = '';
  get emailErrorMsg(): string{
    const errors = this.miFormulario.get('email')?.errors;
    if(errors?.['required']){
      return 'Debe indicar un email'
    }else if (errors?.['pattern']){
      return 'Formato de email no válido'
    }else if (errors?.['emailTomado']){
      return 'Email ya existe'
    }
    return '';
  }



  constructor(private fb: FormBuilder,
              private validatorService:ValidatorService,
              private emailValidator:EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fernando Herrera',
      email: 'test1@test.com',
      username: 'fernando.herrera85',
      password: '123456',
      password2: '123456',
    })
  }

campoNoValido(campo:string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
  }
 /*
  emailRequired(){
    return this.miFormulario.get('email')?.errors?.['required'] && this.miFormulario.get('email')?.touched
  }
  emailPatterns(){
    return this.miFormulario.get('email')?.errors?.['pattern'] && this.miFormulario.get('email')?.touched
  }
  emailTomado(){
    return this.miFormulario.get('email')?.errors?.['emailTomado'] && this.miFormulario.get('email')?.touched
  }*/

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched;
  }

}

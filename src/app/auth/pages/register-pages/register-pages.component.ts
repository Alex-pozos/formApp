import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-pages.component.html',
  styles: [
  ]
})
export class RegisterPagesComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    username: ['', [Validators.required, cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  //TODO: Se obtienen las validaciones desde un servicio.
  isValidField( field: string) {


  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }

}

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ]),

  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  get favoriteGames() {

    return this.myForm.get('favoriteGames') as FormArray;

  }


  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) {
      return null;
    }

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }


  isValidFielInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  onAddToFavorites () : void {

    if (this.newFavorite.invalid) {
      return;
    }
     const newGame = this.newFavorite.value;
    // console.log(this.newFavorite.value);
    this.favoriteGames.push(
        this.fb.control( newGame, Validators.required)
      );

      this.newFavorite.reset();

  }

  onDeleteFavorite (index:number):void{
    this.favoriteGames.removeAt(index);
  }


  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.log('invalido');

      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();

  }



}
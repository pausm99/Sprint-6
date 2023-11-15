import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  static minOneChecked: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const opciones = ['checkbox1', 'checkbox2', 'checkbox3'];
    const seleccionado = opciones.some(opcion => group.get(opcion)?.value);
    return seleccionado ? null : { minOneChecked: true };
  };

  static emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (emailRegex.test(control.value)) return null;
    else if (control.value === null || control.value === '') {
      return null;
    }
    return { invalidEmail: true };
  };

  static customPhone: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const regex = /^\d{9}$/;
    return (regex.test(control.value) ? null : { invalidPhone: true });
  }

}

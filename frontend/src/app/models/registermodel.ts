import { FormControl, FormGroup, Validators } from '@angular/forms';

export class RegisterFormModel {

  registerForm(): FormGroup {
    return new FormGroup({
        identificacion: new FormControl(null, [
        Validators.required, 
        Validators.pattern('^[0-9]*$') // Asegúrate de que solo números sean aceptados
      ]),
      username: new FormControl(null, [
        Validators.required, 
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required, 
        Validators.minLength(6)
      ]),
    });
  }
}

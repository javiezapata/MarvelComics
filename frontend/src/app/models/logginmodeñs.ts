import { FormControl, FormGroup, Validators } from "@angular/forms";

export class logginFormModel {

    formLoggin(): FormGroup {
         return new FormGroup({
           email:new FormControl(null,[Validators.required]),
           password: new FormControl(null, [Validators.required]),
         })
    }
}

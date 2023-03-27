import { FormGroup } from "@angular/forms";

export function resetForm(form: FormGroup ) {
  form.reset();

  Object.keys(form.controls).forEach(key => {
    form.get(key)?.setErrors(null) ;
  });
}

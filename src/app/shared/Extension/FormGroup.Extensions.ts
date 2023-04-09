import { UntypedFormGroup } from "@angular/forms";

export function resetForm(form: UntypedFormGroup ) {
  form.reset();

  Object.keys(form.controls).forEach(key => {
    form.get(key)?.setErrors(null) ;
  });
}

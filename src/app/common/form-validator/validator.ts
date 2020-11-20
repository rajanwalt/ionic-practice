import { FormGroup, FormControl } from '@angular/forms';

export const showValidationMsg = (formGroup: FormGroup) => {
    for (const key in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(key)) {
            const control: FormControl = <FormControl>formGroup.controls[key];

            if (Object.keys(control).includes('controls')) {
                const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
                showValidationMsg(formGroupChild);
            }

            control.markAsTouched();
        }
    }
}   
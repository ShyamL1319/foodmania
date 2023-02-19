import { AbstractControl } from "@angular/forms"

export const passwordMatchValidators =
    (passordControlName: string, confirmPwd: string) => { 
        const validator = (form: AbstractControl)=>{ 
            const passControl = form.get(passordControlName);
            const confirmPassControl = form.get(confirmPwd);

            if (!passControl || !confirmPassControl) return;
            if (passControl.value !== confirmPassControl.value) {
                confirmPassControl.setErrors({ notMatch: true });
            } else {
                const errors = confirmPassControl.errors;
                if (!errors) return;
                delete errors.notMatch;
                confirmPassControl.setErrors({ errors });
            }
        }
        return validator;
}
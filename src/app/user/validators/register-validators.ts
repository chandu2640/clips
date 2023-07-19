import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
    
    static match(controlName: string, matchingControlName: string) : ValidatorFn {
        return(group: AbstractControl) : ValidationErrors | null => {
            const control = group.get('password')
            const matchingControl = group.get('confirmPassword')
    
            if(!control || !matchingControl){
                console.log("Form controls can not be found in the form group")
                return {controlNotFound: false}
            }
    
            const error = control.value === matchingControl.value ? null: {noMatch: true}
            matchingControl.setErrors(error)
            return error
        }
    }
}

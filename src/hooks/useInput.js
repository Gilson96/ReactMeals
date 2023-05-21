import React, { useState } from 'react'

// Custom Hook, to handle form's validatation

const useInput = (Validation) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    // receives logic validation function
    const valueIsValid = Validation(enteredValue);
   

    //  if the user type "touch" 
    //  but is not valid
    //  throw error validation
    const hasError = !valueIsValid && isTouched;

    // gets user input value
    const enteredValueChangeHandler = (e) => {
        setEnteredValue(e.target.value)
    }

    // When loses fouces on the input
    const inputBlurHandler = e => {
        setIsTouched(true)
    }

    // reset all inputs
    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }
    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        enteredValueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput
import useInput from '../../hooks/useInput';
import classes from './Checkout.module.css';

// Logic validation functions
const Validation = value => value.trim() !== ''

const Checkout = (props) => {
    const {
        value: userName,
        isValid: namesIsValid,
        hasError: nameHasError,
        enteredValueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurhandler,
        reset: resetName
    } = useInput(Validation)

    const {
        value: street,
        isValid: streetIsValid,
        hasError: streetHasError,
        enteredValueChangeHandler: streetChangeHandler,
        inputBlurHandler: streetBlurhandler,
        reset: resetstreet
    } = useInput(Validation)

    const {
        value: postal,
        isValid: postalsIsValid,
        hasError: postalHasError,
        enteredValueChangeHandler: postalChangeHandler,
        inputBlurHandler: postalBlurhandler,
        reset: resetpostal
    } = useInput(Validation)

    const {
        value: city,
        isValid: cityIsValid,
        hasError: cityHasError,
        enteredValueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurhandler,
        reset: resetcity
    } = useInput(Validation)

    // checks if overall form is valid
    let formIsValid = false;

    if (namesIsValid && streetIsValid && postalsIsValid && cityIsValid) {
        formIsValid = true;
    }


    const confirmHandler = (event) => {
        event.preventDefault();

        // Dont submit if overall form is invalid
         if (!formIsValid) {
            return
         }

        //  sending data as an object from form to Cart via props
         props.onConfirm({
            name: userName,
            street: street,
            city: city,
            postal: postal
         })

        resetName();
        resetstreet();
        resetpostal();
        resetcity();
    };


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            
            <div className={`${classes.control} ${nameHasError ? classes.invalid : ''}`}>
                <label htmlFor='name'>Your Name</label>
                <input 
                    type='text'
                    id='name'
                    
                    onChange={nameChangeHandler}
                    onBlur={nameBlurhandler}
                    value={userName} />
                    {nameHasError && <p className='error-text'>Please enter first name</p>}
            </div>

            <div className={`${classes.control} ${streetHasError ? classes.invalid : ''}`}>
                <label htmlFor='street'>Street</label>
                <input
                    type='text'
                    id='street'
                    value={street}
                    onChange={streetChangeHandler}
                    onBlur={streetBlurhandler} />
                    {streetHasError && <p className='error-text'>Please enter first name</p>}
            </div>

            <div className={`${classes.control} ${postalHasError ? classes.invalid : ''}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input
                    type='text'
                    id='postal'
                    value={postal}
                    onChange={postalChangeHandler}
                    onBlur={postalBlurhandler} />
                    {postalHasError && <p className='error-text'>Please enter first name</p>}
            </div>

            <div className={`${classes.control} ${cityHasError ? classes.invalid : ''}`}>
                <label htmlFor='city'>City</label>
                <input
                    type='text'
                    id='city'
                    value={city}
                    onChange={cityChangeHandler}
                    onBlur={cityBlurhandler} />
                    {cityHasError && <p className='error-text'>Please enter first name</p>}
            </div>


            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit} onClick={props.onCancel}>Confirm</button>
                
            </div>
        </form>
    );
};

export default Checkout;
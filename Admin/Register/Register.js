import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { updateObject, checkValidity } from '../../../shared/utility';
import { Container, Card, Form, Button } from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import { CgUser, CgMail, CgPassword } from 'react-icons/cg';
import { signup } from '../../../services';

import classes from './Register.module.css';

const Register = props => {
    const [registerForm, setRegisterForm] = useState({
        firstName: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa nombre(s)',
            },
            icon: CgUser,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un nombre'
        },
        lastName: {
            elementType: 'group',
            elementConfig: {
                type: 'text',
                placeholder: 'Ingresa apellido(s)',
            },
            icon: CgUser,
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un apellido'
        },
        email: {
            elementType: 'group',
            elementConfig: {
                type: 'email',
                placeholder: 'Ingresa el email',
            },
            icon: CgMail,
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa un email válido'
        },
        password: {
            elementType: 'group',
            elementConfig: {
                type: 'password',
                placeholder: 'Ingresa la contraseña',
            },
            icon: CgPassword,
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Ingresa una contraseña válida'
        },
        confirmPassword: {
            elementType: 'group',
            elementConfig: {
                type: 'password',
                placeholder: 'Confirma la contraseña',
            },
            icon: CgPassword,
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            errorMessage: 'Las contraseñas no coinciden'
        },
        type: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'admin', displayValue: "Administrador" },
                    { value: 'chef', displayValue: "Chef" },
                    { value: 'mesero', displayValue: "Mesero" },
                    { value: 'cliente', displayValue: "Cliente" },
                ]
            },
            value: 'admin',
            validation: {},
            valid: true
        },
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const inputChangedHandler = (event, controlName) => {
        let updatedControls = updateObject(registerForm, {
            [controlName]: updateObject(registerForm[controlName], {
                value: event.target.value,
                valid: (controlName === 'confirmPassword') ? event.target.value === registerForm.password.value : checkValidity(event.target.value, registerForm[controlName].validation),
                touched: true
            })
        });
        if (controlName === 'password' && updatedControls.confirmPassword.value) {
            updatedControls = updateObject(updatedControls, {
                confirmPassword: updateObject(updatedControls.confirmPassword, {
                    valid: event.target.value === updatedControls.confirmPassword.value
                })
            });
        }
        setRegisterForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(false)
        const data = {
            firstName: registerForm.firstName.value,
            lastName: registerForm.lastName.value,
            email: registerForm.email.value,
            password: registerForm.password.value,
            type: registerForm.type.value
        }
        signup({
            data,
            setLoading,
            setErrorMessage,
            register: true,
            history: props.history
        });
        
    }

    const formElementsArray = [];
    for (let key in registerForm) {
        formElementsArray.push({
            id: key,
            config: registerForm[key]
        })
    }

    let form = !loading ? formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            icon={formElement.config.icon}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            errorMessage={formElement.config.errorMessage}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    )) : <Spinner />;

    return (
        <Container>
            <Card className={classes.Register}>
                <Card.Body>
                    <h4 className="card-title text-center mb-4 mt-1">Nuevo usuario</h4>
                    <hr />
                    <Form noValidate onSubmit={submitHandler}>
                        {form}
                        <Button type="submit" variant="primary" size="lg" block disabled={!registerForm.firstName.valid || !registerForm.lastName.valid || !registerForm.email.valid || !registerForm.password.valid || !registerForm.confirmPassword.valid}> Registrar  </Button>
                        {errorMessage && <p className={`${classes.ErrorMessage} text-center mt-2`}>Error: Verifica los datos ingresados</p>}
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default withRouter(Register);

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button, CircularProgress, Container, FormGroup } from '@mui/material';
import { FastField, Form, Formik, FormikValues } from 'formik';
import { useState } from 'react';
import { object, string, ref } from 'yup';
import IUser from '../../features/user/user.interface';
import { userLogin, userSignUp } from '../../api/userApi';
import {UserSignUp} from '../../interfaces/user-auth.interface';
import { InputField } from '../../components/customField/InputField';
import { nameRegex, passwordRegex,emailRegex } from '../../constants/constant';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export default function SignUp() {
    const initialValues: UserSignUp = {
        username: '',
        password: '',
        email:'',
        confirmpassword: ''
    }
    const validationSchema = object().shape({
        username: string().required('User name is required.')
            .matches(nameRegex,
                "User name must contain at least 8 characters, maximum 20 characters, include one underscore(_), dot(.), space( )"),
        password: string().required('Password is required.')
            .matches(passwordRegex,
                "Password must contain at least 8 characters, maximum 20 characters, one uppercase, one number and one special case character"),
        email: string().required('Email is required.')
                .matches(emailRegex, "Invalid email."),
        confirmpassword: string().required('This field is required')
            .oneOf([ref('password'), null], 'Passwords must match')
    });
    const [errorMessSignUp, setErrorMessSignUp] = useState<string|null>(null);
    const [isWaiting,setIsWaiting] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state: RootState)=>state.user);
    const handleSubmit = async (user: UserSignUp) => {
        dispatch(userSignUp(user));
    }
    return (
        <Box sx={{margin: '5rem auto auto', maxWidth: '380px',
         border:'solid 1px', borderRadius: '5px', padding:'24px'}}>
            <Formik initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {
                formikProps => {
                    const {isSubmitting} = formikProps;
                    return (
                        <Form>
                            {errorMessSignUp?<Alert severity="error">{errorMessSignUp}</Alert>:null}
                            <FastField
                                name="username"
                                component={InputField}
                                label="User Name"
                                placeholder="Tom"
                                type="text" />
                            <FastField
                            name="email"
                            component={InputField}
                            label="Email"
                            placeholder="example@email.com"
                            type="email" />

                            <FastField
                                name="password"
                                type="password"
                                component={InputField}
                                label="Password"
                            />
                            <FastField
                                name="confirmpassword"
                                type="password"
                                
                                component={InputField}
                                label="Confirm password"
                            />
                            {/* <div className="helper-block">If you don't have any account, please <div type="button" onClick={switchSignUp} className="helper-block--click"> Sign Up here!</div></div> */}
                            <FormGroup className="signin-btn-group">
                                <Button type="submit" variant="contained" color="primary">{ (userState.isLoading||isSubmitting)&&<CircularProgress sx={{color:"#0d4d8c"}} />}Sign Up</Button>
                            </FormGroup>
                        </Form>
                    )
                }
            }
        </Formik>
        </Box>
        

    );
}
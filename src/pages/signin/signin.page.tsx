
import { Alert, Box, Button, CircularProgress, FormGroup, Typography } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import { boolean, object, string } from 'yup';
import {  userSignIn } from '../../features/user/user.api';
import  { UserAuth } from '../../interfaces/user-auth.interface';
import { InputField } from '../../components/customField/InputField';
import { nameRegex, passwordRegex } from '../../constants/constant';

import { useContext, useEffect, useState } from 'react';
import IUser from '../../features/user/user.interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Link, useNavigate } from 'react-router-dom';


export default function SignIn() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: RootState)=> state.user);

  const initialValues: UserAuth = {
    username: '',
    password: ''
  }
  const validationSchema = object().shape({
    username: string().required('This field is required').matches(nameRegex, "User name must contain 4-20 characters."),
    password: string().required('This field is required').matches(passwordRegex, "Password must contain at least 8-20 characters.")
  });
  const handleSubmit = async (user: UserAuth, err:any) => {
    dispatch(userSignIn(user));
  }
  return (
    <Box sx={{margin: '5rem auto auto', maxWidth: '380px',
    border:'solid 1px', borderRadius: '5px', padding:'24px'}}>
      <Typography variant="h1" component="h2" sx={{padding: '8px',textAlign:'center',fontWeight:'bold', fontSize:'2rem', margin: 'auto'}}>
  SIGN IN
</Typography>
      <Formik initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {
        formikProps => {
          const {isSubmitting} = formikProps;
          return (
            <Form> 
              {userState.errMessage?<Alert sx={{marginBottom: '12px'}} severity="error">{userState.errMessage}</Alert>:null}
              <FastField
                name="username"
                component={InputField}
                label="User Name"
                placeholder="Tom"
                type="text" />

              <FastField
                name="password"
                type="password"
                component={InputField}
                label="Password"
              /> 
              <FormGroup className="signin-btn-group">
                <Button type="submit" variant="contained" color="primary">{ (userState.isLoading||isSubmitting)&&<CircularProgress size='small' sx={{color:"white"}} />} Login</Button>
              </FormGroup>
            </Form>
          )
        }
      }
    </Formik>
    <Typography sx={{paddingTop: '16px'}}>Don't have an account? <Link to="/signup">Sign Up</Link></Typography>
    </Box>
  );
}
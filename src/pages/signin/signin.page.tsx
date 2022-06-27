
import { Alert, Box, Button, CircularProgress, FormGroup } from '@mui/material';
import { FastField, Form, Formik } from 'formik';
import { boolean, object, string } from 'yup';
import { userLogin, userSignIn } from '../../api/userApi';
import IUserForm, { UserAuth } from '../../interfaces/user-auth.interface';
import { InputField } from '../../components/customField/InputField';
import { nameRegex, passwordRegex } from '../../constants/constant';
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import IUser from '../../features/user/user.interface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { selectUserLoadingState } from '../../features/user/user.slice';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: RootState)=> state.user);
  const initialValues: Partial<IUserForm> = {
    username: '',
    password: ''
  }
  const validationSchema = object().shape({
    username: string().required('This field is required').matches(nameRegex, "User name must contain at least 8 characters, maximum 20 characters, include one underscore(_), dot(.), space( )"),
    password: string().required('This field is required').matches(passwordRegex, "Password must contain at least 8 characters, maximum 20 characters, one uppercase, one number and one special case character")
  });
  const handleSubmit = async (user: UserAuth) => {
    dispatch(userSignIn(user));
  }
  return (
    <Box sx={{width: "80%", margin:"auto"}}>
      <Formik initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {
        formikProps => {
          const {isSubmitting} = formikProps;
          return (
            <Form> 
              {userState.errMessage?<Alert severity="error">{userState.errMessage}</Alert>:null}
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
                <Button type="submit" variant="contained" color="primary">{ (userState.isLoading||isSubmitting)&&<CircularProgress sx={{color:"#0d4d8c"}} />}Login</Button>
              </FormGroup>
            </Form>
          )
        }
      }
    </Formik>
    </Box>
  );
}
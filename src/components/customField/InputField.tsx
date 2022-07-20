import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert, FormControl, FormGroup, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { ErrorMessage, FormikValues } from "formik";
import { useState } from "react";
const ErrorComponent = (props:{err:string})=><Alert sx={{marginBottom:'8px', marginTop:'-8px'}} severity="error">{props.err}</Alert>;
export const InputField = (props: FormikValues) => {
    const { form, field, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showErr = errors[name] && touched[name];

    const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

    return <FormControl variant="outlined" sx={{width: '100%'}} >
      <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
        id={name}
          label={label}
          name={name}
          type={type!='password'?type:(showPassword?'text':'password')}
          value={value}
          onChange={onChange}
          error={showErr}
          sx={{marginBottom:"16px"}}
          endAdornment={
            type=='password'?<InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ?  <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>:null
          }
          
      />
      <ErrorMessage name={name} component={()=>(<ErrorComponent err={errors[name]}/>)} />
    </FormControl>
    
}
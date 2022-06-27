import { Alert, FormGroup, TextField } from "@mui/material";
import { ErrorMessage, FormikValues } from "formik";
const ErrorComponent = (props:{err:string})=><Alert severity="error">{props.err}</Alert>;
export const InputField = (props: FormikValues) => {
    const { form, field, type, label, placeholder, disabled } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;
    const showErr = errors[name] && touched[name];
    return <FormGroup>
        <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        error={showErr}
        sx={{marginBottom:"16px"}}
    />
    <ErrorMessage name={name} component={()=>(<ErrorComponent err={errors[name]}/>)} />
    </FormGroup>
    
}
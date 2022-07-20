import {  Checkbox, Input, styled, TextField, ThemeProvider, useTheme } from '@mui/material'
import React, { useState } from 'react'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from '../../app/theme';
const TaskInput = styled(Input)(({theme})=>({
    borderRadius: '5px',
    backgroundColor:'white',
    boxShadow: '0px 0.3px 0.9px rgba(0,0,0,0.1),0px 1.6px 3.6px rgba(0,0,0,0.1)',
    padding: '0.5rem',
    width: '100%',
    'input':{
        '&::placeholder':{
            color:theme.palette.primary.main
        },
    }
   
}))

export default function Task() {
   
    const [textValue, setTextValue] = useState<string>('');
    const [dateValue, setDateValue] = React.useState<Date | null>(null);
  return (
   
   <TaskInput 
   disableUnderline
   startAdornment={<Checkbox
   disabled
    icon={<RadioButtonUncheckedIcon sx={{fontSize: '18px'}}/>}
    checkedIcon={<CheckCircleIcon sx={{fontSize: '18px'}} />}
    value={textValue}
    onChange={(e)=>setTextValue(e.target.value)}
  />}
   placeholder='Add a task'
   />
   
   
  

   
 
   
  )
}

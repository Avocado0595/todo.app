import { Box, Button, TextField } from '@mui/material'
import React from 'react'

export default function Input(props:{title:string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isAdd: boolean,
    handleAddUpdateTodo:()=>void,

}) {
  return (
    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
        <TextField
          sx={{ marginRight: '10px' }}
          id="outlined-basic" label="Add todo" variant="outlined"
          value={props.title} onChange={props.handleChange} type="text" />
        <Button variant="contained" color={props.isAdd ? "primary" : "success"} 
        onClick={props.handleAddUpdateTodo}>{props.isAdd ? 'Add' : 'Update'}</Button>
      </Box>
  )
}

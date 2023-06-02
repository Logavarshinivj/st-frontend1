import React from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const Student = () => {
  return (
    <div className='add-student-form'>
     <h1>Student List</h1>
     <TextField id="outlined-basic" label="Name" type="text"  variant="outlined" />
     <TextField id="outlined-basic" label="Father's Name" type="text" variant="outlined" /> 
     <TextField id="outlined-basic" label="Email" type="email" variant="outlined" />
     <TextField id="outlined-basic" label="Mobile" type="number" variant="outlined" />
     <Button variant="contained">ADD</Button>
    </div>
  )
}

export default Student
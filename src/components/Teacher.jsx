import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Teacher = () => {
  return (
    <div className='add-teacher-form'>
        <h1>Teacher list</h1>
        <TextField id="outlined-basic" label="Name" type="text"  variant="outlined" />
        <TextField id="outlined-basic" label="Qualification" type="text"  variant="outlined" />
        <TextField id="outlined-basic" label="Experience in years" type="text"  variant="outlined" />
        <TextField id="outlined-basic" label="Mobile" type="text"  variant="outlined" />
        <Button variant="contained">ADD</Button>
    </div>
  )
}

export default Teacher
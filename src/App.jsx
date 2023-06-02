import { useEffect, useState } from 'react'

import './App.css'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { AppBar } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';


export default function App() {

  // const[user,setUser]=useState([
  //   {name:"varshu",fathername:"basker",email:"varshu@gmail.com",mobile:5689890023},
  //   {name:"varshu",fathername:"basker",email:"varshu@gmail.com",mobile:5689890023},
  //   {name:"varshu",fathername:"basker",email:"varshu@gmail.com",mobile:5689890023},
  //   {name:"varshu",fathername:"basker",email:"varshu@gmail.com",mobile:5689890023},
  // ])
  const[user,setUser]=useState([])
  const[teacher,setTeacher]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    fetch("https://st-backend-dusky.vercel.app/get-students")
    .then((res)=>res.json())
    .then((data)=>setUser(data))
  },[])

  useEffect(()=>{
    fetch("https://st-backend-dusky.vercel.app/get-teachers")
    .then((res)=>res.json())
    .then((data)=>setTeacher(data))
  },[])

  

  return (
   <div className='App'> 
    {/* <AddStudent/>
    <Details user={user}/> */}

    <AppBar position="static" color="primary">
    <Toolbar>
         
         <Button onClick={()=>navigate("/")} color="inherit">Home</Button>
         {/* <Button onClick={()=>navigate("/student-page")} color="inherit">STUDENT</Button>
         <Button onClick={()=>navigate("/create-teacher")} color="inherit">TEACHER</Button> */}
         </Toolbar>

    </AppBar>
    
   <Routes>
    <Route path="/" exact element={<Home />}/>
    <Route path="/student-list" exact element={<Details user={user}/>}/>
    <Route path="/edit-student/:id" exact element={<Update />}/>
    <Route path="/create-student" exact element={<AddStudent />}/>
    <Route path="/teacher-list" exact element={<TeacherApp teacher={teacher}/>}/>
    <Route path="/create-teacher" exact element={<AddTeacher />}/>
    <Route path="/update-teacher/:id" exact element={<UpdateTeacher/>}/>
    <Route path="/student-page" exact element={<StudentPage/>}/>
    <Route path="/teacher-page" exact element={<TeacherPage/>}/>
   </Routes>
   </div>
  )
}
 
function Home(){
  const navigate=useNavigate()
   return(
    <div> <h2 style={{"text-align":"center","paddingTop":"20px"}}>STUDENT TEACHER MANAGEMENT APP📝🖊️</h2>
    <div className="homepage">
  <h4>Click the button below👇</h4>
  <Button onClick={()=>navigate("/student-page")} variant="contained">Student</Button>
  <Button onClick={()=>navigate("/teacher-page")} variant="contained">Teacher</Button>
  </div>
  </div>
   )
}

function AddStudent(){
  const [name,setName]=useState("")
  const [fathername,setFathername]=useState("")
  const [email,setEmail]=useState("")
  const [mobile,setMobile]=useState("")
  const navigate=useNavigate()

  const newStudent={name,fathername,email,mobile}

  const handleSubmit=async()=>{
    let result=await fetch("https://st-backend-dusky.vercel.app/create-student",{
      method:"POST",
      body:JSON.stringify({name,fathername,email,mobile}),
      headers:{"Content-Type": "application/json"}
    })
    result=await result.json()
    if(result){
      navigate("/student-list")
    }
  }


  return(
    <div className='add-student-form'>
     <h1>Student List</h1>
     <TextField id="outlined-basic" label="Name" type="text"  variant="outlined" onChange={(event)=>setName(event.target.value)}/>
     <TextField id="outlined-basic" label="Father's Name" type="text" variant="outlined" onChange={(event)=>setFathername(event.target.value)} /> 
     <TextField id="outlined-basic" label="Email" type="email" variant="outlined" onChange={(event=>setEmail(event.target.value))} />
     <TextField id="outlined-basic" label="Mobile" type="number" variant="outlined" onChange={(event)=>setMobile(event.target.value)} />
     <Button variant="contained" onClick={handleSubmit}>ADD</Button>
    </div>
  )
}

function Details({user,id}) {
    
  return(
  <div className="test">
    <StudentList user={user}  />
  </div>
  )
  }


function StudentList({user}){
  const styles={
    "overflow":"auto",
  }
  return(
    <div className='table-section' stle={styles}>
      <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
              {user.map((usr,index)=>(<Sample user={usr} id={index}/>))}
            </tbody>
        </table>
    </div>
  )
  }
function Sample({user}){

  const deleteStudent=async(id)=>{
    let result=await fetch(`https://st-backend-dusky.vercel.app/delete-student/${id}`,{
      method:"DELETE",
    })
    result=await result.json()
    if(result){
      alert("Student deleted successfully")
    }
  }
  return(
    
      <tr>
        <td>{user.name}</td>
        <td>{user.fathername}</td>
        <td>{user.email}</td>
        <td>{user.mobile}</td>
        <td>  <IconButton aria-label="delete" size="small" onClick={()=>deleteStudent(user._id)}>
        <DeleteIcon fontSize="inherit" />
      </IconButton></td>
      <td><Link to={"/edit-student/"+ user._id}><EditIcon/></Link></td>
      </tr>
    
  )
}

function Update(){
  const [name,setName]=useState("")
  const [fathername,setFathername]=useState("")
  const [email,setEmail]=useState("")
  const [mobile,setMobile]=useState("")
  const {id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    getStudent()

  },[])

  const getStudent=async()=>{
    var result=await fetch(`https://st-backend-dusky.vercel.app/get-student/${id}`)
    result=await result.json()
    setName(result.name)
    setFathername(result.fathername)
    setEmail(result.email)
    setMobile(result.mobile)
  }

  const Save=async()=>{
    var result=await fetch(`https://st-backend-dusky.vercel.app/edit-student/${id}`,
    {
      method:"PUT",
      body:JSON.stringify({name,fathername,email,mobile}),
      headers:{"content-type": "application/json",}
    })
    result=await result.json()
    if(result){
      navigate("/student-list")
    }
  }

  return(
    <div className='edit-student-form'>
     <h1>Student List</h1>
     <TextField id="outlined-basic" label="Name" type="text" value={name} variant="outlined" onChange={(event)=>setName(event.target.value)}/>
     <TextField id="outlined-basic" label="Father's Name" value={fathername} type="text" variant="outlined" onChange={(event)=>setFathername(event.target.value)} /> 
     <TextField id="outlined-basic" label="Email" type="email" value={email} variant="outlined" onChange={(event=>setEmail(event.target.value))} />
     <TextField id="outlined-basic" label="Mobile" type="number" value={mobile} variant="outlined" onChange={(event)=>setMobile(event.target.value)} />
     <Button variant="contained" onClick={Save} >Update</Button>
    </div>

  )
  }


function TeacherApp({teacher}){
  
  return(
    <div className='test1'>
     <TeacherList teacher={teacher}/>
    </div>
  )
}

function TeacherList({teacher}){
  return(
    <div className='teacher-table'>
      <table>
        <thead>
          <th>Name</th>
          <th>Qualification</th>
          <th>Experience in years</th>
          <th>mobile</th>
          <th>Delete</th>
          <th>Edit</th>
        </thead>
        <tbody>
          {teacher.map((tr,index)=>(<TeacherSample teacher={tr} id={index}/>))}
        </tbody>
      </table>
    </div>
  )
}

function TeacherSample({teacher}){
  const deleteTeacher=async(id)=>{
    let result=await fetch(`https://st-backend-dusky.vercel.app/delete-teacher/${id}`,
    {
      method:"DELETE",
    })
    result=await result.json()
    if(result){
      alert("Teacher deleted successfully")
    }
  }
  return(
 <tr>
  <td>{teacher.name}</td>
  <td>{teacher.qualification}</td>
  <td>{teacher.experience}</td>
  <td>{teacher.mobile}</td>
  <td>  <IconButton aria-label="delete" size="small" onClick={()=>deleteTeacher(teacher._id)}>
        <DeleteIcon fontSize="inherit" />
      </IconButton></td>
      <td><Link to={"/update-teacher/"+ teacher._id}><EditIcon/></Link></td>
 

 </tr>
  )
}

function AddTeacher(){
  const[name,setName]=useState("")
  const[qualification,setQualification]=useState("")
  const[experience,setExperience]=useState("")
  const[mobile,setMobile]=useState("")
  const navigate=useNavigate()
  const handleSubmit1=async()=>{
    let result=await fetch("https://st-backend-dusky.vercel.app/create-teacher",{
      method: "POST",
      body: JSON.stringify({name,qualification,experience,mobile}),
      headers:{"Content-Type": "application/json"}
    })
    result=await result.json()
    if(result){
      navigate("/teacher-list")
    }
  }
  return(
    <div className='add-teacher-form'>
       <TextField id="outlined-basic" label="Name" type="text"  variant="outlined" onChange={(event)=>setName(event.target.value)}/>
       <TextField id="outlined-basic" label="Qualification" type="text"  variant="outlined" onChange={(event)=>setQualification(event.target.value)}/>
       <TextField id="outlined-basic" label="Experience in years" type="text"  variant="outlined" onChange={(event)=>setExperience(event.target.value)}/>
       <TextField id="outlined-basic" label="Mobile" type="text"  variant="outlined" onChange={(event)=>setMobile(event.target.value)}/>
       <Button variant="contained" onClick={handleSubmit1}>ADD</Button>
    </div>
  )
}

function UpdateTeacher(){
  const[name,setName]=useState("")
  const[qualification,setQualification]=useState("")
  const[experience,setExperience]=useState("")
  const[mobile,setMobile]=useState("")
  const{id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    getTeacher()

  },[])

  const getTeacher=async()=>{
    var result=await fetch(`https://st-backend-dusky.vercel.app/get-teacher/${id}`)
    result=await result.json()
    setName(result.name)
    setQualification(result.qualification)
    setExperience(result.experience)
    setMobile(result.mobile)
  }


  const update=async()=>{

    var result=await fetch(`https://st-backend-dusky.vercel.app/update-teacher/${id}`,{
      method:"PUT",
      body:JSON.stringify({name,qualification,experience,mobile}),
      headers:{'Content-Type': 'application/json'}
    })
    result=await result.json()
    if(result){
      navigate("/teacher-list")
      
    }
  }
  
  return(
    <div className='add-teacher-form'>
       <TextField id="outlined-basic" label="Name" type="text" value={name} variant="outlined" onChange={(event)=>setName(event.target.value)}/>
       <TextField id="outlined-basic" label="Qualification" type="text" value={qualification} variant="outlined" onChange={(event)=>setQualification(event.target.value)}/>
       <TextField id="outlined-basic" label="Experience in years" type="text" value={experience} variant="outlined" onChange={(event)=>setExperience(event.target.value)}/>
       <TextField id="outlined-basic" label="Mobile" type="text"  variant="outlined" value={mobile} onChange={(event)=>setMobile(event.target.value)}/>
       <Button variant="contained"onClick={update} >SAVE</Button>
    </div>
  )
}

function StudentPage(){
  const navigate=useNavigate()
  return(
    <div className='student-page'>
      <Button onClick={()=>navigate("/create-student")} variant="contained">ADD STUDENT</Button>
      <Button onClick={()=>navigate("/student-list")} variant="contained">VIEW STUDENT LISTS</Button>
    </div>
  )
}

function TeacherPage(){
  const navigate=useNavigate()
  return(
    <div className='teacher-page'>
      <Button onClick={()=>navigate("/create-teacher")} variant="contained">ADD TEACHER</Button>
      <Button onClick={()=>navigate("/teacher-list")} variant="contained">VIEW TEACHER LISTS</Button>
    </div>
  )
}
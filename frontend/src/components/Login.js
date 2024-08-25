import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [users,setUsers]=useState([])
  const [userName,setUserName]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3001/register')
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleLogin=async (event)=>{
    event.preventDefault()
    try{
      const response=await axios.post('http://localhost:3001/login',{userName,password})
      const token=response.data.token
      alert("Login Successfull")
      setUserName('')
      setPassword('')
      fetchUsers();
      navigate("/account")
      window.location.reload()
      localStorage.setItem('token',token)
    }
    catch(error){
      console.log("Login error")
    }
   
  }



  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full bg-gray-800 text-white flex justify-center items-center'>

        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9'
        onSubmit={handleLogin}>
         
          <label>UserName</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xl bg-slate-500 p-2'
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => { setUserName(e.target.value) }} />
          <br />
          <br />
          <label>Password</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xl bg-slate-500 p-2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
          <br />
          <br />
          <button className='h-[50px] w-[200px] border hover:bg-green-200 hover:text-black' type="submit">Login</button>
        </form>

      </div>
      <div className='w-1/2 h-full flex justify-center items-center bg-gray-800'>
        <h2 className='text-3xl text-white' >Login</h2>
      </div>
    </div>
  )
}

export default Login
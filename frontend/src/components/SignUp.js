import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

  const handleRegister = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/register', { email, userName, password })
      .then(() => {
        alert("Registration Successful");
        setEmail('');
        setUserName('');
        setPassword('');
        fetchUsers();
        navigate("/login");
      })
      .catch((error) => {
        console.log("Unable to register");
      });
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-1/2 h-full bg-gray-800 text-white flex justify-center items-center'>

        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9'
          onSubmit={handleRegister}>
          <label>Email</label>
          <br />
          <input className='w-[400px] h-[40px] rounded-xl bg-slate-500 p-2'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }} />
          <br /> 
          <br />
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
          <button className='h-[50px] w-[200px] border hover:bg-green-200 hover:text-black' type="submit">SignUp</button>
        </form>

      </div>
      <div className='w-1/2 h-full flex justify-center items-center bg-gray-800'>
        <h2 className='text-3xl text-white' >SignUp</h2>
      </div>
    </div>
  );
};

export default SignUp;

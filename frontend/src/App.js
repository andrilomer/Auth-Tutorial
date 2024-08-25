import { Route,Routes } from 'react-router-dom'; 
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Account from './components/Account';


function App() {

  const isUserSignedIn=!!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {
          isUserSignedIn &&  <Route path='/account' element={<Account/>}/>
        }
      </Routes>
    </div>
  );
}

export default App;

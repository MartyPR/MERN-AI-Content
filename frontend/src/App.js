
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Registration from './components/Users/Register';
import Login from './components/Users/Login';
import Dashboard from './components/Users/Dashboard';
import PrivateNavbar from './components/Nav/PrivateNavbar';
import PublicNavbar from './components/Nav/PublicNavbar';
import { useAuth } from './components/AuthContext/AuthContext';
import AuthRoute from './components/AuthRoute/AuthRoute';
 

function App() {
const {isAuthenticated} = useAuth()
  return (
  <>
  <BrowserRouter>
  {/* Navbar */}
  {isAuthenticated ? <PrivateNavbar/> :<PublicNavbar/>}

  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Registration/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<AuthRoute><Dashboard/></AuthRoute>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;

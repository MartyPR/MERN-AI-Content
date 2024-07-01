
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Registration from './components/Users/Register';
import Login from './components/Users/Login';


function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Registration/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;

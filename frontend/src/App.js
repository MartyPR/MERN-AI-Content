
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
import BlogPostAIAssistant from './components/ContentGeneration/ContentGeneration';
import Plans from './components/Plan/Plan';
import FreePlanSignup from './components/StripePayment/FreePlanSignup';
import CheckoutForm from './components/StripePayment/CheckoutForm';
import PaymentSuccess from './components/StripePayment/PaymentSuccess';
import ContentGenerationHistory from './components/ContentGeneration/Contenthistory';
import AppFeatures from './components/Features/Features';
import AboutUs from './components/About/About';
 

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
    <Route path='/generate-content' element={<AuthRoute><BlogPostAIAssistant/></AuthRoute>}/>
    <Route path='/plans' element={<Plans/>}/>
    <Route path='/free-plan' element={<FreePlanSignup/>}/>
    <Route path='/checkout/:plan' element={<CheckoutForm/>}/> 
    <Route path='/success' element={<PaymentSuccess/>}/> 
    <Route path='/features' element={<AppFeatures/>}/> 
    <Route path='/about' element={<AboutUs/>}/> 
    <Route path='/history' element={<AuthRoute><ContentGenerationHistory/></AuthRoute>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;

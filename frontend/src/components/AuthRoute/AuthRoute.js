import AuthCheckingComponent from "../Alert/AuthCheckingComponents";
import { useAuth } from "../AuthContext/AuthContext"
import {Navigate,useLocation} from "react-router-dom"
const AuthRoute = ({children})=>{
    const location = useLocation()
     const {istAuthenticated, isLoading, isError}= useAuth();
     if (isLoading) {
        return <AuthCheckingComponent/>
     }
     if (isError || istAuthenticated===false) {
        return <Navigate to='/login' state={{from:location}} replace/>
     }
     return children;
}
export default AuthRoute
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatusAPI } from "../../services/users/usersAPI";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //make request using react
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkAuthStatusAPI,
    queryKey: ["checkAuth"],
  });
  //update the authenticated the user
  useEffect(()=>{
   if (data) {
    setIsAuthenticated(data);
   }
  },[data,isSuccess]);

  // update the user auth after login
  const login = ()=>{
    setIsAuthenticated(true);
  }
  const logout = ()=>{
    setIsAuthenticated(false);
  }

  return (
  <AuthContext.Provider value={{isAuthenticated,isError,isLoading,isSuccess,login,logout}}>
    {children}
  </AuthContext.Provider>)
};


//cusmton hook
export const useAuth=()=>{
    return useContext(AuthContext)
};
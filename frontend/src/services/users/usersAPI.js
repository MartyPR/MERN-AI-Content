import axios from "axios";
import { BASE_URL } from "../../utils/url";
//register
export const registerAPI = async ({ email, password, username }) => {
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    {
      email,
      password,
      username,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
//login
export const loginAPI= async({email,password})=>{
  const response = await axios.post(`${BASE_URL}/users/login`,{
    email,
    password,
  },{
    withCredentials:true,
  });
  return response.data;
}
//profile

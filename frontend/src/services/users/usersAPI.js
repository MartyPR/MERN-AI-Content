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
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
//check auth
export const checkAuthStatusAPI = async () => {
  const response = await axios.get(`${BASE_URL}/users/auth/check`, {
    withCredentials: true,
  });
  return response?.data;
};
// logout
export const logoutAPI = async () => {
  const response = await axios.post(
    `${BASE_URL}/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

// get user

export const getUserProfileAPI = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/users/profile`,
    {
      withCredentials: true,
    }
  );
  
  return response?.data;
};

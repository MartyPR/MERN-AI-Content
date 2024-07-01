import axios from "axios";
import { BASE_URL } from "../../utils/url";

export const generateContentAPI = async ( userPrompt ) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/openai/generate-content",
    { prompt:userPrompt },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

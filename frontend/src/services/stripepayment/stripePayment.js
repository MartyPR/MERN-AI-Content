import axios from "axios";
import { BASE_URL } from "../../utils/url";

export const handleFreeSubscriptionAPI = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/stripe/free-plan",
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  };
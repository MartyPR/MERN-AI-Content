import axios from "axios";
import { BASE_URL } from "../../utils/url";

export const handleFreeSubscription = async()=>{
    const response = await axios.post(`${BASE_URL}/stripe/free-plan`,
        {},
        {
            withCredentials:true,
        }
    )
}
// utils/fetcher.js
import Cookies from "js-cookie";

const Adminfetcher = async (PATH, method = "GET", body = {}) => {
    const APIURL = process.env.NEXT_PUBLIC_STRAPI_URL;
    console.log(APIURL)
    // Add fetcher options
    const options = {
      method, 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    };
  
    // If POST or PUT, then add a body
    if (method === "POST" || method === "PUT") {
      options.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(`${APIURL}${PATH}`, options);
      const res = await response.json();
  
      if (!response.ok) {
        throw new Error(res.error.details || "An error occurred during the API call.");
      }
  
      return res.data;
    } catch (error) {
      console.error("Fetcher Error:", error);
      return { error: true, message: error.message, originalError: error };
    }
  };
  
  export default Adminfetcher;
  
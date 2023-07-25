import { getTokenFromLocalCookie } from "../lib/auth";
import { useEffect, useState } from "react";
import { fetcher } from "../lib/api";


// Create New
export const useCreateScheduler=()=>{
    const [data, setData] = useState(null);
    function createRandomString() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }
      
    
  
    const fetchData = async (ID) => { 
        console.log(ID)
      const JWT = getTokenFromLocalCookie();
    
      if(ID !== 'undefined'){
        
          const res = await fetcher(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/schedulers/`,
              {
                method:"POST",
                body: JSON.stringify({
                    data: {
                        account: [ID],
                        Name:createRandomString(),
                        days_of_the_week:[3]
                    },
                  }),
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${JWT}`,
                },
              }
            );
        
            console.log(res.data);
        
            setData(res.data);
      }
      
    };
  
    return [data, fetchData];
}
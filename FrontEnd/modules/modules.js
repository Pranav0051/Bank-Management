import axios from "axios";

// trim data to remove extra spaces
export const trimData=(obj)=>{
  let finalObj = {};
  for(let key in obj){
    const value = obj[key];
    finalObj[key] = typeof value === 'string' ? value.trim() : value;
  }
  return finalObj;
}

//import axios from "axios";

export const http = (accessToken = null) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    headers: {
      "Content-Type": "application/json",...(accessToken && { Authorization: `Bearer ${accessToken}`}),
    },
  });

  return instance;
};

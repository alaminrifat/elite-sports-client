import axios from 'axios';
import { toast } from 'react-toastify';


const axiosSecure = axios.create({
    baseURL: 'https://elite-sports-academy-server-ten.vercel.app', 
  });

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use((req)=>{
            const token = localStorage.getItem("access-token");
            if(token){
                req.headers.Authorization = `Bearer ${token}`
            }
            return req;
        });

        axiosSecure.interceptors.response.use(
            response => response,
            error =>{
                if(error.response && (error?.response.status === 403 || error?.response.status === 401)){
                    toast.error(error?.response?.data.error)
                }
            }
        )
      return axiosSecure;
};

export default useAxiosSecure;
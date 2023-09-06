import axios from 'axios';
import {  KEY_ACCESS_TOKEN,getItem, removeItem, setItem } from './LocalStorageManager';
import store from "../Redux/store"
import { setLoading, showToast } from '../Redux/appConfigSlice';
import { TOAST_FAILURE } from '../App';
export const axiosClient=axios.create({
    baseURL:"http://localhost:4003"
    
    
})

axiosClient.interceptors.request.use(
   (req)=>{
        const accessToken=getItem(KEY_ACCESS_TOKEN);
        req.headers['Authorization']=`Bearer ${accessToken}`;
        store.dispatch(setLoading(true));
        return req; 

    }
     
);
axiosClient.interceptors.response.use(
    async  (res)=>{
        store.dispatch(setLoading(false));
        const originalRequest=res.config;
        const data=res.data;
        if(data.status==='ok'){
            return data;
        }
        const statusCode= data.statusCode;
        const error=data.message;
        store.dispatch(showToast({
            type:TOAST_FAILURE,
            message:error
        }))
    

        if(statusCode === 401){
            const response=await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);
            if(response.status==='ok'){
            
                setItem(KEY_ACCESS_TOKEN,response.result.accessToken);
                originalRequest.headers['Authorization']=`Bearer ${response.result.accessToken}`
                return axios(originalRequest)
            }
            else{
                removeItem(KEY_ACCESS_TOKEN);
              window.location.replace('/login','_self');
              return Promise.reject(error);

            }


               
            
        }
        return Promise.reject(error);
          
    },async(err)=>{
 
        
        return Promise.reject(err);
    }
);

   
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../uiSlice";

const customBaseQuery = fetchBaseQuery ({
    baseUrl:'http://localhost:5211/api'
});

const sleep = () =>  new Promise(resolve => setTimeout(resolve,1000));

export const baseQueryWithErrorHandling = async (args:string | FetchArgs, api: BaseQueryApi, 
    extraOptions:object) => {
        //start loading
        api.dispatch(startLoading()); //loading flag ide na true
        await sleep();
        const result = await customBaseQuery(args, api, extraOptions);
        //stop loading
        api.dispatch(stopLoading()); 
        if(result.error) {
            const{status, data} = result.error;
            console.log({status, data});
        }
        return result;
    }
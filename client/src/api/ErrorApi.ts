import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";


export const errorApi = createApi( {
    reducerPath:'errorapi',
    baseQuery:baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        get400Error:builder.query<void, void> ( {
            query:() => ({url:"buggy/bad-request"})
        }),
        get401Error:builder.query<void, void> ( {
            query:() => ({url:"buggy/unauthorized"})
        }),
        get404Error:builder.query<void, void> ( {
            query:() => ({url:"buggy/not-found"})
        }),
        get500Error:builder.query<void, void> ( {
            query:() => ({url:"buggy/server-error"})
        }),
        getValidationError:builder.query<void, void> ( {
            query:() => ({url:"buggy/validation-error"})
        }),

    }),

});

export const {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGetValidationErrorQuery, //Ovo znači da se podaci neće automatski učitati kada se hook koristi,
    //  već ti moraš ručno da pokreneš API poziv.
    //  Ovo je korisno kada želiš da kontroliraš kada će se zahtev poslati prema serveru.
   
} = errorApi;
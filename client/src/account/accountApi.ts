import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../api/baseApi";
import { User } from "../models/user";
import { LoginSchema } from "../schemas/loginSchema";
import { router } from "../router/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
  reducerPath: "acountApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["UserInfo"],
  endpoints: (builder) => ({
    login: builder.mutation<void, LoginSchema>({
      query: (creds) => {
        return {
          url: "login?useCookies=true",
          method: "POST",
          body: creds,
          credentials: "include",
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // mutacija je operacija koja mijenja podatke na serveru, za razliku od query-ja, koji samo dohvaća podatke.
    register: builder.mutation<void, object>({
      query: (creds) => {
        return {
          url: "account/register",
          method: "POST",
          body: creds,
        };
      },

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Registracija uspješna - sada se možete prijaviti!");
          router.navigate("/login");
        } catch (error) {
          console.log(error);
          // throw(error); //bacimo je komponenti
        }
      },
    }),

    userInfo: builder.query<User, void>({
      query: () => "Account/user-info",
      providesTags: ["UserInfo"],
    }),
    fetchUsers: builder.query<User[], void>({
      query: () => ({ url: "account/get-users" }),
    }),
    deleteUser: builder.mutation({
      query: (id: string) => {
        return {
          url: `account/delete-user/${id}`,
          method: "DELETE",
        };
      },
    }),
    sendWelcomeEmail: builder.mutation<void, { receptor: string }>({
      query: (emailData) => {
        if (!emailData.receptor || emailData.receptor.trim() === "") {
          throw new Error("Email address is required");
        }

        return {
          url: "Emails",
          method: "POST",
          body: { receptor: emailData.receptor },
        };
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "account/logout",
        method: "POST",
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(accountApi.util.invalidateTags(["UserInfo"]));
        router.navigate("/home");
      },
    }),
    //Ova mutacija postaje dostupna kroz automatski generisanu funkciju u RTK Query API-ju.
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useLazyUserInfoQuery,
  useSendWelcomeEmailMutation,
  useFetchUsersQuery,
  useDeleteUserMutation
} = accountApi;

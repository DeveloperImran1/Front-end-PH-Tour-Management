import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

// Useer successfully login korar pore cookie te access-token and refresh-token set hosse. Aita postman theke korle postman a set kortese. But jodi front-end er localhost theke request kori tahole browser a set kortesena. Aita korar jonno axios.ts file a withCredentials: true kore dita hobe. Ar jodi amader project a data fetch korar jonno redux er sathe axios use na kori tahole baseApi.ts file a baseQuery er moddhe credentials: "include" kore dita hobe.

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(), // Jodi axios er maddhome fetch kore tahole axios.ts file a change korte hobe.
  // baseQuery: fetchBaseQuery({
  //   // Jodi redux er default fetchBaseQuery dia fetch kore tahole aikhane credentials: true korte hobe.
  //   baseUrl: config.baseUrl,
  //   credentials: "include",
  // }),
  tagTypes: ["USER", "TOUR"],
  endpoints: () => ({}),
});

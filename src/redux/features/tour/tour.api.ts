import { baseApi } from "@/redux/baseApi";
import type { ITourPackage, ITourResponce } from "@/types/tour.type";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourInfo) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourInfo,
      }),
      invalidatesTags: ["TOUR"],
    }),
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      // data get kore success: true, data, message etc. responce er moddhe ase. But jodi need pore sudho kono property ke pabo responce a jokhon useGetTourType ke call korbo. Tar jonno transformResponse property use korte hobe. Aita perameter a full responce ta pai. tarpor fixed kono protperty ke return kore dissi.
      transformResponse: (response) => response.data,
    }),

    getAllTours: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: ITourResponce) => response?.data,
    }),

    deleteTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useAddTourMutation,
  useGetTourTypesQuery,
  useDeleteTourTypeMutation,
  useGetAllToursQuery,
} = tourApi;

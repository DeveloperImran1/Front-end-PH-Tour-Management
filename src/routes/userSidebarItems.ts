import Booking from "@/pages/User/Booking";
import type { ISidebarItem } from "@/types/auth.type";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Booking,
      },
    ],
  },
];

import AddDivision from "@/pages/Admin/AddDivision";
import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
import type { ISidebarItem } from "@/types/auth.type";

// Amra jokhon /admin/analytics route a hit korbo, tarpor Analytics page er js bundle download howa dorkar. But aivabe normaly import kore use korar fole, jokhon Homepage a asi, tokhoni homepage er sathe ai Analytics file er js bundle oo download hosse. Jar fole performance issue hoi.
// import Analytics from "@/pages/Admin/Analytics";

// Uporer issue solbe korar jonno react theke lazy loading ke import kore use koreci. Jarfole jokhon /admin/analytics route a hit korbe user. Tokhoni sudho ai js bundle download korbe.
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];

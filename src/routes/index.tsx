import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Fail from "@/pages/Payment/Fail";
import Success from "@/pages/Payment/Success";
import Register from "@/pages/Register";
import TourBook from "@/pages/TourBook";
import TourDetails from "@/pages/TourDetails";
import Tours from "@/pages/Tours";
import UnAuthorized from "@/pages/UnAuthorized";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types/auth.type";
import { generateRoutes } from "@/utils/generateRoutes";
import withAuth from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        Component: withAuth(About),
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: withAuth(TourBook),
        path: "booking/:id",
      },
      {
        Component: withAuth(Success),
        path: "/payment/success",
      },
      {
        Component: withAuth(Fail),
        path: "/payment/fail",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      // {
      //   Component: Analytics,
      //   path: "analytics", // Aita alre relative path.
      //   // path: "/admin/analytics", // Aita alre absolute path. Bivinno somoi /routeName dia likhte hote pare. Tokhon parent path taw add korte hobe. Otherwise kaj korbena.
      // },
      // {
      //   Component: AddTour,
      //   path: "add-tour",
      // },

      // Navbar er dashboard a click korle, default vabe /admin route a jabe. But /admin route a kono page nai. So jodi kew sudho /admin route a hit kore, Tahole take navigate kore /admin/analytics route a pathia diba.
      { index: true, element: <Navigate to="/admin/analytics"></Navigate> },

      // aivabe generateRoutes function ke call kore nia aste pari datake.
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings"></Navigate> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: UnAuthorized,
    path: "/unauthorized",
  },
]);

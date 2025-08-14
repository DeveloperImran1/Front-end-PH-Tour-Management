import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types/auth.type";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data: userInfo, isLoading } = useUserInfoQuery(undefined);

    const userEmail = userInfo?.data?.data?.email;
    const userRole = userInfo?.data?.data?.role;

    if (!isLoading && !userEmail) {
      return <Navigate to="/login"></Navigate>;
    }

    if (requiredRole && !isLoading && requiredRole !== userRole) {
      return <Navigate to="/unauthorized"></Navigate>;
    }
    return <Component></Component>;
  };
};

export default withAuth;

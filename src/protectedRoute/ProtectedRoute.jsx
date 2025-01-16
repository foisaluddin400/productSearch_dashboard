import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { useGetAllAdminQuery } from "../redux/Api/adminApi";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken"); // Check accessToken from storage

  if (!accessToken) {
    return <Navigate to={"/auth/login"} state={{ from: location }} />;
  }

  const { data: getUserInfo, isError, isLoading, isFetching } = useGetAllAdminQuery();

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Skeleton active />
      </div>
    );
  }

  if (isError || !getUserInfo?.data?.length) {
    return <Navigate to={"/auth/login"} state={{ from: location }} />;
  }

  const admin = getUserInfo.data.find((user) => user.auth.role === "ADMIN");

  if (!admin || !admin.auth.email) {
    return <Navigate to={"/auth/login"} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

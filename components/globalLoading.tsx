"use client";

import React from "react";
import useUIStore from "@/store/useUIStore";
import LoadingSpinner from "./LoadingSpinner";

const GlobalLoading: React.FC = () => {
  const loading = useUIStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <LoadingSpinner />
    </div>
  );
};

export default GlobalLoading;

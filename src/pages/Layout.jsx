import React from "react";

export default function Layout({ children }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
      {children}
    </div>
  );
}

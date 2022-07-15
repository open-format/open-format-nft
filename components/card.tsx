import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="hover:shadow-md hover:shadow-slate-500 transition-shadow max-h-max shadow-lg shadow-slate-300 rounded-lg sm:overflow-hidden">
      {children}
    </div>
  );
}

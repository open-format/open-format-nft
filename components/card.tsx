import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="hover:shadow-md hover:shadow-slate-300 transition-shadow border-2 max-h-max rounded-lg sm:overflow-hidden">
      {children}
    </div>
  );
}

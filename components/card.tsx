import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="transition-shadow max-h-max shadow-lg shadow-slate-300/80 rounded-lg overflow-hidden duration-300 ease-in-out hover:shadow-slate-400/50">
      {children}
    </div>
  );
}

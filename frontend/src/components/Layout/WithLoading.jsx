import React from "react";

export default function WithLoading(props) {
  return (
    <div className="relative w-full h-full">
      {props.loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10 rounded-xl">
          <div className="w-10 h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {props.children}
    </div>
  );
}
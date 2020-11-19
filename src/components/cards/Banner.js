import React from "react";

export default function Banner({ children, title, subtitle }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
      <div></div>
      <h3 style={{color:"white"}}>{subtitle}</h3>
      {children}
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThemeCard({ theme }) {
  const navigate = useNavigate();

  return (
    <div className="w-[23vw] cursor-pointer">
      <img
        onClick={() => window.open(theme.themePreviewUrl, "_blank")}
        className="w-[100%]"
        src={theme.themeThumbnail}
        alt={theme.themeTitle}
      />
      <div>
        <p
          onClick={() => window.open(theme.themePreviewUrl, "_blank")}
          className="font-bold"
        >
          {theme.themeTitle}
        </p>
        <button onClick={() => navigate("/auth/login")} className="bg-black text-white p-2">Customize</button>
      </div>
    </div>
  );
}

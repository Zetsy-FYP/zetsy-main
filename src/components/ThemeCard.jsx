import React from "react";

export default function ThemeCard({ theme }) {
  return (
    <div className="w-[23vw]" onClick={() => window.open(theme.themePreviewUrl, "_blank")}>
      <img className="w-[100%]" src={theme.themeThumbnail} alt={theme.themeTitle} />
      <div>
      <p className="font-bold">{theme.themeTitle}</p>
      <button className="bg-black text-white p-2">Customize</button>
      </div>
    </div>
  );
}

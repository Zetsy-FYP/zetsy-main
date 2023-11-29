import React from "react";
import ThemeLists from "../mocks/Themes.json";
import ThemeCard from "../components/ThemeCard";

export default function Themes() {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Themes</h1>
      <input className="mb-3" type="text" placeholder="Filter Themes by category"/>
      <div className="flex flex-row align-top gap-4">
        {ThemeLists.map((theme, index) => {
          return <ThemeCard key={index} theme={theme} />;
        })}
      </div>
    </div>
  );
}

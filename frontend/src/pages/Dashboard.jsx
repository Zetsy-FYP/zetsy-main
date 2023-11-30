import React, { useState } from "react";
import Stores from "../components/Dashboard/Stores";
import Sidebars from "../mocks/Sidebar.json";
import StoresMock from "../mocks/Stores.json";
import DashboardRouter from "../components/Dashboard/DashboardRouter";
import UserHandle from "../components/Dashboard/UserHandle";
import { auth } from "../../firebase";

export default function Dashboard() {
  const [selected, setSelected] = useState(StoresMock[0]);
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const user = auth.currentUser;

  return (
    <main className="flex flex-row align-top">
      <div className="w-[18vw] border-r-2 h-[96vh]">
        <Stores selected={selected} setSelected={setSelected} />

        <div className="mt-3 px-5 py-2 navigationLinks flex flex-col align-top justify-start border-t-2">
          <p className="block text-sm font-medium leading-6 text-gray-900">
            Links
          </p>
          {Sidebars.map((item, index) => {
            return (
              <button
                onClick={() => setActivePage(item.path)}
                className="text-sm leading-6 text-gray-900 py-2 text-left hover:bg-gray-100 px-2"
                key={index}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex align-middle justify-between border-b-2 px-5 py-3">
          <div>Zetsy</div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => window.open("https://zetsy.store", "_blank")}
            >
              Go to your site
            </button>
            <button
              className="bg-black text-white px-3"
              onClick={() => setOpen(true)}
            >
              {user.email.split("@")[0]}
            </button>
          </div>
        </div>
        <DashboardRouter activePage={activePage} />
      </div>
      {/* @dev this open when user button is clicked */}
      <UserHandle open={open} setOpen={setOpen} />
    </main>
  );
}
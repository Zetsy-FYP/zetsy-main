import React, { useState } from "react";
import NewProduct from "../../components/Dashboard/NewProduct";

export default function DProducts() {
  const [state, setState] = useState("displayProducts");

  return (
    <div>
      {state === "displayProducts" && (
        <>
          <p className="font-medium text-sm">Products</p>
          <div className="flex flex-row justify-between mb-5 align-middle">
            <div className="font-medium text-sm">
              <div className="flex gap-2 mt-3">
                <button className="bg-gray-100 px-3 py-1">Active</button>
                <button className="bg-gray-100 px-3 py-1">Draft</button>
              </div>
            </div>
            <div className="flex gap-1">
              <input
                type="text"
                className="border px-2 py-1"
                placeholder="Search"
              />
              <button
                onClick={() => setState("addProducts")}
                className="bg-slate-950 text-gray-50 px-3 py-1 text-sm"
              >
                + Add Product
              </button>
            </div>
          </div>

          <table width="100%">
            <thead>
              <td className="border p-1 text-sm font-medium">#</td>
              <td className="border p-1 text-sm font-medium">Name</td>
              <td className="border p-1 text-sm font-medium">Price</td>
              <td className="border p-1 text-sm font-medium">Inventory</td>
              <td className="border p-1 text-sm font-medium">Created At</td>
              <td className="border p-1 text-sm font-medium">Actions</td>
            </thead>
          </table>
        </>
      )}

      {state === "addProducts" && <NewProduct setState={setState} />}
    </div>
  );
}

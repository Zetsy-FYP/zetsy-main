import { useState } from "react";
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
              <tr>
                <th className="border p-1 text-sm font-medium">#</th>
                <th className="border p-1 text-sm font-medium">Name</th>
                <th className="border p-1 text-sm font-medium">Price</th>
                <th className="border p-1 text-sm font-medium">Inventory</th>
                <th className="border p-1 text-sm font-medium">Created At</th>
                <th className="border p-1 text-sm font-medium">Actions</th>
              </tr>
            </thead>
          </table>
        </>
      )}

      {state === "addProducts" && <NewProduct setState={setState} />}
    </div>
  );
}

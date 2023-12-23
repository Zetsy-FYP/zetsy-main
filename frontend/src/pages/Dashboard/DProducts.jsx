import { useEffect, useState } from "react";
import NewProduct from "../../components/Dashboard/NewProduct";

export default function DProducts() {
  const [state, setState] = useState("displayProducts");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(import.meta.env.VITE_API_URL + "/products");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    }
    getProducts();
  }, []);

  console.log(products);

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
                <th className="border p-1 text-sm font-medium">Quantity</th>
                <th className="border p-1 text-sm font-medium">Created At</th>
                <th className="border p-1 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, i) => {
                  return (
                    <tr key={product?._id}>
                      <td
                        className="border p-1 text-sm font-medium"
                        align="center"
                      >
                        {i + 1}
                      </td>
                      <td
                        className="border p-1 text-sm font-medium"
                        align="center"
                      >
                        {product?.productName}
                      </td>
                      <td
                        className="border p-1 text-sm font-medium"
                        align="center"
                      >
                        {product?.selling_price}
                      </td>
                      <td
                        className="border p-1 text-sm font-medium"
                        align="center"
                      >
                        {product?.quantity}
                      </td>
                      <td
                        className="border p-1 text-sm font-medium"
                        align="center"
                      >
                        {product?.created_at}
                      </td>
                      <td className="border" align="center">
                        <button className=" px-2 mx-1">✏️</button>
                        <button className="px-2">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}

      {state === "addProducts" && <NewProduct setState={setState} />}
    </div>
  );
}

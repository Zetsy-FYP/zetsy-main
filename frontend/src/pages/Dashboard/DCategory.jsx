import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

export default function DCategory() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-[100%] h-[100%]">
      <div className="flex flex-row justify-between align-middle">
        <p className="text-sm font-medium">Store Categories</p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 px-2 text-white"
        >
          Add Category
        </button>
      </div>
      {isOpen && (
        <dialog
          className="absolute w-[100%] h-[100%] left-0 top-0 flex align-middle justify-center"
          open={isOpen}
        >
          <div className="p-4 pb-[210px] w-[30vw] border">
            <form method="dialog" className="flex flex-col gap-2">
              <label className="text-sm" htmlFor="">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Category Name"
                className="border p-2 text-sm"
              />
              <label className="text-sm" htmlFor="">
                Category Image
              </label>
              <FileUploader />
              <button
                onClick={() => setIsOpen(false)}
                className="w-30 bg-slate-500 py-1 text-white"
              >
                OK
              </button>
            </form>
          </div>
        </dialog>
      )}

      <table className="border mt-4" width="100%">
        <thead className="border">
          <tr>
            <td className="border">#</td>
            <td className="border">Name</td>
            <td className="border">Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border">1</td>
            <td className="flex flex-row align-middle gap-2">
              <img
                width={30}
                src="https://cdn.iconscout.com/icon/free/png-256/free-cloth-clothing-dress-top-one-piece-37736.png"
                alt=""
              />
              Clothing
            </td>
            <td className="border">
              <button>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

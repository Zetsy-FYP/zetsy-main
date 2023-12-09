import React, { useState } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { FileUploader } from "react-drag-drop-files";
import { TagsInput } from "react-tag-input-component";

const fileTypes = ["JPG", "PNG", "WEBP"];

function MyStatefulEditor({ onChange, value, setValue }) {
  const handleOnChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue.toString("html"));
    }
  };

  return <RichTextEditor value={value} onChange={handleOnChange} />;
}

MyStatefulEditor.propTypes = {
  onChange: PropTypes.func,
};

export default function NewProduct() {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [file, setFile] = useState(null);

  const handleFileChange = async (file) => {
    setFile(file);
  };

  const [color, setColors] = useState([]);
  const [size, setSizes] = useState([]);

  return (
    <div>
      <div className="flex flex-row align-middle justify-between">
        <div className="flex flex-row gap-1">
          <button className="bg-gray-800 text-white px-3">back</button>
          <p>Add Product</p>
        </div>
        <button className="bg-gray-800 text-white px-3">Bulk Upload</button>
      </div>

      <form className="mt-3" action="">
        <table>
          <tbody>
            <tr className="flex flex-row align-top gap-4">
              <td className="flex flex-col gap-2 flex-1">
                <label className="text-sm" htmlFor="">Product Name</label>
                <input className="border p-2" type="text" placeholder="e.g. Air Jordan 1" />
                <label className="text-sm" htmlFor="">Product Description</label>
                <MyStatefulEditor value={value} setValue={setValue} />
                <label className="text-sm" htmlFor="">Selling Price</label>
                <input className="border p-2" type="number" placeholder="0" />
                <label className="text-sm" htmlFor="">Crossed Price</label>
                <input className="border p-2" type="number" placeholder="0" />
                <label className="text-sm" htmlFor="">Cost per item</label>
                <p>Customer won't see this value</p>
                <input className="border p-2" type="number" placeholder="0" />
                <label className="text-sm" htmlFor="">Quantity</label>
                <input className="border p-2" type="number" placeholder="0" />
                <label className="text-sm" htmlFor="">Product SKU</label>
                <input className="border p-2" type="text" placeholder="e.g. 100" />
                <div>
                  <input className="border p-2" type="checkbox" />
                  <label className="text-sm" htmlFor="">
                    Continue selling even after product is out of stock
                  </label>
                </div>

                <label className="text-sm" htmlFor="">Status</label>
                <select className="border p-2" name="" id="">
                  <option value="">Active</option>
                  <option value="">Draft</option>
                </select>

                <button className="bg-purple-600 text-white py-2">
                  Save Product
                </button>
              </td>
              <td className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="">Product Images</label>
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                />
                <label className="text-sm" htmlFor="">Categories</label>
                <select className="border p-2" name="" id="">
                  <option value="">Clothing</option>
                  <option value="">Electronics</option>
                </select>
                <label className="text-sm" htmlFor="">Product Options</label>
                <div>
                  <input type="checkbox" />
                  <label className="text-sm" htmlFor="">Color</label>
                </div>
                <TagsInput
                  value={color}
                  onChange={setColors}
                  name="colors"
                  placeHolder="enter colors"
                />
                <em>press enter or comma to add new tag</em>
                <div>
                  <input type="checkbox" />
                  <label className="text-sm" htmlFor="">Size</label>
                </div>
                <TagsInput
                  value={size}
                  onChange={setSizes}
                  name="sizes"
                  placeHolder="enter sizes"
                />
                <em>press enter or comma to add new tag</em>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

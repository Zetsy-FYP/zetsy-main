/* eslint-disable react/prop-types */
// import PropTypes from "prop-types";
import { useState } from "react";
import RichTextEditor from "react-rte";
import FileUploader from "../../utils/FileUploader";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import TagInput from "../../utils/TagInput";

const MAX_COUNT = 5;

const options = [
  { value: "Active", label: "Active" },
  { value: "Draft", label: "Draft" },
];

const categories = [
  {
    value: "Clothing",
    label: "Clothing",
  },
  {
    value: "Electronics",
    label: "Electronics",
  },
];

// function MyStatefulEditor({ initialValue, onChange, placeholder }) {
//   console.log(initialValue);
//   const [editorState, setEditorState] = useState(
//     initialValue
//       ? RichTextEditor.createValueFromString(initialValue, "html")
//       : RichTextEditor.createEmptyValue()
//   );

//   console.log(editorState)

//   return (
//     <RichTextEditor
//       value={editorState}
//       onChange={(value) => {
//         setEditorState(value);
//         onChange(value.toString("html"));
//       }}
//       placeholder={placeholder}
//     />
//   );
// }

// MyStatefulEditor.propTypes = {
//   onChange: PropTypes.func,
// };

export default function NewProduct({ setState }) {
  const [editorValue, setEditorValue] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [fileLimit, setFileLimit] = useState(false);
  const [images, setImages] = useState([]);
  const [color, setColors] = useState([]);
  const [size, setSizes] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    defaultValues: {
      colorChecked: false,
      sizeChecked: false,
    },
  });

  const watchColor = watch("colorChecked");
  const watchSize = watch("sizeChecked");
  console.log(errors);

  const handleFormSubmit = (data) => {
    console.log(data);
    const {
      categories,
      status,
      cost_per_item,
      crossed_price,
      productName,
      description,
      quantity,
      product_sku,
      selling_price,
    } = data;
    const formData = new FormData();
    formData.append("cost_per_item", cost_per_item);
    formData.append("crossed_price", crossed_price);
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("product_sku", product_sku);
    formData.append("selling_price", selling_price);
    for (let i = 0; i < categories.length; i++) {
      formData.append("categories", categories[i]);
    }
    formData.append("status", status.value);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    async function postProduct() {
      fetch(import.meta.env.VITE_API_URL + "/products", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    postProduct();
  };

  return (
    <div>
      <div className="flex flex-row align-middle justify-between">
        <div className="flex flex-row gap-1">
          <button
            onClick={() => setState("displayProducts")}
            className="bg-gray-800 text-white px-3"
          >
            back
          </button>
          <p>Add Product</p>
        </div>
        <button className="bg-gray-800 text-white px-3">Bulk Upload</button>
      </div>

      <form
        className="mt-3"
        action=""
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <table>
          <tbody>
            <tr className="flex flex-row align-top gap-4">
              <td className="flex flex-col gap-2 flex-1">
                <label className="text-sm" htmlFor="product">
                  Product Name
                </label>
                <input
                  className="border p-2"
                  type="text"
                  placeholder="e.g. Air Jordan 1"
                  id="product"
                  {...register("productName", {
                    required: "Product Name is required",
                  })}
                />
                <label className="text-sm" htmlFor="description">
                  Product Description
                </label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange } }) => {
                    return (
                      <RichTextEditor
                        value={editorValue}
                        onChange={(data) => {
                          setEditorValue(data), onChange(data.toString("html"));
                        }}
                        placeholder="Write what you have learned in this experiment run..."
                      />
                    );
                  }}
                />
                <label className="text-sm" htmlFor="selling_price">
                  Selling Price
                </label>
                <input
                  className="border p-2"
                  type="number"
                  id="selling_price"
                  placeholder="0"
                  {...register("selling_price", {
                    required: "Selling price is required",
                  })}
                  min={0}
                />
                <label className="text-sm" htmlFor="">
                  Crossed Price
                </label>
                <input
                  className="border p-2"
                  type="number"
                  placeholder="0"
                  {...register("crossed_price", {
                    required: "Crossed Price is required",
                  })}
                />
                <label className="text-sm" htmlFor="">
                  Cost per item
                </label>
                <p>Customer won&apos;t see this value</p>
                <input
                  className="border p-2"
                  type="number"
                  placeholder="0"
                  {...register("cost_per_item", {
                    required: "cost price is required",
                  })}
                />
                <label className="text-sm" htmlFor="">
                  Quantity
                </label>
                <input
                  className="border p-2"
                  type="number"
                  placeholder="0"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                />
                <label className="text-sm" htmlFor="">
                  Product Stock Keeping Unit(SKU)
                </label>
                <input
                  className="border p-2"
                  type="text"
                  placeholder="e.g. ABC-100"
                  {...register("product_sku")}
                />
                <div className="flex items-center gap-1">
                  <input className="border p-2" type="checkbox" id="continue" />
                  <label className="text-sm" htmlFor="continue">
                    Continue selling even after product is out of stock
                  </label>
                </div>

                <label className="text-sm" htmlFor="">
                  Status
                </label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <Select
                        {...field}
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={onChange}
                        value={value}
                      />
                    );
                  }}
                />

                <button className="bg-purple-600 text-white py-2">
                  Save Product
                </button>
              </td>
              <td className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="">
                  Product Images
                </label>
                <FileUploader
                  name={"image"}
                  id={"image"}
                  fileLimit={fileLimit}
                  MAX_COUNT={MAX_COUNT}
                  setImages={setImages}
                  setFileLimit={setFileLimit}
                  images={images}
                  label={"Upload Images"}
                />
                <label className="text-sm" htmlFor="">
                  Categories
                </label>
                <Controller
                  control={control}
                  name="categories"
                  defaultValue={categories.map((c) => c.value)}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <Select
                        options={categories}
                        isMulti
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={categories.filter((c) =>
                          value.includes(c.value)
                        )}
                        onChange={(val) => onChange(val.map((c) => c.value))}
                      />
                    );
                  }}
                />

                <label className="text-sm" htmlFor="">
                  Product Options
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="color"
                    {...register("colorChecked")}
                  />
                  <label className="text-sm" htmlFor="color">
                    Color
                  </label>
                </div>
                {watchColor ? (
                  <>
                    <TagInput
                      value={color}
                      onChange={setColors}
                      name={"colors"}
                      placeholder={"Enter Colors"}
                    />
                  </>
                ) : null}

                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    id="size"
                    {...register("sizeChecked")}
                  />
                  <label className="text-sm" htmlFor="size">
                    Size
                  </label>
                </div>
                {watchSize ? (
                  <>
                    <TagInput
                      value={size}
                      onChange={setSizes}
                      name={"sizes"}
                      placeholder={"Enter Sizes"}
                    />
                  </>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

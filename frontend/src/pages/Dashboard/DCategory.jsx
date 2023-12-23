import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploader from "../../utils/FileUploader";

const MAX_COUNT = 1;

export default function DCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [category, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
  } = useForm();

  const handleFormSubmit = async (data) => {

    const { categoryName } = data;

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    for (let i = 0; i < images.length; i++) {
      formData.append("featuredImage", images[i]);
    }

    fetch(import.meta.env.VITE_API_URL + "/category", {
      method: "POST",
      body: formData,
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    async function getCategory() {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/category"
        );
        const category = await response.json();
        setCategories(category);
      } catch (e) {
        console.log(e);
      }
    }
    getCategory();
  }, []);

  const handleUploadFiles = (files) => {
    const uploaded = [...images];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setImages(uploaded);
  };

  const handleFileEvent = (e) => {
    /**
     *@dev convert objects of files to array
     */
    const choosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(choosenFiles);
  };

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
            <form
              method="dialog"
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <label className="text-sm" htmlFor="">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Category Name"
                className="border p-2 text-sm"
                {...register("categoryName", {
                  required: "It is a required field",
                })}
              />
              <label className="text-sm" htmlFor="">
                Category Image
              </label>
              <FileUploader
                name={"featuredImage"}
                id={"featuredImage"}
                onChange={handleFileEvent}
                fileLimit={fileLimit}
              />

              <button
                // onClick={() => setIsOpen(false)}
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
          {category.length > 0 &&
            category.map((category, i) => {
              console.log(category);
              return (
                <tr key={category._id}>
                  <td className="border">{i + 1}</td>
                  <td className="flex flex-row align-middle gap-2">
                    <img
                      src={category?.featuredImage}
                      width={30}
                      alt="category-image"
                    />
                    {category?.categoryName}
                  </td>
                  <td className="border">
                    <button>✏️</button>
                    <button>🗑️</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

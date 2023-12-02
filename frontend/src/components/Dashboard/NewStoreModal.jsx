import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FileUploader } from "react-drag-drop-files";
import { auth } from "../../../firebase";
import { StoreContext } from "../../contexts/Store";
import { toast } from "react-toastify";

const fileTypes = ["JPG", "PNG", "WEBP"];

export default function NewStoreModal({ open, setOpen }) {
  const cancelButtonRef = useRef(null);
  const [storeName, setStorename] = useState("");
  const [file, setFile] = useState(null);
  const user = auth.currentUser;
  const { stores, dispatch } = useContext(StoreContext);

  const handleFileChange = async (file) => {
    setFile(file);
  };

  const handleNewStore = async () => {
    const formData = new FormData();
    formData.append("storeName", storeName);
    formData.append("storeLogo", file);
    formData.append("user", user.uid);

    try {
      fetch(`${import.meta.env.VITE_API_URL}/store`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data);
          dispatch({
            type: "ADD_STORE",
            payload: data,
          });
          toast("Store Added Successfully!");
          setStorename(""), setFile(null);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col gap-2">
                  <label className="text-sm font-medium">Store Logo</label>
                  <FileUploader
                    handleChange={handleFileChange}
                    name="file"
                    types={fileTypes}
                  />

                  <label className="text-sm font-medium">Store Name</label>
                  <input
                    value={storeName}
                    onChange={(e) => setStorename(e.target.value)}
                    type="text"
                    placeholder="Zetsy"
                    className="border text-sm p-2"
                  />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleNewStore()}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

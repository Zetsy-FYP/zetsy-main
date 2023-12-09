import React, { useContext, useEffect } from "react";
import { StoreUsersContext } from "../../contexts/StoreUsers";

export default function DUsers() {
  const { storeUsers, dispatch } = useContext(StoreUsersContext);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/user/store/${storeUsers.activeStore._id}`
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "SET_STORE_USERS",
          payload: data,
        })
      )
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div className="flex flex-row justify-between mb-5">
        <div className="font-medium text-sm">Store Users</div>
        <button className="bg-slate-950 text-gray-50 px-3 py-1 text-sm">
          Invite User
        </button>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {storeUsers.users.map((user, index) => {
              return (
                <tr
                  kye={index}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.email}
                  </th>
                  <td class="px-6 py-4">Dynamic Role</td>
                  <td class="px-6 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

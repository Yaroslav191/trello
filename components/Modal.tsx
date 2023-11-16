"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { CheckBadgeIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { databases, storage } from "@/appwrite";
import { v4 as uuidv4 } from "uuid";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";

function Modal() {
   const [isOpen, closeModal] = useModalStore((state) => [
      state.isOpen,
      state.closeModal,
   ]);

   const active = "bg-yellow-400 text-white";

   const [isOptionActive, setSIsOptionActive] = useState(false);
   const [optionState, setOptionState] = useState(0);
   const [file, setFile] = useState(null);
   const [title, setTitle] = useState("");

   const id = uuidv4();

   const statuses = ["todo", "inprogress", "done"];

   const onSubmit = (e: any) => {
      e.preventDefault();

      const saveForm = async () => {
         const fileResponse = await storage.createFile(
            process.env.NEXT_PUBLIC_BUCKET_ID!,
            id,
            file
         );

         const documentResponse = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            "6547bad096ffa6018276",
            uuidv4(),
            { title: title, status: statuses[optionState], image: id }
         );

         console.log(fileResponse, documentResponse);
      };

      saveForm();
   };

   const selectOption = (option: number) => {
      setOptionState(option);
   };

   return (
      // Use the `Transition` component at the root level
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog as="form" onClose={closeModal} className="relative z-10">
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0"
                     enterTo="opacity-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                           as="h3"
                           className="text-lg font-medium leading-6 text-gray-900 pb-2"
                        >
                           Add a Task
                        </Dialog.Title>

                        <div className="mb-5">
                           <input
                              type="text"
                              placeholder="Enter a task here..."
                              className="w-full p-2 outline-none border rounded-lg"
                              onChange={(e) => setTitle(e.target.value)}
                           />
                        </div>
                        <TaskTypeRadioGroup />

                        {/* <div
                  className={`flex justify-between items-center cursor-pointer mb-3 shadow-md p-3 rounded-lg ${
                    optionState === 1 ? active : ''
                  }`}
                  onClick={() => selectOption(1)}>
                  <div>
                    <div className="">Todo</div>
                    <div>A new task to be completed</div>
                  </div>
                  <div>
                    <CheckBadgeIcon className="w-7 h-7" />
                  </div>
                </div>

                <div
                  className={`flex justify-between items-center cursor-pointer mb-3 shadow-md p-3 rounded-lg ${
                    optionState === 2 ? active : ''
                  }`}
                  onClick={() => selectOption(2)}>
                  <div>
                    <div className="">In Progress</div>
                    <div>A task that is currently being worked on</div>
                  </div>
                  <div>
                    <CheckBadgeIcon className="w-7 h-7" />
                  </div>
                </div>

                <div
                  className={`flex justify-between items-center cursor-pointer mb-3 shadow-md p-3 rounded-lg ${
                    optionState === 3 ? active : ''
                  }`}
                  onClick={() => selectOption(3)}>
                  <div>
                    <div className="">Done</div>
                    <div>A task that has been completed</div>
                  </div>
                  <div>
                    <CheckBadgeIcon className="w-7 h-7" />
                  </div>
                </div>

                <div className="mt-5 mb-3">
                  <label
                    htmlFor="upload"
                    className="w-full p-5 flex justify-center items-center border rounded-lg cursor-pointer">
                    <PhotoIcon className="w-5 h-5 mr-2" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button className="p-2 bg-gray-200 rounded-lg" type="submit" onClick={onSubmit}>
                  Add Task
                </button> */}
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
}

export default Modal;

"use client";

import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { CheckBadgeIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { databases, storage } from "@/appwrite";
import { v4 as uuidv4 } from "uuid";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { useBoardStore } from "@/store/BoardStore";
import Image from "next/image";

function Modal() {
   const imagePickerRef = useRef<HTMLInputElement>(null);

   const [isOpen, closeModal] = useModalStore((state) => [
      state.isOpen,
      state.closeModal,
   ]);

   const [
      newTaskInput,
      setNewTaskInput,
      setImage,
      image,
      addTask,
      newTaskType,
   ] = useBoardStore((state) => [
      state.newTaskType,
      state.setNewTaskType,
      state.setImage,
      state.image,
      state.addTask,
      state.newTaskType,
   ]);

   const id = uuidv4();

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newTaskInput) return;

      addTask(newTaskInput, newTaskType, image);

      // const saveForm = async () => {
      //    const fileResponse = await storage.createFile(
      //       process.env.NEXT_PUBLIC_BUCKET_ID!,
      //       id,
      //       file
      //    );

      //    const documentResponse = await databases.createDocument(
      //       process.env.NEXT_PUBLIC_DATABASE_ID!,
      //       "6547bad096ffa6018276",
      //       uuidv4(),
      //       { title: title, status: statuses[optionState], image: id }
      //    );

      //    console.log(fileResponse, documentResponse);
      // };

      // saveForm();
   };

   return (
      // Use the `Transition` component at the root level
      <Transition appear show={isOpen} as={Fragment}>
         <Dialog
            as="form"
            onClose={closeModal}
            onSubmit={handleSubmit}
            className="relative z-10"
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
                              value={newTaskInput}
                              onChange={(e) => setNewTaskInput(e.target.value)}
                           />
                        </div>
                        <TaskTypeRadioGroup />

                        <div>
                           <button
                              onClick={(e) => {
                                 e.preventDefault();
                                 imagePickerRef.current?.click();
                              }}
                              className="w-full border borded-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                           >
                              <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                              Upload Image
                           </button>
                           {image && (
                              <Image
                                 src={URL.createObjectURL(image)}
                                 width={200}
                                 height={200}
                                 alt="Upload image"
                                 className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                                 onClick={() => setImage(null)}
                              />
                           )}
                           <input
                              type="file"
                              ref={imagePickerRef}
                              hidden
                              onChange={(e) => {
                                 if (
                                    !e.target.files![0].type.startsWith(
                                       "image/"
                                    )
                                 )
                                    return;
                                 setImage(e.target.files![0]);
                              }}
                           />
                        </div>
                        <div className="mt-4">
                           <button
                              type="submit"
                              disabled={!newTaskInput}
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4
                           py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                           focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                           >
                              Add Task
                           </button>
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
}

export default Modal;

"use client";

import { useState, Fragment } from "react";

import { useModalStore } from "@/store/ModalStore";
import { CheckBadgeIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { databases, storage } from "@/appwrite";
import { v4 as uuidv4 } from "uuid";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { Dialog, Transition } from "@headlessui/react";

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const active = "bg-yellow-400 text-white";

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
        file as any
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
          leaveTo="opacity-0">
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
              leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2">
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;

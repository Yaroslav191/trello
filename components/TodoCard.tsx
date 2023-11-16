"use client";

import { useBoardStore } from "@/store/BoardStore";
import {
   DraggableProvidedDragHandleProps,
   DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";
import { XCircleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

type Props = {
   todo: Todo;
   index: number;
   id: TypedColumn;
   innerRef: (element: HTMLElement | null) => void;
   draggableProps: DraggableProvidedDraggableProps;
   dragHandleProps: DraggableProvidedDragHandleProps;
};

function TodoCard({
   todo,
   index,
   id,
   innerRef,
   draggableProps,
   dragHandleProps,
}: Props) {
   const deleteTask = useBoardStore((state) => state.deleteTask);
   return (
      <div
         className="bg-white rounded-md space-y-2 drop-shadow-md"
         {...draggableProps}
         {...dragHandleProps}
         ref={innerRef}
      >
         <div className="flex justify-between items-center p-5">
            <p>{todo.title}</p>

            <button
               onClick={() => deleteTask(index, todo, id)}
               className="text-red-500 hover:text-red-600"
            >
               <XCircleIcon className="ml-5 h-8 w-8" />
            </button>
         </div>
         {todo.image && (
            <Image
               src={todo.image}
               width={500}
               height={400}
               alt="Picture of the author"
            />
         )}
      </div>
   );
}

export default TodoCard;

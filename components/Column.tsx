import React from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
   todos: Todo[];
   index: number;
};

function Column({ id, todos, index }: Props) {
   return (
      <Draggable draggableId={id} index={index}>
         {(provided) => (
            <div
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               ref={provided.innerRef}
            >
               <Draggable draggableId={index.toString()} type="card">
                  {(provided, snapshot) => (
                     <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={`p-2 rounded-2xl shadow-sm ${
                           snapshot.draggingOver
                              ? "bg-green-200"
                              : "bg-white/50"
                        }`}
                     ></div>
                  )}
               </Draggable>
            </div>
         )}
      </Draggable>
   );
}

export default Column;

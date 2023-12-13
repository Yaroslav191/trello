import { ID, databases, storage } from '@/appwrite';
import uploadImage from '@/lib/fileUpload';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (str: string) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  newTaskInput: string;
  setNewTaskInput: (title: string) => void
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: columnId },
    );
  },
  searchString: '',
  newTaskType: 'todo',
  image: null,
  setImage: (image: File | null) => set({image}),
  newTaskInput: "",
  setNewTaskInput: (newTaskInput: string) => set({newTaskInput}),
  setSearchString: (searchString) => set({ searchString }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns)

    newColumns.get(id)?.todos.splice(taskIndex, 1)

    set({board: {columns: newColumns}})

    if(todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fieldId)
    }

    await databases.deleteDocument(      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,)
  },

  setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId}),
  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    if(image) {
      const fileUplaod = await uploadImage(image);
      if(fileUplaod) {
        file = {
          bucketId: fileUplaod.bucketId,
          fileId: fileUplaod.$id
        }
      }
    }

    const {$id} = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {title:todo,
        status: columnId,
        ...(file && {image: JSON.stringify(file)})
      }
    )

    set({newTaskInput: ""});

    set((state) => {
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && {image: file})
      }

      const column = newColumns.get(columnId)

      if(!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo]
        })
      }
      else {
        newColumns.get(columnId)?.todos.push(newTodo)
      }

      return {
        board: {
          columns: newColumns
        }
      }
    })
  }
}));

"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Check } from "lucide-react";

export default function TodosPage() {
  const [todos, setTodos] = useState([
    { id: "1", text: "Review project documentation", completed: true },
    { id: "2", text: "Update timesheet", completed: false },
    { id: "3", text: "Schedule 1:1 with manager", completed: false },
    { id: "4", text: "Complete online training module", completed: false },
  ]);

  const [newTodoText, setNewTodoText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addTodo = () => {
    if (!newTodoText.trim()) return;

    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: newTodoText,
        completed: false,
      },
    ]);

    setNewTodoText("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">To-Do List</h1>
        <p className="text-gray-400">
          {completedCount} of {todos.length} tasks completed
        </p>
      </div>

      {/* Add Todo */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={addTodo}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-600 hover:border-red-400"
              }`}
            >
              {todo.completed && (
                <Check className="w-4 h-4 text-white" />
              )}
            </button>

            <span
              className={`flex-1 ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "text-white"
              }`}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {todos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No tasks yet. Add one to get started!
        </div>
      )}
    </div>
  );
}





// "use client";

// import { useState } from "react";
// import { Plus, X, Check, Trash2 } from "lucide-react";

// export default function TodosPage() {
//   const [todos, setTodos] = useState([
//     { id: "1", title: "Review project documentation", completed: true },
//     { id: "2", title: "Update timesheet", completed: false },
//     { id: "3", title: "Schedule 1:1 with manager", completed: false },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [newTodo, setNewTodo] = useState("");

//   const addTodo = () => {
//     if (!newTodo.trim()) return;

//     setTodos([
//       { id: Date.now().toString(), title: newTodo, completed: false },
//       ...todos,
//     ]);

//     setNewTodo("");
//     setShowModal(false);
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const completedCount = todos.filter((t) => t.completed).length;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-semibold">My To-Dos</h1>
//           <p className="text-gray-400">
//             {completedCount} of {todos.length} completed
//           </p>
//         </div>

//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
//         >
//           <Plus className="w-5 h-5" />
//           Add Todo
//         </button>
//       </div>

//       {/* Todo List */}
//       <div className="space-y-3">
//         {todos.map((todo) => (
//           <div
//             key={todo.id}
//             className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4"
//           >
//             <button
//               onClick={() => toggleTodo(todo.id)}
//               className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
//                 todo.completed
//                   ? "bg-green-500 border-green-500"
//                   : "border-gray-600 hover:border-green-400"
//               }`}
//             >
//               {todo.completed && (
//                 <Check className="w-4 h-4 text-white" />
//               )}
//             </button>

//             <span
//               className={`flex-1 ${
//                 todo.completed
//                   ? "line-through text-gray-500"
//                   : "text-white"
//               }`}
//             >
//               {todo.title}
//             </span>

//             <button
//               onClick={() => deleteTodo(todo.id)}
//               className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-800 rounded-lg"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {todos.length === 0 && (
//         <div className="text-center py-12 text-gray-500">
//           No todos yet. Add one to get started.
//         </div>
//       )}

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-semibold">Add New Todo</h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <input
//               type="text"
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//               placeholder="Enter todo title..."
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
//             />

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={addTodo}
//                 className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
//               >
//                 Add Todo
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

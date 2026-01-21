export default function Logo() {
  return (
    <div className=" mx-5 ml-3 flex items-center  gap-2">
      <div className="bg-red-600 h-fit w-fit p-3 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-folder-kanban w-6 h-6 text-white"
          aria-hidden="true"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
          <path d="M8 10v4"></path>
          <path d="M12 10v2"></path>
          <path d="M16 10v6"></path>
        </svg>
      </div>

      <div className="text-lg">
        <p>Client Portal</p>
      </div>
    </div>
  );
}

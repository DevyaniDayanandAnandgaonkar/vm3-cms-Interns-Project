import { Card, CardHeader } from "../ui/card";
import UpdateClientDataForm from "./UpdateClientDataForm";

export default function ClientInfo() {
  return (
    <Card className="p-5 mt-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div>
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
              className="lucide lucide-user w-5 h-5 text-gray-700"
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>Basic Information</div>
        </div>

        <div>
          <UpdateClientDataForm />
        </div>
      </div>

      <div className="flex gap-100 mt-4 mb-4">
        <div className="flex flex-col ">
          <p className="font-semibold">Company Name</p>
          <p>Tech Corp Inc.</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Contact Person</p>
          <p>John Doe</p>
        </div>
      </div>

      <div className="flex gap-90 ">
        <div className="flex flex-col ">
          <p className="font-semibold">Email Address</p>
          <p>Contact@example.com</p>
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold">Phone Number</p>
          <p>+1 234 567 8901</p>
        </div>
      </div>

      <div>
        <div className="flex flex-col mb-5 ">
          <p className="font-semibold">Address</p>
          <p>1234 Tech Street, Silicon Valley, CA</p>
        </div>
      </div>
    </Card>
  );
}

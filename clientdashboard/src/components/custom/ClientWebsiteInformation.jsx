import { Card } from "../ui/card";
import UpdateWebsiteInformation from "./UpdateWebsiteInformation";

export default function ClientWebsiteInformation() {
  return (
    <Card className={"mt-5 p-4"}>
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
              className="lucide lucide-globe w-5 h-5 text-blue-600"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          <div> Website Information</div>
        </div>
        <UpdateWebsiteInformation />
      </div>

      <div className="flex gap-100 mt-4 mb-4">
        <div className="flex flex-col ">
          <p className="font-semibold">Website URL</p>
          <p>https://example.com</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Domain Provider</p>
          <p>Go Daddy</p>
        </div>
      </div>

      <div className="flex gap-115 ">
        <div className="flex flex-col ">
          <p className="font-semibold">User Id</p>
          <p>client_admin</p>
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold">Password</p>
          <p>client123</p>
        </div>
      </div>

      <div className="flex gap-100 ">
        <div className="flex flex-col ">
          <p className="font-semibold">Email Address</p>
          <p>admin@example.com</p>
        </div>
        <div className="flex flex-col ">
          <p className="font-semibold">OTP Enabled</p>
          <p>enabled</p>
        </div>
      </div>
    </Card>
  );
}

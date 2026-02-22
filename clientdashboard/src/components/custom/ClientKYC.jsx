import { Card } from "../ui/card";

export default function ClientKYC({ data }) {
  const isVerified = data?.kyc_verified === 1;

  return (
    <Card className="p-5 mt-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
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
              className="lucide lucide-shield w-5 h-5 text-blue-600"
              aria-hidden="true"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
          </div>
          <div>
            <p>KYC Verification</p>
          </div>
        </div>
        <div>
          <p
            className={`border p-0.5 rounded-xl text-[13px] ${isVerified
                ? "text-green-600 border-green-300 bg-green-50"
                : "text-yellow-600 border-yellow-300 bg-yellow-50"
              }`}
          >
            {isVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-500">
          {isVerified
            ? "Your KYC Verification Complete and Approved"
            : "Your KYC Verification is pending"}
        </p>
      </div>
    </Card>
  );
}

import { Card } from "../ui/card";

export default function ClientBrandingAssets() {
  const colordata = [
    { color: "#2563EB" },
    { color: "#10B981" },
    { color: "#F59E0B" },
    { color: "#6B7280" },
  ];
  return (
    <Card className="p-5 mt-5">
      <div className="flex gap-3 ">
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
            className="lucide lucide-palette w-5 h-5 text-gray-700"
            aria-hidden="true"
          >
            <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"></path>
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </svg>
        </div>
        <div>
          <p className="text-[18px]">Branding Assets</p>
        </div>
      </div>
      <CompanyLogo />
      <BrandColors colorData={colordata} />
      <div className="flex gap-1  items-center justify-between">
        <BrandGardLines />
        <Pamphletes />
      </div>
    </Card>
  );
}

function CompanyLogo() {
  return (
    <Card className={"mt-5 p-4"}>
      <div>
        <p className="font-semibold">Company Logo</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="p-5 border rounded-2xl w-fit">
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
              className="lucide lucide-building w-12 h-12 text-gray-400"
              aria-hidden="true"
            >
              <path d="M12 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M12 6h.01"></path>
              <path d="M16 10h.01"></path>
              <path d="M16 14h.01"></path>
              <path d="M16 6h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M8 6h.01"></path>
              <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
              <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            </svg>
          </div>
        </div>
        <div>
          <div className="border p-1 rounded-md flex gap-2">
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
                className="lucide lucide-arrow-big-up-dash-icon lucide-arrow-big-up-dash"
              >
                <path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
                <path d="M9 20h6" />
              </svg>
            </div>
            <div> Upload New</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function BrandColors({ colorData }) {
  return (
    <Card className={"mt-5 p-4"}>
      <div className="flex items-center justify-between">
        <p className="font-semibold">Brand Colors Palette</p>
        <button className="text-sm text-blue-600 p-1 border rounded-xl">
          Add New Color
        </button>
      </div>

      <div className="flex gap-5">
        {colorData.map((colorItem, index) => (
          <div key={index}>
            <div
              className={`h-15 w-15 rounded-2xl `}
              style={{ backgroundColor: `${colorItem.color}` }}
            ></div>
            <div>{colorItem.color}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function BrandGardLines() {
  return (
    <Card className={"mt-5 p-4 w-full"}>
      <p>Brand Guidlines</p>
      <div className="border p-1 rounded-xl flex items-center justify-center">
        <div className="flex gap-2  ">
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
              className="lucide lucide-upload w-4 h-4 mr-2"
              aria-hidden="true"
            >
              <path d="M12 3v12"></path>
              <path d="m17 8-5-5-5 5"></path>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            </svg>
          </div>
          <div>
            <p>Upload Guidelines</p>
          </div>
        </div>
      </div>
      <div className="border p-2 rounded-xl flex items-center justify-center">
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
            className="lucide lucide-download w-4 h-4 mr-2"
            aria-hidden="true"
          >
            <path d="M12 15V3"></path>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <path d="m7 10 5 5 5-5"></path>
          </svg>
        </div>
        <div>
          <p>Download Current</p>
        </div>
      </div>
    </Card>
  );
}

function Pamphletes() {
  return (
    <Card className={"mt-5 p-4 w-full"}>
      <p>Pamphletes / Brochures</p>
      <div className="border p-1 rounded-xl flex items-center justify-center">
        <div className="flex gap-2  ">
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
              className="lucide lucide-upload w-4 h-4 mr-2"
              aria-hidden="true"
            >
              <path d="M12 3v12"></path>
              <path d="m17 8-5-5-5 5"></path>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            </svg>
          </div>
          <div>
            <p>Upload Pamphletes</p>
          </div>
        </div>
      </div>
      <div className="border p-2 rounded-xl flex items-center justify-center">
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
            className="lucide lucide-download w-4 h-4 mr-2"
            aria-hidden="true"
          >
            <path d="M12 15V3"></path>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <path d="m7 10 5 5 5-5"></path>
          </svg>
        </div>
        <div>
          <p>Download Current</p>
        </div>
      </div>
    </Card>
  );
}

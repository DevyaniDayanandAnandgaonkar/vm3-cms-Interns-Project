import ClientBrandingAssets from "@/components/custom/ClientBrandingAssets";
import ClientInfo from "@/components/custom/ClientInfo";
import ClientKYC from "@/components/custom/ClientKYC";
import ClientWebsiteInformation from "@/components/custom/ClientWebsiteInformation";

export default function Page() {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Client Profile</h1>
      <p>Manage your company information and branding assets</p>
      <ClientInfo />
      <ClientKYC />
      <ClientBrandingAssets />
      <ClientWebsiteInformation />
    </div>
  );
}

import { IconColorSwatch, IconUserCircle } from "@tabler/icons-react";
import { useAccountDetails } from "../../../../../../lib/userContext";
import { SubHeaders } from "../../../../../Members/Common/Type";
import { BrandingCardGrid } from "./components/BrandingCardGrid";

export const Cards_Branding = ({ commonProps }) => {
  const { account } = useAccountDetails();

  return (
    <>
      <SubHeaders Copy="Branding" ICON={<IconColorSwatch size={30} />} />
      <BrandingCardGrid account={account} commonProps={commonProps} />
    </>
  );
};
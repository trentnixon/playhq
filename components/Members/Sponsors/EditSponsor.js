import { CreateaSponsorForm } from "./TheForm";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";
import { useState } from "react";

export const EditSponsor = ({ Sponsor, setHasEdit, Order }) => {
  // HOOKS
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  
  return (
    <>
      <CreateaSponsorForm
        OBJ={{
          Name: Sponsor.attributes.Name,
          URL: Sponsor.attributes.URL,
          Tagline: Sponsor.attributes.Tagline,
          Logo: Sponsor.attributes.Logo.data.id,
          LogoPath: Sponsor.attributes.Logo.data,
          account: [userAccount.id],
          Create: false,
          UpdateSponsor: Sponsor.id,
          isActive: Sponsor.attributes.isActive,
          Order: Order,
        }}
      />
      <BTN_ONCLICK
        LABEL={`Back`}
        HANDLE={() => {
          setHasEdit(false);
        }}
      />
    </>
  );
};

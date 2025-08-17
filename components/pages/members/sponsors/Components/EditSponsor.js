import { useState } from 'react';
import { CreateaSponsorForm } from '../Form/TheForm';

import { BTN_ONCLICK } from '../../../../Members/Common/utils/Buttons';
import { useAccountDetails } from '../../../../../context/userContext';

export const EditSponsor = ({ Sponsor, setHasEdit, Order }) => {
  // HOOKS
  const { account } = useAccountDetails();
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
          Description: Sponsor.attributes.Description,
          UpdateSponsor: Sponsor.id,
          isActive: Sponsor.attributes.isActive,
          isVideo: Sponsor.attributes.isVideo,
          isArticle: Sponsor.attributes.isArticle,
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

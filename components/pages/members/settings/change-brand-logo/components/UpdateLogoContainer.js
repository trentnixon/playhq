import { useEffect, useState } from "react";
import StrapiImageUploader from "../../../sponsors/Form/ImageUploader";
import { useAccountDetails } from "../../../../../../lib/userContext";

import {
  FindAccountLogo,
  FindAccountTypeOBJ,
  FindAccountLabel,
  FindAccountTypeAPI,
} from "../../../../../../lib/actions";
import { useSetLogo } from "../../../../../../Hooks/useOrganisationLogo";
import { BTN_Upload_CLose } from "./BTN_Upload_CLose";
import { NewLogoImageAndStore } from "./NewLogoImageAndStore";
import { CurrentLogo } from "./CurrentLogo";
import { NewLogoCopy } from "./NewLogoCopy";

export const UpdateBrandLogo = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [uploadLogo, setUploadLogo] = useState(false);
  const [Logo, setLogo] = useState(null);
  const [LogoPath, setLogoPath] = useState(null);
  const [uploadedLogo, setUploadedLogo] = useState(null); // New state for uploaded logo
  const [setLogoToAccount, loading, error] = useSetLogo();

  useEffect(() => {
    if (LogoPath) {
      setUploadLogo(false);
    }
  }, [LogoPath]);

  const saveLogoToAccount = () => {
    const OBJ = {
      data: { Logo: [Logo] },
    };
    setLogoToAccount(
      FindAccountTypeOBJ(userAccount).id,
      OBJ,
      FindAccountTypeAPI(userAccount)
    );
    setUploadedLogo(LogoPath[0]?.url); // Save the path of the newly uploaded logo
    ReRender();
    setLogoPath(null);
    setUploadLogo(false);
  };

  return (
    <>
      <BTN_Upload_CLose uploadLogo={uploadLogo} setUploadLogo={setUploadLogo} />

      {uploadLogo && (
        <StrapiImageUploader
          setLogo={setLogo}
          setLogoPath={setLogoPath}
          SAVEDLOGO={false}
        />
      )}

      {LogoPath ? (
        <NewLogoImageAndStore
          image={LogoPath[0]?.url}
          saveLogoToAccount={saveLogoToAccount}
          setLogoPath={setLogoPath}
        />
      ) : (
        !uploadLogo && (
          <>
            {uploadedLogo ? (
              <CurrentLogo LOGO={uploadedLogo} />
            ) : FindAccountLogo(userAccount) ? (
              <CurrentLogo LOGO={FindAccountLogo(userAccount)} />
            ) : (
              <NewLogoCopy org={FindAccountLabel(userAccount)} />
            )}
          </>
        )
      )}
    </>
  );
};

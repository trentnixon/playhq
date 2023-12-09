import {
  Box,
  Center,
  Group,
  Image,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { P, SubHeaders } from "../Common/Type";
import { useAccountDetails } from "../../../lib/userContext";
import { useEffect, useState } from "react";
import {
  FindAccountLogo,
  FindAccountTypeOBJ,
  FindAccountType,
  FindAccountLabel,
  FindAccountTypeAPI,
} from "../../../lib/actions";

import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { useSetLogo } from "../../../Hooks/useOrganisationLogo";
import { IconUpload } from "@tabler/icons";
import { useMediaQuery } from "@mantine/hooks";
import StrapiImageUploader from "../Sponsors/Form/ImageUploader";
import { IconPhotoFilled } from "@tabler/icons-react";

export const AccountLogo = () => {
  const theme = useMantineTheme();
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
      <SubHeaders Copy={`${FindAccountType(userAccount)} Logo`} ICON={<IconPhotoFilled size={30} />}/>
      <P
        Copy={`
        Upload a high-resolution image of your logo to ensure the best quality representation for your organization.`}
      />
      <Paper
        radius="md"
        shadow="md"
        mb={30}
    
        p="xs"
        sx={(theme) => ({ backgroundColor: theme.white })}
      >
        <Group position="right" mb={20}>
          <BTN_ONCLICK
            LABEL={uploadLogo ? `Close` : `Upload a Logo`}
            THEME={`cta`}
            HANDLE={() => {
              setUploadLogo(!uploadLogo);
            }}
          />
        </Group>

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
      </Paper>
    </>
  );
};

const CurrentLogo = ({ LOGO }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[3],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",

        margin: "20px auto",
      })}
    >
      <Center>
        <Image src={LOGO} width={200} />
      </Center>
    </Box>
  );
};

const NewLogoImageAndStore = ({ image, saveLogoToAccount, setLogoPath }) => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",
        width: "60%",
        margin: "20px auto",
        "&:hover": {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      <Center mb={20}>
        <Image src={image} width={200} />
      </Center>
      <Group position="center">
        <BTN_ONCLICK
          LABEL={`Save Logo`}
          THEME={`cta`}
          HANDLE={saveLogoToAccount}
        />
        <BTN_ONCLICK
          LABEL={`Cancel`}
          THEME={`error`}
          HANDLE={() => {
            setLogoPath(false);
          }}
        />
      </Group>
    </Box>
  );
};

const NewLogoCopy = ({ org }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Group position="center">
      <IconUpload size={"4em"} color={theme.colors.blue[5]} />
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[0],
          textAlign: "center",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: "pointer",
          width: "60%",
          margin: "20px",
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
        })}
      >
        <P
          textAlign={`center`}
          Copy={`Let's get started by uploading a logo for ${org}.`}
        />
        {mobile ? false : <P
          textAlign={`center`}
          Copy={`This logo will be used in the digital assets we create for you, making them unique and personalized. Click the 'upload a logo' button to select a logo from your device.`}
        />}
      </Box>
    </Group>
  );
};

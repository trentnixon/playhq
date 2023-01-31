import { Avatar, Box, Center, Group, Image, Switch } from "@mantine/core";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  useMantineTheme,
} from "@mantine/core";

import { DatePicker } from "@mantine/dates";
import { useEffect, useState } from "react";
import { FixturaLoading } from "../../../components/Members/Common/Loading";
import {
  useCreateSponsor,
  useUpdateSponsor,
} from "../../../Hooks/useSponsorships";
import { UploadSponsorsLogos } from "./ImageUploader";
import { IconCheck } from "@tabler/icons";
import { P } from "../../../components/Members/Common/Type";
import { useAccountDetails } from "../../../lib/userContext";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
const PRIMARY_COL_HEIGHT = 300;

export const CreateaSponsorForm = ({ OBJ }) => {
  // VARS
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  // useState
  const [Logo, setLogo] = useState(false);
  const [LogoPath, setLogoPath] = useState(OBJ.LogoPath);
  // HOOKS
  const [Sponsor, CreateSponsor] = useCreateSponsor();
  const [UpdatedSponsor, UpdateSponsor] = useUpdateSponsor();

  const { ReRender } = useAccountDetails();

  // STATE
  const [FORMMETA, setFORMMETA] = useState(OBJ);
  const [isActive, setisActive] = useState(OBJ.isActive);
  const [formErrors, setFormErrors] = useState({
    Name: "",
    URL: "",
    Tagline: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {
      Name: "",
      URL: "",
      Tagline: "",
    };

    if (!FORMMETA.Name) {
      formIsValid = false;
      errors.Name = "Name is required";
    }

    if (!FORMMETA.URL) {
      formIsValid = false;
      errors.URL = "URL is required";
    }

    if (!FORMMETA.Tagline) {
      formIsValid = false;
      errors.Tagline = "Tagline is required";
    }

    setFormErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data to server
      OBJ.Create
        ? CreateSponsor(FORMMETA)
        : UpdateSponsor(FORMMETA, FORMMETA.UpdateSponsor);
    }
  };

  // USeEffect
  useEffect(() => {
    if (Sponsor?.data || UpdatedSponsor?.data) {
      console.log("RUN RENDER NOW");
      setTimeout(() => {
        ReRender();
      }, 1000);
    }
  }, [Sponsor, UpdatedSponsor]);

  useEffect(() => {
    console.log("Logo", Logo);
    if (Logo) {
      setFORMMETA((prevState) => ({
        ...prevState,
        Logo: Logo,
        LogoPath: LogoPath,
      }));
    }
  }, [Logo]);

  useEffect(() => {
    console.log("isActive", isActive);
    setFORMMETA((prevState) => ({
      ...prevState,
      isActive: isActive,
    }));
  }, [isActive]);

  useEffect(() => {
    console.log("FORMMETA");
    console.log(FORMMETA);
  }, [FORMMETA]);

  const FORMOBJ = [
    {
      Property: "Name",
      value: FORMMETA.Name,
      placeholder: "Sponsors Name",
      error: formErrors.Name,
    },
    {
      Property: "URL",
      value: FORMMETA.URL,
      placeholder: "Sponsors URL",
      error: formErrors.URL,
    },
    {
      Property: "Tagline",
      value: FORMMETA.Tagline,
      placeholder: "Sponsors Tagline",
      error: formErrors.Tagline,
    },
  ];

  if (Sponsor?.data || UpdatedSponsor?.data) {
    return (
      <SponsorCreated
        Sponsor={
          Sponsor?.data === undefined ? UpdatedSponsor?.data : Sponsor?.data
        }
      />
    );
  }
  if (Sponsor === true || UpdatedSponsor === true) {
    return <FixturaLoading />;
  }
  return (
    <Container my="md">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[{ maxWidth: "sm", cols: 1 }]}
          >
            {LogoPath ? (
              <>
                <Box>
                  <DisplayLogo
                    LOGO={FORMMETA.LogoPath ? FORMMETA.LogoPath : LogoPath}
                    setLogoPath={setLogoPath}
                    setLogo={setLogo}
                  />
                </Box>
              </>
            ) : (
              <UploadSponsorsLogos
                setLogo={setLogo}
                setLogoPath={setLogoPath}
                SAVEDLOGO={FORMMETA.LogoPath}
              />
            )}
            <Grid gutter="md">
              <Grid.Col>
                {FORMOBJ.map((Input, i) => {
                  return (
                    <InputContainer
                    key={i}
                      Input={Input}
                      FORMMETA={FORMMETA}
                      setFORMMETA={setFORMMETA}
                    />
                  );
                })}
              </Grid.Col>
              <Grid.Col span={6}>
                <Switch
                  label="Active"
                  checked={isActive}
                  onChange={(event) => setisActive(event.currentTarget.checked)}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <button type="submit" className="btn btn-primary">
                  {OBJ.Create ? "Create" : "Update"}
                </button>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </div>
      </form>
    </Container>
  );
};

export default CreateaSponsorForm


const InputContainer = ({ Input, FORMMETA, setFORMMETA }) => {
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFORMMETA({ ...FORMMETA, [Input.Property]: e.target.value });
    if (Input.Property === "Name") {
      if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
        setError("Name can only contain letters and spaces");
      } else {
        setError(null);
      }
    }
    if (Input.Property === "URL") {
      if (
        !/^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          e.target.value
        )
      ) {
        setError("Invalid URL format");
      } else {
        setError(null);
      }
    }
    if (Input.Property === "Tagline") {
      if (e.target.value.length > 120) {
        setError("Tagline must be less than 120 characters");
      } else {
        setError(null);
      }
    }
  };

  return (
    <Box
      sx={(theme) => ({
        marginBottom: "10px",
      })}
    >
      <input
        type="text"
        className="form-control"
        value={FORMMETA[Input.Property]}
        placeholder={Input.placeholder}
        onChange={handleChange}
      />
      {error && <div className="error">{error}</div>}
    </Box>
  );
};

//  <Date />
function Date() {
  return (
    <DatePicker
      placeholder="Select date"
      label="Sponsorship end date"
      withAsterisk
    />
  );
}

const SponsorCreated = ({ Sponsor }) => {
  console.log(Sponsor);
  return (
    <>
      <Center>
        <Group>
          <Avatar color={"green"} size={80} radius={80}>
            <IconCheck size={40} />
          </Avatar>
          <P
            marginBottom={0}
            Weight={900}
            textTransform={`uppercase`}
            Copy={`Sponsor ${Sponsor.attributes.Name} Created`}
          />
        </Group>
      </Center>
    </>
  );
};

const DisplayLogo = ({ LOGO, setLogoPath }) => {
  const USELOGO =
    LOGO?.attributes?.height === undefined ? LOGO[0] : LOGO.attributes;

  const calculateImageDimensions = (USELOGO) => {
    console.log("USELOGO ", USELOGO);
    const aspectRatio = USELOGO.width / USELOGO.height;
    let newHeight, newWidth;
    if (USELOGO.width > USELOGO.height) {
      newWidth = 200;
      newHeight = 200 / aspectRatio;
    } else {
      newHeight = 200;
      newWidth = 200 * aspectRatio;
    }

    return { newHeight, newWidth };
  };

  const { newHeight, newWidth } = calculateImageDimensions(USELOGO);

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
      })}
    >
       <div style={{ width: 200, marginLeft: 'auto', marginRight: 'auto', marginBottom:'10px' }}>
      <Image
        src={USELOGO.url}
        width={newWidth}
        height={newHeight}
     
        radius={10}
      />
      </div>
      <BTN_ONCLICK
        LABEL={`Change`}
        HANDLE={() => {
          setLogoPath(false);
        }}
      />
    </Box>
  );
};

export function LeadGrid() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <Container my="md">
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

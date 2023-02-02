import { Box, Switch } from "@mantine/core";
import { Container, Grid, SimpleGrid, useMantineTheme } from "@mantine/core";

import { useEffect, useState } from "react";
import { FixturaLoading } from "../Common/Loading";
import {
  useCreateSponsor,
  useUpdateSponsor,
} from "../../../Hooks/useSponsorships";
import { UploadSponsorsLogos } from "./ImageUploader";

import { useAccountDetails } from "../../../lib/userContext";
import { SponsorCreatedConfirm } from "./SponsorCreatedConfirm";
import { DisplaySponsorsLogo } from "./DisplaySponsorsLogo";
import { InputFormContainer } from "./InputFormContainer";
const PRIMARY_COL_HEIGHT = 300;

export const CreateaSponsorForm = ({ OBJ }) => {
  // VARS
  const theme = useMantineTheme();
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
      <SponsorCreatedConfirm
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
    <Container my={50}>
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
                  <DisplaySponsorsLogo
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
                    <InputFormContainer
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

export default CreateaSponsorForm;

import { Box, Group, Stack, Switch } from "@mantine/core";
import { Container, Grid, SimpleGrid, useMantineTheme } from "@mantine/core";
import { Notification } from "@mantine/core";
import { useEffect, useState } from "react";
import { FixturaLoading } from "../../Common/Loading";
import {
  useCreateSponsor,
  useUpdateSponsor,
} from "../../../../Hooks/useSponsorships";
import { StrapiImageUploader } from "./ImageUploader";

import { useAccountDetails } from "../../../../lib/userContext";
import { SponsorCreatedConfirm } from "../Components/SponsorCreatedConfirm";
import { DisplaySponsorsLogo } from "./DisplaySponsorsLogo";
import { InputFormContainer } from "./InputFormContainer";

export const CreateaSponsorForm = ({ OBJ }) => {
  //console.log("OBJ", OBJ);
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
  const [isActiveVideo, setisActiveVideo] = useState(OBJ.isVideo);
  const [isActiveArticle, setisActiveArticle] = useState(OBJ.isArticle);

  const [formErrors, setFormErrors] = useState({
    Name: "",
    URL: "",
  });

  const validateForm = () => {
    let formIsValid = true;
    let errors = {
      Name: "",
      URL: "",
    };

    if (!FORMMETA.Name) {
      formIsValid = false;
      errors.Name = "Name is required";
    }

    if (!FORMMETA.URL) {
      formIsValid = false;
      errors.URL = "URL is required";
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
    } else {
      // Display a notification to the user
      alert("Please fill out all mandatory fields before submitting.");
      // You can replace this alert with a more user-friendly toast or modal notification if you prefer.
    }
  };

  // USeEffect
  useEffect(() => {
    if (Sponsor?.data || UpdatedSponsor?.data) {
      //console.log("RUN RENDER NOW");
      setTimeout(() => {
        ReRender();
      }, 1000);
    }
  }, [Sponsor, UpdatedSponsor]);

  useEffect(() => {
    //console.log("Logo", Logo);
    if (Logo) {
      setFORMMETA((prevState) => ({
        ...prevState,
        Logo: Logo,
        LogoPath: LogoPath,
      }));
    }
  }, [Logo]);

  useEffect(() => {
    //console.log("isActive", isActive);
    setFORMMETA((prevState) => ({
      ...prevState,
      isActive: isActive,
    }));
  }, [isActive]);

  useEffect(() => {
    //console.log("isActiveArticle", isActiveArticle);
    setFORMMETA((prevState) => ({
      ...prevState,
      isArticle: isActiveArticle,
    }));
  }, [isActiveArticle]);

  useEffect(() => {
    //console.log("isActiveVideo", isActiveVideo);
    setFORMMETA((prevState) => ({
      ...prevState,
      isVideo: isActiveVideo,
    }));
  }, [isActiveVideo]);

  useEffect(() => {}, [FORMMETA]);

  const FORMOBJ = [
    {
      Property: "Name",
      value: FORMMETA.Name,
      placeholder: "Sponsors Name",
      error: formErrors.Name,
      title: "Sponsor Name",
      info: "Enter the official name of the sponsor.",
      isRequired: true,
      type: "text",
      //pattern: "^[a-zA-Zs]*$", // regex for only letters and spaces
    },
    {
      Property: "URL",
      type: "text", // Changing this to 'text' since we're using a custom pattern
      pattern:
        "^(https?://)?(www.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$",

      value: FORMMETA.URL,
      placeholder: "Sponsors URL",
      error: formErrors.URL,
      title: "Sponsor URL",
      info: "Enter the official website or landing page of the sponsor.",
      isRequired: true,
    },
    {
      Property: "Tagline",
      value: FORMMETA.Tagline,
      placeholder: "Sponsors Tagline",
      type: "text",
      maxLength: 120,
      title: "Sponsor Tagline",
      info: "A brief catchy phrase associated with the sponsor. (optional)",
    } /* ,
    {
      Property: "Description",
      value: FORMMETA.Description,
      placeholder: "Sponsor description",
      error: formErrors.Description,
      title: "Sponsor Description",
      info: "Provide a short description about the sponsor. Max 120 characters.",
      limit: 120,
    }, */,
  ];

  if (Sponsor?.data || UpdatedSponsor?.data) {
    return (
      <SponsorCreatedConfirm
        setIsCreate={OBJ.setIsCreate}
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
            <div>
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
                <StrapiImageUploader
                  setLogo={setLogo}
                  setLogoPath={setLogoPath}
                  SAVEDLOGO={FORMMETA.LogoPath}
                />
              )}
            </div>
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
                <Stack mt="xs" mx={10}>
                  <Switch
                    label="Include this sponsor in the videos?"
                    checked={isActiveVideo}
                    onChange={(event) =>
                      setisActiveVideo(event.currentTarget.checked)
                    }
                  />
                  <Switch
                    label="Include this sponsor in the Articles?"
                    checked={isActiveArticle}
                    onChange={(event) =>
                      setisActiveArticle(event.currentTarget.checked)
                    }
                  />
                  <Switch
                    label="Is this Sponsor Active?"
                    checked={isActive}
                    onChange={(event) =>
                      setisActive(event.currentTarget.checked)
                    }
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col span={12}>
                <Group position="right">
                  <button
                    type="submit"
                    className={
                      !LogoPath ? "btn btn-secondary" : "btn btn-primary"
                    }
                    disabled={!LogoPath} // this disables the button if LogoPath is falsy
                  >
                    {OBJ.Create ? "Create" : "Update"}
                  </button>
                </Group>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </div>
      </form>
    </Container>
  );
};

export default CreateaSponsorForm;

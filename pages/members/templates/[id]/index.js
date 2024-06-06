import { useRouter } from "next/router";
import cookie from "cookie";
import { fetcher } from "../../../../lib/api";
import SecureRouteHOC from "../../../../components/Layouts/members/security/SecureRouteHC";
import { PageMetaData } from "../../../../components/Layouts/members/Meta/pageMetaData";
import { PageTitle } from "../../../../components/Members/Common/Type";
import { IconColorPicker } from "@tabler/icons-react";
import { useAccountDetails } from "../../../../lib/userContext";
import { useState, useEffect } from "react";
import { RoundedSectionContainer } from "../../../../components/UI/Containers/SectionContainer";
import { PrefabPlayerGrid } from "../../../../components/Members/GraphicsPackage/PrefabPlayerGrid";
import { useAssignDesignElement } from "../../../../Hooks/useCustomizer";
import TemplateError from "../../../../components/pages/members/templates/TemplateError";
import TemplateDetails from "../../../../components/pages/members/templates/TemplateDetails";
import { TemplateProvider, useTemplate } from "../../../../lib/TemplateContext"; // Import the context
import TemplateCTABtns from "../../../../components/pages/members/templates/TemplateCTABtns";

const qs = require("qs");

const query = qs.stringify(
  {
    populate: ["Poster", "Gallery", "Video","bundle_audio","bundle_audio.audio_options"],
  },
  {
    encodeValuesOnly: true,
  } 
);

const TemplateDetailPageContent = (props) => {
  
  const { template } = props;
  const { attributes } = template || {};
  const { Poster, Name, FrontEndName, Description } = attributes || {};

  console.log("props ", Poster, Name, FrontEndName, Description)
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const { setTemplate } = useTemplate(); // Use the context

  const router = useRouter();
  const { id } = router.query || {};

  const MetaOBJ = {
    title: "Member Dashboard - Fixtura: Your Control Center",
    description:
      "Access your member dashboard on Fixtura to manage and overview your sports club's digital media activities.",
    keywords:
      "Member dashboard, Fixtura control panel, sports media overview, club content management, digital hub",
  };

  const handleBackClick = () => {
    router.push("/members/templates");
  };

  const handleSelectTemplate = async () => {
    setLoading(true);
    setError(null); // Clear previous error
    try {
      await CreateDesignElement({
        CollectionSaveTo: "accounts",
        Body: [template.id],
        COLLECTIONID: userAccount.id,
        RelationProperty: "template",
      });
      await ReRender();
    } catch (err) {
      setError("Failed to select the template. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUserAccount(account);
    setTemplate(template); // Set the template in the context
  }, [account, template, setTemplate]);

  const isSelectedTemplate =
    userAccount?.attributes?.template?.data?.id === template?.id;

  if (!template) {
    return <TemplateError />;
  }

  return (
    <SecureRouteHOC conditions={[template, userAccount]}>
      <PageMetaData MetaOBJ={MetaOBJ} />
      {Name && <PageTitle Copy={Name} ICON={<IconColorPicker size={40} />} />}
      {Description && (
        <RoundedSectionContainer
          headerContent=""
          topContent={
            <TemplateDetails
              FrontEndName={FrontEndName}
              Description={Description}
              Poster={Poster}
              Name={Name}
            />
          }
          bottomContent={
            <>
              <TemplateCTABtns
                loading={loading}
                handleBackClick={handleBackClick}
                handleSelectTemplate={handleSelectTemplate}
                isSelectedTemplate={isSelectedTemplate}
                error={error}
              />
              <PrefabPlayerGrid />
              <TemplateCTABtns
                loading={loading}
                handleBackClick={handleBackClick}
                handleSelectTemplate={handleSelectTemplate}
                isSelectedTemplate={isSelectedTemplate}
                error={error}
              />
            </>
          }
        />
      )}
    </SecureRouteHOC>
  );
};

export default function TemplateDetailPage(props) {
  return (
    <TemplateProvider>
      <TemplateDetailPageContent {...props} />
    </TemplateProvider>
  );
}

export async function getServerSideProps(ctx) {
  try {
    // Parse cookies from the incoming headers
    const parsedCookies = cookie.parse(ctx.req.headers.cookie || "");
    const jwt = parsedCookies["jwt"]; // Use the actual key you set the JWT cookie with

    // Extract the id from the URL
    const { id } = ctx.params;

    // Fetch the template data from the API
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/templates/${id}?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    if (!response || !response.data) {
      throw new Error("Template not found.");
    }

    const template = response.data;

    return { props: { template } }; // Return the template data as props
  } catch (error) {
    return { props: { error: error.message } }; // Return the error message as a prop
  }
}

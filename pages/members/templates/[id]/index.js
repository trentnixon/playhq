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
import { PrefabPlayerGridMembers } from "../../../../components/Common/live-demo/Template/PrefabPlayerGridMembers";
import { useAssignDesignElement } from "../../../../Hooks/useCustomizer";
import TemplateError from "../../../../components/pages/members/templates/TemplateError";
import TemplateDetails from "../../../../components/pages/members/templates/TemplateDetails";
import { TemplateProvider, useTemplate } from "../../../../lib/TemplateContext";
import TemplateCTABtns from "../../../../components/Common/live-demo/Template/TemplateCTABtns";

const qs = require("qs");

const query = qs.stringify(
  {
    populate: [
      "Poster",
      "Gallery",
      "Video",
      "bundle_audio",
      "bundle_audio.audio_options",
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

const MetaOBJ = {
  title: "Member Dashboard - Fixtura: Your Control Center",
  description:
    "Access your member dashboard on Fixtura to manage and overview your sports club's digital media activities.",
  keywords:
    "Member dashboard, Fixtura control panel, sports media overview, club content management, digital hub",
};

const TemplateDetailPageContent = ({ template }) => {
  const { attributes } = template || {};
  const { Poster, Name, FrontEndName, Description } = attributes || {};
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const { setTemplate } = useTemplate();
  const router = useRouter();
  const { id } = router.query || {};

  useEffect(() => {
    setUserAccount(account);
    setTemplate(template);
  }, [account, template, setTemplate]);

  const handleBackClick = () => {
    router.push("/members/templates");
  };

  const handleSelectTemplate = async () => {
    setLoading(true);
    setError(null);
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

  const isSelectedTemplate =
    userAccount?.attributes?.template?.data?.id === template?.id;

  if (!template) {
    return <TemplateError />;
  }

  const renderTemplateDetails = () => (
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
          <CTAButtonGroup
            loading={loading}
            handleBackClick={handleBackClick}
            handleSelectTemplate={handleSelectTemplate}
            isSelectedTemplate={isSelectedTemplate}
            error={error}
          />

          <PrefabPlayerGridMembers />
          <CTAButtonGroup
            loading={loading}
            handleBackClick={handleBackClick}
            handleSelectTemplate={handleSelectTemplate}
            isSelectedTemplate={isSelectedTemplate}
            error={error}
          />
        </>
      }
    />
  );

  return (
    <SecureRouteHOC conditions={[template, userAccount]}>
      <PageMetaData MetaOBJ={MetaOBJ} />
      {Name && <PageTitle Copy={Name} ICON={<IconColorPicker size={40} />} />}
      {Description && renderTemplateDetails()}
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
    const parsedCookies = cookie.parse(ctx.req.headers.cookie || "");
    const jwt = parsedCookies["jwt"];
    const { id } = ctx.params;

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

    return { props: { template: response.data } };
  } catch (error) {
    return { props: { error: error.message } };
  }
}

const CTAButtonGroup = (props) => {
  const {
    loading,
    handleBackClick,
    handleSelectTemplate,
    isSelectedTemplate,
    error,
  } = props;
  return (
    <TemplateCTABtns
      loading={loading}
      handleBackClick={handleBackClick}
      handleSelectTemplate={handleSelectTemplate}
      isSelectedTemplate={isSelectedTemplate}
      error={error}
    />
  );
};

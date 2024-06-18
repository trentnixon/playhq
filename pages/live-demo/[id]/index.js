import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import { PageMetaData } from "../../../components/Layouts/members/Meta/pageMetaData";
import { PageTitle } from "../../../components/Members/Common/Type";
import { IconColorPicker } from "@tabler/icons-react";
import TemplateError from "../../../components/pages/members/templates/TemplateError";
import TemplateDetails from "../../../components/pages/members/templates/TemplateDetails";
import { TemplateProvider, useTemplate } from "../../../lib/TemplateContext";
import TemplateCTABtns from "../../../components/Common/live-demo/Template/TemplateCTABtns";
import LiveDemoBanner from "../../../components/Freetrial/LiveDemoBanner";
import Section from "../../../components/UI/DefaultSection";
import { PrefabPlayerGridLiveDemo } from "../../../components/pages/public/templates/template/PrefabPlayerGridLiveDemo";
import { RoundedSectionContainer } from "../../../components/UI/Containers/SectionContainer";
import { fetcher } from "../../../lib/api";
import PageBanner from "../../../components/Common/PageBanner";

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
  title: "Live Demo",
  description:
    "Access your member dashboard on Fixtura to manage and overview your sports club's digital media activities.",
  keywords:
    "Member dashboard, Fixtura control panel, sports media overview, club content management, digital hub",
};

const TemplateDetailPageContent = (props) => {
  const { template, userAccount } = props;
  const { attributes } = template || {};
  const { Poster, Name, FrontEndName, Description } = attributes || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setTemplate } = useTemplate();
  const router = useRouter();

  useEffect(() => {
    setTemplate(template);
  }, [template, setTemplate]);

  const handleBackClick = () => {
    router.push("/live-demo/");
  };

  const handleSelectTemplate = async () => {
    router.push("/sign-up/");
  };

  const isSelectedTemplate = false;

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
          <TemplateCTABtns
            loading={loading}
            handleBackClick={handleBackClick}
            handleSelectTemplate={handleSelectTemplate}
            isSelectedTemplate={isSelectedTemplate}
            error={error}
          />
          <PrefabPlayerGridLiveDemo account={userAccount} />
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
  );

  const SectionData = {
    title: "Preview your Design",
    paragraphs: [
      `Select an asset type from the dropdown menu to preview the video and images for your chosen template. For more features and to customize the templates to your club’s theme, sign up for a free account.

`,
    ],
  };

  return (
    <>
      <PageBanner pageTitle={`Template: ${template.attributes.Category}`} />
      <Section {...SectionData} color="grey">
        <Container>
          <PageMetaData MetaOBJ={MetaOBJ} />
          {Name && (
            <PageTitle Copy={Name} ICON={<IconColorPicker size={40} />} />
          )}
          {Description && renderTemplateDetails()}
        </Container>
      </Section>
    </>
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
    const { id } = ctx.params;

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/templates/${id}?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response || !response.data) {
      throw new Error("Template not found.");
    }

    const template = response.data;

    // Simulated userAccount object
    const userAccount = {
      id: 1,
      attributes: {
        FirstName: "Fixtura Sports Club",
        Sport: "Cricket",
        account_type: {
          data: {
            attributes: {
              Name: "Association",
            },
          },
        },
        associations: {
          data: [
            {
              id: 1,
              attributes: {
                Name: "Fixtura Sports Club",
                updatedAt: "2024-02-09T05:09:08.006Z",
                publishedAt: "2023-07-01T03:09:50.940Z",
                PlayHQID: "000000",
                ParentLogo:
                  "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_Blue_on_transparent_1df3fe6440.png",
                hasPlayhqLogoStored: true,
                Sport: "Cricket",
                trial_instance: {
                  data: null,
                },
                Logo: {
                  data: {
                    id: 926,
                    attributes: {
                      width: 128,
                      height: 128,
                      formats: null,

                      size: 5.75,
                      url: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_Blue_on_transparent_1df3fe6440.png",
                    },
                  },
                },
              },
            },
          ],
        },
        clubs: {
          data: [],
        },
        template: {
          data: {
            id: 12,
            attributes: {
              Name: "CNSW",
              updatedAt: "2024-06-06T01:48:46.290Z",
              publishedAt: "2023-12-08T00:35:57.362Z",
              Category: "CNSW",
              Variation: "Gradient",
              FrontEndName: "Gradient",
              Description:
                "The gradient background option adds a contemporary and stylish gradient overlay, giving depth and a modern edge to the presentation. This design is particularly effective on digital platforms, capturing the viewer’s attention with its blend of colors that symbolize the club's dynamism. It's well-suited for clubs looking to present their data with a mix of sophistication and trendiness.",
              requiresMedia: false,
              TemplateVariation: {
                Background: "Gradient",
              },
              DiviedFixturesBy: {
                UpComingFixtures: 4,
                WeekendResults: 4,
                WeekendSingleGameResult: 1,
                Ladder: 1,
                RosterPoster: 1,
              },
              bundle_audio: {
                data: {
                  id: 2,
                  attributes: {
                    Name: "CNSW Audio Bundle",
                    updatedAt: "2023-12-01T01:47:10.749Z",
                    publishedAt: "2023-12-01T01:47:10.747Z",
                    audio_options: {
                      data: [
                        {
                          id: 6,
                          attributes: {
                            Name: "Free The People_Moonlight",
                            updatedAt: "2023-12-08T01:05:28.076Z",
                            publishedAt: "2023-12-01T01:46:00.813Z",
                            URL: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Free_The_People_Moonlight_Instrumental_1701394307461_mixdown_24f07b8a36.mp3",
                            CompositionID: "UpComingFixtures",
                            ComponentName: "UpComing Fixtures",
                          },
                        },
                        {
                          id: 7,
                          attributes: {
                            Name: "Theres No Stopping Us",
                            updatedAt: "2023-12-02T01:47:10.682Z",
                            publishedAt: "2023-12-01T01:46:42.964Z",
                            URL: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Audiio_Jared_Marc_Theres_No_Stopping_Us_Come_Out_And_Play_Alt_Version_c1c90e4960.mp3",
                            CompositionID: "WeekendResults",
                            ComponentName: "Weekend Results",
                          },
                        },
                        {
                          id: 8,
                          attributes: {
                            Name: "Speed Out burst",
                            updatedAt: "2023-12-02T01:47:28.510Z",
                            publishedAt: "2023-12-01T01:48:00.149Z",
                            URL: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Audiio_Marscott_Readyand_Go_Speed_Outburst_Inst_fb6bfe8381.mp3",
                            CompositionID: "Top5BattingList",
                            ComponentName: "Top 5 Batting",
                          },
                        },
                        {
                          id: 9,
                          attributes: {
                            Name: "Jack out",
                            updatedAt: "2023-12-08T01:14:33.958Z",
                            publishedAt: "2023-12-01T01:48:31.820Z",
                            URL: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Audiio_Simon_Osterhold_poprockvol1_Jack_it_out_a927e941f5.mp3",
                            CompositionID: "Top5BowlingList",
                            ComponentName: "Top 5 Bowling",
                          },
                        },
                        {
                          id: 10,
                          attributes: {
                            Name: "Ill BeAlright",
                            updatedAt: "2023-12-02T01:47:39.492Z",
                            publishedAt: "2023-12-01T01:48:54.706Z",
                            URL: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Audiio_Tate_Kirgiss_Analog_Inspired_Ill_Be_Alright_Inst_8d6691a7ca.mp3",
                            CompositionID: "Ladder",
                            ComponentName: "Ladder",
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
        theme: {
          data: {
            id: 85,
            attributes: {
              Name: "Fixtura Live Demo",
              updatedAt: "2024-01-31T03:32:23.350Z",
              publishedAt: "2024-01-31T03:32:23.348Z",
              Theme: {
                primary: "#1b81cb",
                secondary: "#ffffff",
                dark: "#111",
                white: "#FFF",
              },
              CreatedBy: 273,
              isPublic: false,
            },
          },
        },

        sponsors: {
          data: [],
        },
        account_media_libraries: {
          data: [
            {
              id: 139,
              attributes: {
                isActive: true,
                AgeGroup: "Both",
                AssetType: "All",
                markerPosition: [],
                imageId: {
                  data: {
                    id: 10507,
                    attributes: {
                      width: 2494,
                      height: 3325,
                      url: "https://fixtura.s3.ap-southeast-2.amazonaws.com/pro_z5h53_Zg_P_d1d71f3dba.jpeg",
                    },
                  },
                },
              },
            },
          ],
        },
      },
    };

    return { props: { template, userAccount } }; // Return the template data and simulated user account as props
  } catch (error) {
    return { props: { error: error.message } }; // Return the error message as a prop
  }
}

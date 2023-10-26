import React, { useEffect } from "react";
import PageBanner from "../components/Common/PageBanner";
import { useGetSubscriptionTiers } from "../Hooks/useSubscriptionTiers";
import {
  ActionIcon,
  Box,
  Group,
  Table,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCircleCheck,
  IconCircleX,
  IconHelpHexagon,
  IconPhotoAi,
  IconVideo,
  IconNews,
  IconCurrencyDollar,
  IconUserCheck,
  IconAddressBook,
} from "@tabler/icons-react";
import { P, PageTitle } from "../components/Members/Common/Type";
import Meta from "../components/Layouts/Meta";
const Subscriptions = () => {
  const [products, GetsetSubscriptionTiers] = useGetSubscriptionTiers();
  const theme = useMantineTheme();
  useEffect(() => {
    if (products === null) GetsetSubscriptionTiers();
  }, [GetsetSubscriptionTiers]);

  if (products === null) return <>Creating Subscriptions Options</>;

  const ICONS = {
    IconPhotoAi: (
      <IconPhotoAi size="1.7rem" stroke={1} color={theme.colors.gray[6]} />
    ),
    IconVideo: (
      <IconVideo size="1.7rem" stroke={1} color={theme.colors.gray[6]} />
    ),
    IconNews: (
      <IconNews size="1.7rem" stroke={1} color={theme.colors.gray[6]} />
    ),
    IconCurrencyDollar: (
      <IconCurrencyDollar
        size="1.7rem"
        stroke={1}
        color={theme.colors.gray[6]}
      />
    ),
  };
  return (
    <>
      <Meta
        title="Subscriptions - Fixtura: Choose Your Plan"
        description="Select the best Fixtura subscription plan for your sports club. Tailor your digital media strategy with our flexible options."
        keywords="Fixtura subscriptions, sports club plans, digital media packages, club content subscription, media solutions pricing"
      />
      <PageBanner
        pageTitle="Subscriptions"
        BGImage="/images/BG-Images/0D5A0607.jpg"
        position={`top center`}
      />
      <div className="pricing-area ptb-100 bg-f9f6f6">
        <div className="container">
          <div className="section-title"></div>
          {products.map((product, i) => {
            if (product.attributes.isActive)
              return (
                <div key={i} style={{ marginBottom: "120px" }}>
                  <PageTitle
                    Copy={`${product.attributes.Name}`}
                    ICON={<IconAddressBook size={40} />}
                  />

                  <P
                    size={"lg"}
                    Weight={900}
                  >{`$${product.attributes.price}/Weekly`}</P>
                  <P>{product.attributes.description}</P>
                  <Box
                    key={i}
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[0],
                      padding: theme.spacing.xs,
                      borderBottom: `1px solid ${theme.colors.gray[2]}`,
                      cursor: "pointer",

                      "&:hover": {
                        backgroundColor: theme.colors.gray[2],
                      },
                    })}
                  >
                    {product?.attributes.subscription_items.items.map(
                      (category) => (
                        <Box
                          key={category.category}
                          sx={(theme) => ({
                            backgroundColor: theme.colors.gray[0],
                            padding: theme.spacing.xs,
                            borderBottom: `1px solid ${theme.colors.gray[2]}`,
                            cursor: "pointer",

                            "&:hover": {
                              backgroundColor: theme.colors.gray[2],
                            },
                          })}
                        >
                          <Group position="center">
                            {ICONS[category.icon]}
                            <Title
                              order={5}
                              align="left"
                              c={theme.colors.gray[8]}
                              my={20}
                              mx={5}
                            >
                              {category.category}
                            </Title>
                          </Group>

                          <Table>
                            <thead>
                              <tr>
                                <th>Included</th>
                                <th>Asset</th>
                                <th>Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.details.map((detail) => (
                                <tr
                                  key={detail.type}
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <td>
                                    {detail.hasOption ? (
                                      <IconCircleCheck
                                        size="1.3rem"
                                        color={theme.colors.green[5]}
                                      />
                                    ) : (
                                      <IconCircleX
                                        size="1.3rem"
                                        color={theme.colors.red[5]}
                                      />
                                    )}
                                  </td>

                                  <td>
                                    <Text
                                      align="left"
                                      c={detail.hasOption ? "black" : "dimmed"}
                                      fz={"sm"}
                                    >
                                      {detail.type}
                                    </Text>
                                  </td>

                                  <td>
                                    <Tooltip
                                      label={detail.description}
                                      width={200}
                                      withArrow={true}
                                      multiline={true}
                                    >
                                      <ActionIcon>
                                        <IconHelpHexagon
                                          size="1.125rem"
                                          color={theme.colors.blue[5]}
                                        />
                                      </ActionIcon>
                                    </Tooltip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Box>
                      )
                    )}
                  </Box>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};

export default Subscriptions;

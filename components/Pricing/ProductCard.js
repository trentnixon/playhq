import Link from "next/link";

import {
  ActionIcon,
  Box,
  Center,
  Group,
  List,
  Stack,
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
} from "@tabler/icons-react";
import React from "react";
import { trackButtonClick } from "../../lib/GA";
import { useMediaQuery } from "@mantine/hooks";
import { H, P } from "../Members/Common/Type";

export const ProductCard = ({
  product,
  signUp,
  BTN = null,
  className,
  timing,
  isActive,
  withTool = true,
}) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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
    <div className={`${className} col-lg-6 col-md-12`}>
      <div
        className="pricing-table active-plan"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay={timing ? timing : 0 * 200}
      >
        <div className="pricing-header">
          <Center>
            <H color={"white"} mb={0}>
              <span>
                <sup>$</sup>
                {product.price}
                <span>/Weekly</span>
              </span>
            </H>
          </Center>
        </div>

        <Stack align="center" justify="flex-start" spacing={0} mb={10}>
          <Center>
            <H size={"h3"} color={"gray.7"} mb={0}>
              {product.Name}
            </H>
          </Center>

          {isActive ? (
            <SelectedPlan />
          ) : (
            <CardCTA
              signUp={signUp}
              trackButtonClick={trackButtonClick}
              Name={product.Name}
              BTN={BTN}
            />
          )}
        </Stack>

        {product.subscription_items.items.map((category, i) => (
          <Box
            key={category.category}
            sx={(theme) => ({
              backgroundColor: "white",
              padding: theme.spacing.xs,
              borderBottom: `1px solid ${theme.colors.gray[2]}`,
              cursor: "pointer",

              "&:hover": {
                backgroundColor: theme.colors.gray[2],
              },
            })}
          >
            <Group position="apart">
              <Title
                order={4}
                align="left"
                c={theme.colors.gray[8]}
                my={20}
                mx={5}
              >
                {category.category}
              </Title>
              {ICONS[category.icon]}
            </Group>

            <List listStyleType="none">
              <Box px={20}>
                <List>
                  {category.details.map((detail) =>
                    //mobile
                    !detail.hasOption && mobile ? (
                      false
                    ) : (
                      <List.Item
                        key={detail.type}
                        style={{ width: "100%", marginBottom: "10px" }}
                        icon={
                          detail.hasOption ? (
                            <IconCircleCheck
                              size="1.3rem"
                              color={theme.colors.green[5]}
                            />
                          ) : (
                            <IconCircleX
                              size="1.3rem"
                              color={theme.colors.red[5]}
                            />
                          )
                        }
                      >
                        <Group>
                          <Text
                            align="left"
                            c={detail.hasOption ? "black" : "dimmed"}
                            fz={"sm"}
                          >
                            {detail.type}
                          </Text>
                          {withTool ? (
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
                          ) : (
                            false
                          )}
                        </Group>
                      </List.Item>
                    )
                  )}
                </List>
              </Box>
            </List>
          </Box>
        ))}

        {mobile ? (
          false
        ) : isActive ? (
          <SelectedPlan />
        ) : (
          <CardCTA
            signUp={signUp}
            trackButtonClick={trackButtonClick}
            Name={product.Name}
            BTN={BTN}
          />
        )}
      </div>
    </div>
  );
};

const SelectedPlan = () => {
  const theme = useMantineTheme();
  return (
    <Center mt={20}>
      <IconCircleCheck size="2rem" color={theme.colors.green[5]} />
    </Center>
  );
};

const CardCTA = ({ signUp, trackButtonClick, Name, BTN }) => {
  return (
    <div className="pricing-footer ">
      <Center mt={20}>
        {signUp ? (
          <Group position="apart">
            <Link legacyBehavior  href="/subscriptions/">
              <a
                className="btn btn-secondary"
                onClick={() =>
                  trackButtonClick(`Product Card - Learn More - ${Name}`)
                }
              >
                {" "}
                learn more
              </a>
            </Link>
            <Link legacyBehavior  href="/SignUp/">
              <a
                className="btn btn-primary"
                onClick={() =>
                  trackButtonClick(`Product Card - Sign up - ${Name}`)
                }
              >
                Sign up
              </a>
            </Link>
          </Group>
        ) : (
          BTN
        )}
      </Center>
    </div>
  );
};

/* <div className="pricing-footer ">
            <Center mt={20}>
              {signUp ? (
                <Group position="apart">
                  <Link legacyBehavior  href="/subscriptions/">
                    <a
                      className="btn btn-secondary"
                      onClick={() =>
                        trackButtonClick(
                          `Product Card - Learn More - ${product.Name}`
                        )
                      }
                    >
                      {" "}
                      learn more
                    </a>
                  </Link>
                  <Link legacyBehavior  href="/SignUp/">
                    <a
                      className="btn btn-primary"
                      onClick={() =>
                        trackButtonClick(
                          `Product Card - Sign up - ${product.Name}`
                        )
                      }
                    >
                      Sign up
                    </a>
                  </Link>
                </Group>
              ) : (
                BTN
              )}
            </Center>
          </div> */

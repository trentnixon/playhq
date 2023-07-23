// react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
// UTILS
import { fetcher } from "../../lib/api";
import Cookies from "js-cookie";
// PACK
import {
  ActionIcon,
  Box,
  Container,
  Group,
  List,
  Paper,
  Table,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
// Components
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";

import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";
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
import qs from "qs";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { IconAddressBook } from "@tabler/icons-react";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";

const MyPlan = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [subscriptionTier, setsubscriptionTier] = useState(
    userAccount?.attributes.subscription_tier.data.attributes
  );
  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  const theme = useMantineTheme();

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, [user]);

  useEffect(() => {
    if (account) {
      setUserAccount(account);
      showNotification({
        title: "Action Completed",
        message: "Your account details have been successfully saved",
      });
    }
  }, [account]);
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

  console.log(userAccount);
  return (
    <LoadingStateWrapper conditions={[user, userAccount, subscriptionTier]}>
      <MembersWrapper>
        <PageTitle
          Copy={`My Plan : ${subscriptionTier?.Name}`}
          ICON={<IconAddressBook size={40} />}
        />

        <P Copy={subscriptionTier?.description}></P>
        <Container fluid>
          <Paper
            withBorder
            p="lg"
            sx={(theme) => ({
              backgroundColor: theme.white,
            })}
          >
            {subscriptionTier?.subscription_items.items.map((category) => (
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
                    order={2}
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
                        style={{ width: "100%", marginBottom: "10px" }}
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
            ))}
          </Paper>
        </Container>
        <FixturaDivider />
      </MembersWrapper>
    </LoadingStateWrapper>
  );
};

/* MyPlan.getInitialProps = async (ctx) => {
  
};
 */
export default MyPlan;

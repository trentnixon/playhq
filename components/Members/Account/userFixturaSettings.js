import { Avatar, Container, Group, Paper, Space, Stack } from "@mantine/core";
import { ShadowWrapper, Wrapper } from "../Common/Containers";
import { SelectFixturaSetting } from "../Common/formelements/Select_FixturaSettings";
import { P } from "../Common/Type";
import { createStyles } from "@mantine/core";
import { IconSelect, IconUsers, IconTrophy } from "@tabler/icons";
import { FixturaDivider } from "../Common/Divider";

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: theme.colors.gradients[0],
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  count: {
    color: theme.white,
    fontSize: 32,
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    fontSize: theme.fontSizes.sm,
    marginTop: 5,
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
      },
    },
  },
}));

export const FixturaSettings = ({ user, setHasUpdated }) => {
  const { classes } = useStyles();

  const data = [
    {
      title: "Account Type",
      stats: user.attributes.account_type.data.attributes.Name,
      description: "",
      icon: IconSelect,
    },
    {
      title: "My Association",
      stats: user.attributes.associations.data[0].attributes.Name,
      description: "",
      icon: IconUsers,
    },
    {
      title: "My Club",
      stats: user.attributes?.clubs?.data[0]?.attributes.Name,
      description: "",
      icon: IconTrophy,
    },
  ];

  const stats = data.map((stat) => (
    <Paper
      key={stat.title}
      radius="md"
      shadow="lg"
      withBorder
      p="sm"
      sx={(theme) => ({
        backgroundColor: theme.white,
        minHeight: "11em",
        backgroundColor: theme.colors.members[1],
      })}
    >
      <Group position="right">
        <Avatar color={"gray"} size={50} radius={"md"}>
          <stat.icon size={25} stroke={1} />
        </Avatar>
      </Group>
      <P Copy={stat.title} color={4} size={20} marginBottom={0} />
      <P Copy={stat.stats} color={3} Weight={900} size={20} marginBottom={0} />
    </Paper>
  ));

  return (
    <>
      <Wrapper>
        <Group position="apart" grow>
          {stats}
        </Group>
      </Wrapper>
      <FixturaDivider />
    </>
  );
};

export const SetupInputs = ({ user, setHasUpdated }) => { 
  //console.log(user.attributes?.account_type?.data?.attributes.Name)
  return (
    <>
      <LabelMe label="Account Type" />

      <ShadowWrapper>
        <SelectFixturaSetting
          user={user}
          RelationProperty={"account_type"}
          setHasUpdated={setHasUpdated}
          CollectionFrom={"account-types"}
          CollectionSaveTo={"accounts"}
          SelectedBaseValueObject={
            user.attributes?.account_type?.data?.attributes
          }
          SelectLabel={"Select Account Type"}
          SelectPlaceholder={"Select Account Type"}
          COLLECTIONID={user.id}
        />
      </ShadowWrapper>
      <Space h="lg" />

      <LabelMe label="Select Your Association" />
      <ShadowWrapper>
        <SelectFixturaSetting
          CollectionFrom={"associations"}
          CollectionSaveTo={"accounts"}
          RelationProperty={"associations"}
          SelectedBaseValueObject={
            user.attributes?.associations?.data[0]?.attributes
          }
          SelectLabel={"Select an Association"}
          SelectPlaceholder={"Select a Association"}
          user={user}
          setHasUpdated={setHasUpdated}
          COLLECTIONID={user.id}
        />
      </ShadowWrapper>
      <Space h="lg" />

      {user.attributes?.account_type?.data?.attributes.Name ===
      "Association" ? (
        false
      ) : (
        <>
          {" "}
          <LabelMe label="Select Your Club" />
          <ShadowWrapper>
            <SelectFixturaSetting
              CollectionFrom={"clubs"}
              CollectionSaveTo={"accounts"}
              RelationProperty={"clubs"}
              SelectedBaseValueObject={
                user.attributes?.clubs?.data[0]?.attributes
              }
              SelectLabel={"Select clubs"}
              SelectPlaceholder={"Select a clubs"}
              user={user}
              setHasUpdated={setHasUpdated}
              COLLECTIONID={user.id}
            />
          </ShadowWrapper>
        </>
      )}
    </>
  );
};
/*

*/

const LabelMe = ({ label }) => {
  return (
    <Wrapper>
      <P
        color={4}
        Weight={900}
        marginBottom={0}
        textTransform={"uppercase"}
        Copy={label}
      />
    </Wrapper>
  );
};

export const FixturaHeaderMeta = ({ user, setHasUpdated }) => {
  return (
    <Group
      position="apart"
      grow
      py={3}
      sx={(theme) => ({
        background: theme.fn.linearGradient(
          45,
          theme.colors.blue[5],
          theme.colors.cyan[5]
        ),
      })}
    ></Group>
  );
};

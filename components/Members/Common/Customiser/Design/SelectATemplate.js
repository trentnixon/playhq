import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FixturaLoading } from "../../Loading";
import {
  Container,
  Paper,
  SimpleGrid,
  useMantineTheme,
  Card,
  Text,
  Group,
  createStyles,
  rem,
  Tooltip,
  BackgroundImage,
} from "@mantine/core";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../Hooks/useCustomizer";
import { useAccountDetails } from "../../../../../lib/userContext";
import { P, SubHeaders } from "../../Type";
import { FixturaDivider } from "../../Divider";
import { IconFileDownload, IconLockSquareRounded } from "@tabler/icons-react";
import { BTN_ONCLICK } from "../../utils/Buttons";
import { TemplateCard } from "./Components/TemplateCard";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  selectedCard: {
    backgroundColor: theme.colors.green[1],
  },
  imageSection: {
    padding: 0,
    textAlign: "center",
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.xs,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const Locked = () => {
  const theme = useMantineTheme();
  return (
    <Tooltip
      position="bottom"
      withArrow
      label="Upload a media item to unlock this item"
    >
      <IconLockSquareRounded size={"1.9em"} color={theme.colors.gray[5]} />
    </Tooltip>
  );
};

export const SelectATemplate = ({ hasMediaItems }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();

  const handleMoreInfoClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleBackClick = () => {
    setSelectedTemplate(null);
  };

  const isUserTemplate = (templateId) => {
    return userAccount.attributes.template.data.id === templateId;
  };

  useEffect(() => {
    FetchElement({ COLLECTIONID: "templates" });
  }, []);

  useEffect(() => {
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  const StoreUSerChange = (item) => {
    setLoading(true);
    CreateDesignElement({
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "template",
    });
  };

  useEffect(() => {
    ReRender();
  }, [DesignElement]);

  let groupedTemplates = {};
  if (Array.isArray(GetElement)) {
    // Group templates by category
    groupedTemplates = GetElement.reduce((acc, template) => {
      const category = template.attributes.Category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(template);
      return acc;
    }, {});
  }

  if (loading || !GetElement || !userAccount) {
    return (
      <>
        <SubHeaders
          Copy={`Storing New Graphics Package`}
          ICON={<IconFileDownload size={30} />}
        />

        <Paper
          radius="md"
          shadow="md"
          mb={10}
          p="xs"
          sx={(theme) => ({ backgroundColor: theme.white })}
        >
          <FixturaLoading />
        </Paper>
      </>
    );
  }

  return (
    <>
      <Paper
        radius="md"
        mt={0}
        p="0"
        sx={(theme) => ({ backgroundColor: theme.white })}
      >
        {Object.keys(groupedTemplates).map((category) => (
          <Container key={category} fluid={true} mb={40}>
            <P size={"xl"} Weight={900} textTransform={"uppercase"}>
              {category}
            </P>
            {/* Display the category name */}
            <SimpleGrid
              breakpoints={[
                { minWidth: "xs", cols: 2 },
                { minWidth: "sm", cols: 2 },
                { minWidth: "md", cols: 3 },
              ]}
            >
              {groupedTemplates[category].map((item, i) => (
                <TemplateCard
                  key={i}
                  template={item}
                  isSelected={
                    userAccount.attributes.template.data.id === item.id
                  }
                  onSelect={(selectedTemplate) =>
                    StoreUSerChange(selectedTemplate)
                  }
                  onMoreInfo={(selectedTemplate) =>
                    handleMoreInfoClick(selectedTemplate)
                  }
                  hasMediaItems={hasMediaItems}
                />
              ))}
            </SimpleGrid>
          </Container>
        ))}
      </Paper>
      <FixturaDivider />
    </>
  );
};

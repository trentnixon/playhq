import { useState } from "react";
import { useRouter } from "next/router";
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react";
import {
  createStyles,
  rem,
  Card,
  Image,
  Text,
  Group,
  Badge,
  ActionIcon,
  Tooltip,
  Center,
  ColorSwatch,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { findBestImage } from "../../../../../utils/actions";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import { ImageDetailsModal } from "../ImageDetailsModal";
import { useDeleteMediaItem } from "../../../../../Hooks/useGalleryImage";
import { FixturaLoading } from "../../../../Members/Common/Loading";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.gray[0],
  },
  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.gray[5]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.xs,
  },
}));

export function GalleryItemCard({ item }) {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteMediaItem, deleteLoading, deleteError] = useDeleteMediaItem();
  const router = useRouter();
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  // Null checks

  const thumbnailUrl = findBestImage(item?.attributes?.imageId, "med");
  const title = item?.attributes?.title;
  const tags = item?.attributes?.tags || [];
  const isActive = item?.attributes?.isActive;
  const fullImageUrl = findBestImage(item?.attributes?.imageId, "large");

  const AgeGroup = item?.attributes?.AgeGroup || "Not specified";
  const AssetType = item?.attributes?.AssetType || "Not specified";

  if (!thumbnailUrl) {
    return <div>Error: Incomplete item data.</div>;
  }

  const handleDelete = async (id) => {
    setConfirmModal(false);
    await deleteMediaItem(id);
    if (!deleteError) {
      router.replace(router.asPath); // Refresh the page
    }
    setDeletingItemId(null);
  };

  const handleConfirmDelete = (id) => {
    setDeletingItemId(id); // Set the ID of the item to be deleted
    setConfirmModal(true); // Open the confirmation modal
  };

  return (
    <>
      <ImageDetailsModal
        isOpen={opened}
        onClose={close}
        itemId={item.id}
        imageDetails={{
          title,
          tags,
          fullImageUrl,
          isActive,
          AgeGroup, // Add these lines
          AssetType, // Add these lines
        }}
      />

      <ConfirmDeleteModal
        isOpen={confirmModal}
        onClose={() => {
          setConfirmModal(false);
          setDeletingItemId(null);
        }}
        deletingItemId={deletingItemId}
        handleDelete={handleDelete}
      />

      <Card
        withBorder
        radius="md"
        p="md"
        className={classes.card}
        style={{ opacity: deletingItemId === item.id ? 0.5 : 1 }}
      >
        <Card.Section className={classes.section}>
          {deletingItemId !== item.id ? (
            <CardActions
              itemId={item.id}
              handleConfirmDelete={handleConfirmDelete}
              open={open}
              title={title}
            />
          ) : (
            <Center mt={15}>
              <FixturaLoading />
            </Center>
          )}
        </Card.Section>
        <Card.Section>
          <ImageThumbnail
            thumbnailUrl={thumbnailUrl}
            isActive={item?.attributes?.isActive}
          />
        </Card.Section>

        {/* Add new badges for AgeGroup and AssetType */}
        <Card.Section className={classes.section}>
          <Group spacing={7} position="apart" mt={10}>
            <Badge color="green.8" variant="filled">
              {AgeGroup}
            </Badge>
            <Badge color="blue.8" variant="filled">
              {AssetType}
            </Badge>
          </Group>
        </Card.Section>
      </Card>
    </>
  );
}

export function ImageThumbnail({ thumbnailUrl, isActive }) {
  return (
    <>
      <Box
        p={5}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          zIndex: "200",
        }}
      >
        <Tooltip
          label={isActive ? "Active" : "Inactive"}
          withArrow
          color={isActive ? "green.5" : "red.5"}
        >
          <ColorSwatch color={isActive ? "green" : "red"} size={10} />
        </Tooltip>
      </Box>
      <Image src={thumbnailUrl} alt="Thumbnail" height={180} />
    </>
  );
}

export function CardActions({ itemId, handleConfirmDelete, open, title }) {
  return (
    <Group mt="xs" spacing={5} position="right">
      <Text fz="xs" fw={500}>
        {title}
      </Text>

      <Tooltip label="Edit Image" withArrow color="blue.5">
        <ActionIcon
          onClick={open}
          color="blue.5"
          size="sm"
          radius="xl"
          variant="filled"
        >
          <IconEdit size=".8rem" />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Delete Image" withArrow color="red.5">
        <ActionIcon
          onClick={() => handleConfirmDelete(itemId)}
          color="red.5"
          size="sm"
          radius="xl"
          variant="filled"
        >
          <IconTrashXFilled size=".8rem" />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}

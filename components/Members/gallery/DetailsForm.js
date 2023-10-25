import {
  ActionIcon,
  Badge,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Switch,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { IconX } from "@tabler/icons-react";

export const DetailsForm = ({
  initialData,
  onSubmit,
  resetForm,
  ImagePath,
}) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [tags, setTags] = useState(initialData.tags || []);
  const [currentTag, setCurrentTag] = useState("");
  const handleSubmit = () => {
    const isActive = true; // Replace with a checkbox or toggle switch if needed
    onSubmit(title, isActive, tags);
    resetForm();
  };

  const addTag = () => {
    if (currentTag) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.slice();
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const removeButton = (ID) => (
    <ActionIcon
      size="xs"
      color="gray.9"
      radius="xl"
      variant="transparent"
      onClick={() => removeTag(ID)}
    >
      <IconX size={rem(10)} />
    </ActionIcon>
  );

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <Paper shadow="xs" p="md" withBorder>
          <Image src={ImagePath[0].url} width={"100%"} radius={5} />
          <div>
            <Paper>
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  color="blue"
                  mx={2}
                  variant="filled"
                  pr={3}
                  rightSection={removeButton(index)}
                >
                  {tag}
                </Badge>
              ))}
            </Paper>
          </div>
        </Paper>

        <Paper p="md">
          <Group my={5}>
            <input
              type="text"
              className="form-control"
              placeholder={"Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Group>
          <Group my={5} noWrap={true}>
            <input
              type="text"
              placeholder={"Tags"}
              className="form-control"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
            />
            <BTN_ONCLICK LABEL="Add" HANDLE={addTag}>
              Add Tag
            </BTN_ONCLICK>
          </Group>

          <Group my={5} position="right">
            <BTN_ONCLICK
              HANDLE={handleSubmit}
              LABEL={"Submit Details"}
              THEME="cta"
            />
          </Group>
        </Paper>
      </SimpleGrid>
    </>
  );
};

export const EditDetailsForm = ({ initialData, onSubmit, resetForm, imageDetails }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [tags, setTags] = useState(initialData.tags || []);
    const [currentTag, setCurrentTag] = useState("");
    const [isActive, setIsActive] = useState(initialData.isActive || false);
  

  const handleSubmit = () => {
    onSubmit(title, isActive, tags);
    resetForm();
  };

  const addTag = () => {
    if (currentTag) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.slice();
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const removeButton = (ID) => (
    <ActionIcon
      size="xs"
      color="gray.9"
      radius="xl"
      variant="transparent"
      onClick={() => removeTag(ID)}
    >
      <IconX size={rem(10)} />
    </ActionIcon>
  );

  useEffect(() => {
    if (imageDetails) {
      setTitle(imageDetails.title);
      setTags(imageDetails.tags);
      // Set isActive if it exists in imageDetails
      if ('isActive' in imageDetails) {
        setIsActive(imageDetails.isActive);
      }
    }
  }, [imageDetails]);
  return (
    <>
       <Paper>
            {tags.map((tag, index) => (
              <Badge
                key={index}
                color="blue"
                mx={2}
                variant="filled"
                pr={3}
                rightSection={removeButton(index)}
              >
                {tag}
              </Badge>
            ))}
          </Paper>

      <Paper p="md">
        <Group my={5}>
          <input
            type="text"
            className="form-control"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Group>
        <Group my={5} noWrap={true}>
          <input
            type="text"
            placeholder={"Tags"}
            className="form-control"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
          />
          <BTN_ONCLICK LABEL="Add" HANDLE={addTag}>
            Add Tag
          </BTN_ONCLICK>
        </Group>
        <Group my={5} position="right">
          <label>Active:</label>
          <Switch
            checked={isActive}
            onChange={(event) => setIsActive(event.currentTarget.checked)}
          />
        </Group>
        <Group my={5} position="right">
          <BTN_ONCLICK
            HANDLE={handleSubmit}
            LABEL={"Update Details"}
            THEME="cta"
          />
        </Group>
      </Paper>
    </>
  );
};

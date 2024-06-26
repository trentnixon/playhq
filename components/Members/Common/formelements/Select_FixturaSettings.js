import { useState, useEffect } from "react";
import { fetcher } from "../../../../lib/api";
import Cookies from "js-cookie";
import { Select, Group, Box, ActionIcon } from "@mantine/core";

import { IconSquareX, IconEdit, IconCheck } from "@tabler/icons";
import { P } from "../Type";
import { FixturaLoading } from "../Loading";
import { BTN_ONCLICK } from "../utils/Buttons";

export function SelectFixturaSetting({
  setHasUpdated,
  RelationProperty,
  SelectedBaseValueObject,
  CollectionFrom,
  CollectionSaveTo,
  SelectLabel,
  SelectPlaceholder,
  COLLECTIONID,
  WithIcon = false,
  showSelectInit = false,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(SelectedBaseValueObject);
  const [showSelect, setShowSelect] = useState(showSelectInit);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${CollectionFrom}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      setItems(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = async (event) => {
    if (typeof event !== "object") {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${CollectionSaveTo}/${COLLECTIONID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: {
              [RelationProperty]: event.ID,
            },
          }),
        }
      );

      //console.log("response", response);
      if (response) {
        setLoading(false);
        setSelected(event);
        setShowSelect(false);
        setHasUpdated();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleSelect = () => {
    setShowSelect(!showSelect);
  };

  const List = (items) => {
    return items.map((item) => ({
      value: { ID: item.id, Name: item.attributes.Name },
      label: item.attributes.Name,
    }));
  };

  if (loading) {
    return <FixturaLoading />;
  }

  return WithIcon ? (
    <UI_WithButton
      error={error}
      showSelect={showSelect}
      handleChange={handleChange}
      SelectPlaceholder={SelectPlaceholder}
      Data={List(items)}
      selected={selected}
      toggleSelect={toggleSelect}
      SelectLabel={SelectLabel}
    />
  ) : (
    <UI_WithSelectedAndButton
      error={error}
      showSelect={showSelect}
      handleChange={handleChange}
      SelectPlaceholder={SelectPlaceholder}
      Data={List(items)}
      selected={selected}
      toggleSelect={toggleSelect}
    />
  );
}

const UI_WithSelectedAndButton = ({
  error,
  showSelect,
  handleChange,
  SelectPlaceholder,
  Data,
  selected,
  toggleSelect,
}) => {
  return (
    <Group position="apart">
      <Box>
        {error ? (
          <P color={2}>{error}</P>
        ) : showSelect ? (
          <Select
            onChange={handleChange}
            placeholder={SelectPlaceholder}
            data={Data}
          />
        ) : (
          <Group>
            <P
              color={6}
              textTransform={`uppercase`}
              size={`sm`}
              marginBottom={0}
            >{`${selected ? selected.Name : "Select Option"}`}</P>
            {selected ? (
              <ActionIcon
                variant="filled"
                sx={(theme) => ({
                  backgroundColor: theme.colors.members[6],
                })}
              >
                <IconCheck size={18} />
              </ActionIcon>
            ) : (
              false
            )}
          </Group>
        )}
      </Box>

      <BTN_ONCLICK
        LABEL={showSelect ? "Cancel" : "Edit"}
        HANDLE={toggleSelect}
        THEME={showSelect ? "error" : "cta"}
      />
    </Group>
  );
};

const UI_WithButton = ({
  error,
  showSelect,
  handleChange,
  SelectPlaceholder,
  Data,
  selected,
  toggleSelect,
  SelectLabel,
}) => {
  return (
    <Group position="apart">
      {showSelect ? (
        false
      ) : (
        <P color={6} marginBottom={0}>
          {SelectLabel}
        </P>
      )}

      <Box>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : showSelect ? (
          <Group>
            <Select
              onChange={handleChange}
              placeholder={SelectPlaceholder}
              data={Data}
            />
            <ActionIcon color="teal" size="lg" onClick={toggleSelect}>
              <IconSquareX size={26} />
            </ActionIcon>
          </Group>
        ) : (
          <ActionIcon color="teal" size="lg" onClick={toggleSelect}>
            <IconEdit size={26} />
          </ActionIcon>
        )}
      </Box>
    </Group>
  );
};

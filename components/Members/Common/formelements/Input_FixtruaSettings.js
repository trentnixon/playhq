import { Button, Group, Box, Space, Loader } from "@mantine/core";
import Cookies from "js-cookie";

import { useState } from "react";
import { fetcher } from "../../../../lib/api";
import { ShadowWrapper, Wrapper } from "../Containers";
import { FixturaLoading } from "../Loading";
import { P } from "../Type";
import { BTN_ONCLICK } from "../utils/Buttons";

export const Input_FixturaSetting = ({ Input, user, setHasUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(user?.attributes[Input.Field]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleValueChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // send the updates to Strapi

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${user.id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
        body: JSON.stringify({
          data: {
            [Input.Field]: value,
          },
        }),
      }
    );

    // handle response
    if (response !== null) {
      setLoading(false);
      setHasUpdated(true);
      setEditing(false);
      setDisabled(true);
    }
  };

  return (
    <>
      <LabelMe label={Input.Label} />
      <ShadowWrapper KEY={Input.Name}>
        <Group position="apart">
          <Box>
            {!editing ? (
              <P Copy={user.attributes[Input.Field]} marginBottom={0} />
            ) : (
              <div className="form-group">
                {loading ? (
                  <FixturaLoading />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    value={value}
                    placeholder={value}
                    onChange={handleValueChange}
                  />
                )}
              </div>
            )}
          </Box>

          <Box>
            <Group position="right">
              {!editing ? (
                <BTN_ONCLICK LABEL="Edit" HANDLE={() => setEditing(true)} THEME="cta"/>
              ) : (
                <>
                  <BTN_ONCLICK
                    LABEL="Cancel"
                    HANDLE={() => setEditing(false)}
                    THEME="error"
                  />
                  <BTN_ONCLICK
                    LABEL="Save"
                    HANDLE={handleSubmit}
                    idDisabled={disabled}
                    THEME='success'
                  />
                </>
              )}
            </Group>
          </Box>
        </Group>
      </ShadowWrapper>
      <Space h={20} />
    </>
  );
};

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

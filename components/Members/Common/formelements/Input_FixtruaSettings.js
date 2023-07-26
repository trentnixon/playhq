import { Button, Group, Box, Space, Loader, ActionIcon } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import Cookies from "js-cookie";

import { useState } from "react";
import { fetcher } from "../../../../lib/api";
import { ShadowWrapper, Wrapper } from "../Containers";
import { FixturaLoading } from "../Loading";
import { P } from "../Type";
import { BTN_ONCLICK } from "../utils/Buttons";

export const Input_FixturaSetting = ({ Input, user, setHasUpdated, editingState=false, canCancel=true }) => {
  const [editing, setEditing] = useState(editingState);
  const [value, setValue] = useState(user?.attributes[Input.Field]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    for (const validator of Input.Validators) {
      const result = validator(newValue);
      if (result !== true) {
        setError(result);
        setDisabled(true);
        return;
      }
    }

    setError(null);
    setDisabled(false);
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
              <Group position="apart">
                <Box
                  sx={(theme) => ({
                    padding: theme.spacing.md,
                    border: `1px solid ${theme.colors.members[1]}`,
                    background: theme.fn.linearGradient(
                      45,
                      theme.colors.blue[5],
                      theme.colors.cyan[5]
                    ),
                    borderRadius: "5px",
                    textAlign: "right",
                  })}
                >
                  {user?.attributes[Input.Field] === null ? (
                    <P Copy={"Required"} color={0} marginBottom={0} />
                  ) : (
                    <P
                      Copy={user?.attributes[Input.Field]}
                      color={0}
                      marginBottom={0}
                    />
                  )}
                </Box>
                {user?.attributes[Input.Field] === null ? (
                  false
                ) : (
                  <ActionIcon
                    variant="filled"
                    sx={(theme) => ({
                      backgroundColor: theme.colors.members[6],
                    })}
                  >
                    {" "}
                    <IconCheck size={18} />
                  </ActionIcon>
                )}
              </Group>
            ) : (
              <div className="form-group">
                {loading ? (
                  <FixturaLoading />
                ) : (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      value={value}
                      placeholder={value}
                      onChange={handleValueChange}
                    />
                    {error && <P color={8} size={'xs'} lineHeight={`2em`} marginBottom={0} textAlign='center' Copy={error} />}
                  </>
                )}
              </div>
            )}
          </Box>

          <Box>
            <Group position="right">
              {!editing ? (
                <BTN_ONCLICK
                  LABEL="Edit"
                  HANDLE={() => setEditing(true)}
                  THEME="cta"
                />
              ) : (
                <>
                {
                  canCancel ?<BTN_ONCLICK
                  LABEL="Cancel"
                  HANDLE={() => setEditing(false)}
                  THEME="error"
                />:false
                }
                  
                  <BTN_ONCLICK
                    LABEL="Save"
                    HANDLE={handleSubmit}
                    idDisabled={disabled}
                    THEME="success"
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

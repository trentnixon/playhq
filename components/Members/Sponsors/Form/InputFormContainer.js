import { Box } from "@mantine/core";
import { useState } from "react";
import { P } from "../../Common/Type";

export const InputFormContainer = ({ Input, FORMMETA, setFORMMETA }) => {
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    // If a character limit is provided and exceeded, set an error
    if (Input.limit && e.target.value.length > Input.limit) {
      setError(`Cannot exceed ${Input.limit} characters`);
      return; // Don't update the FORMMETA state if the limit is exceeded
    }

    setFORMMETA({ ...FORMMETA, [Input.Property]: e.target.value });

    if (Input.Property === "Name") {
      if (!/^[a-zA-Z\s]*$/.test(e.target.value)) {
        setError("Name can only contain letters and spaces");
      } else {
        setError(null);
      }
    }
    if (Input.Property === "URL") {
      if (
        !/^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
          e.target.value
        )
      ) {
        setError("Invalid URL format");
      } else {
        setError(null);
      }
    }
    if (Input.Property === "Tagline") {
      if (e.target.value.length > 120) {
        setError("Tagline must be less than 120 characters");
      } else {
        setError(null);
      }
    }
  };

  return (
    <Box
      sx={(theme) => ({
        marginBottom: "10px",
      })}
    >
      <P marginBottom={"5px"} size={"sm"} Weight={900}>
        {Input.title}
      </P>
      <P marginBottom={0} size={"xs"}>
        {Input.info}
      </P>

      <input
        type="text"
        className="form-control"
        value={FORMMETA[Input.Property]}
        placeholder={Input.placeholder}
        maxLength={Input.limit || undefined} // Set the max length if a limit is provided
        onChange={handleChange}
      />
      {error && <div className="error">{error}</div>}
      {Input.limit && (
        <div
          style={{
            textAlign:'right',
            fontSize:'12px',
            color:
              FORMMETA[Input.Property] &&
              FORMMETA[Input.Property].length >= Input.limit
                ? "red"
                : "green",
          }}
        >
          {FORMMETA[Input.Property] ? FORMMETA[Input.Property].length : 0}/
          {Input.limit}
        </div>
      )}
    </Box>
  );
};

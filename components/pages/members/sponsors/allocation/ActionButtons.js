import React from "react";
import { BTN_ONCLICK } from "../../../../Members/Common/utils/Buttons";
import { P } from "../../../../Members/Common/Type";

const ActionButtons = ({ handleDelete, error }) => (
  <>
    <BTN_ONCLICK
      LABEL="Remove"
      HANDLE={handleDelete}
      THEME="standard"
    />
    {error && <P color="red">{error}</P>}
  </>
);

export default ActionButtons;

import { BTN_ONCLICK } from "../Common/utils/Buttons";


export const SPONSOR_CTABTN = ({ setIsCreate, isCreate }) => {
    return (
      <BTN_ONCLICK
        LABEL={isCreate ? `back` : `Create New`}
        HANDLE={() => {
          setIsCreate(!isCreate);
        }}
      />
    );
  };
  
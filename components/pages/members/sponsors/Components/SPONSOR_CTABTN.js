import { BTN_ONCLICK } from "../../../../Members/Common/utils/Buttons";


export const SPONSOR_CTABTN = ({ setIsCreate, isCreate }) => {
    return (
      <BTN_ONCLICK
        LABEL={isCreate ? `back` : `Create New Sponsors`}
        THEME={isCreate ?  `error`:`cta` }
        HANDLE={() => {
          setIsCreate(!isCreate);
        }}
      />
    ); 
  };
  
import { Sequence, Series } from "remotion";
import styled from "styled-components";
import { AccountName } from "./AccountName";
import { AccountLogo } from "./AccountLogo";
import { AssetTitle } from "./AssetTitle";
import { PrincipalSponsor } from "./PrincipalSponsor";

export const TitleSequenceFrame = (props) => {
  const { FPS_INTRO } = props;
  return (
    <>
      <Sequence durationInFrames={FPS_INTRO} from={0}>
        <IntroContainer>
          <AccountName {...props} />
           <AccountLogo {...props} />
         <AssetTitle {...props} />
        </IntroContainer>
        {/* <PrincipalSponsor {...props} /> */}
      </Sequence>
    </>
  );
};

const IntroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

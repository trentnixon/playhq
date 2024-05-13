import { HOC_ApplicationLoadingState } from "./wrappers/HOC_ApplicationLoadingState";
import HOC_CheckUserSetup from "./wrappers/HOC_CheckUserSetup";
import { HOC_MembersWrapper } from "./wrappers/HOC_MembersWrapper";

const SecureRouteHOC = ({ children, conditions=[] }) => {
  return (
    <HOC_MembersWrapper>
      <HOC_CheckUserSetup>
        <HOC_ApplicationLoadingState conditions={conditions}>
          {children}
        </HOC_ApplicationLoadingState>
      </HOC_CheckUserSetup>
    </HOC_MembersWrapper>
  );
};

export default SecureRouteHOC;

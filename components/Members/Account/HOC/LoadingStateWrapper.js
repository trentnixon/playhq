import { FixturaLoading } from "../../Common/Loading";


export const LoadingStateWrapper = ({ conditions, children }) => {
  const isLoading = conditions.some(condition => !condition);

  return isLoading ? <FixturaLoading/> : children;
};

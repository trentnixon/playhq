// src/components/Members/PrefabPlayerGrid.js
import { useAccountDetails } from "../../../../lib/userContext";
import { PrefabPlayerGridShared } from "./PrefabPlayerGridShared";

export const PrefabPlayerGridMembers = () => {
  const { account } = useAccountDetails();

  return <PrefabPlayerGridShared account={account} isPublic={false} />;
};

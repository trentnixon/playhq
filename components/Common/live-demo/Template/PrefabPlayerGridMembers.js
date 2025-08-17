// src/components/Members/PrefabPlayerGrid.js
import { useAccountDetails } from '../../../../context/userContext';
import { PrefabPlayerGridShared } from './PrefabPlayerGridShared';

export const PrefabPlayerGridMembers = () => {
  const { account } = useAccountDetails();

  return <PrefabPlayerGridShared account={account} isPublic={false} />;
};

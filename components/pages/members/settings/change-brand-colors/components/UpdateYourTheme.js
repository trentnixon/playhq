import { useEffect, useState } from "react";
import { Center, Paper } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";
import {
  useAssignDesignElement,
  useGETDesignElement,
} from "../../../../../../Hooks/useCustomizer";
import { useAccountDetails } from "../../../../../../lib/userContext";
import { SubHeaders } from "../../../../../Members/Common/Type";
import { FixturaLoading } from "../../../../../Members/Common/Loading";
import { ColorTable } from "./ColorTable";
import { CreateNewTheme } from "./createNewTheme/CreateNewTheme";

export const UpdateYourTheme = () => {
  const { account, ReRender } = useAccountDetails();
  const [DesignElement, CreateDesignElement] = useAssignDesignElement();
  const [GetElement, FetchElement] = useGETDesignElement();
  const [userAccount, setuserAccount] = useState(account);
  const [loading, setLoading] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  // BUG THAT NEEDS FIXING
  // SELECT ONLY PUBLIC THEMES AND THE CUSTOM ONE!!
  useEffect(() => {
    FetchElement({ COLLECTIONID: "themes" });
  }, []);

  useEffect(() => {
    FetchElement({ COLLECTIONID: "themes" });
    setuserAccount(account);
    setLoading(false);
  }, [account]);

  const StoreUSerChange = (item) => {
    const OBJ = {
      CollectionSaveTo: "accounts",
      Body: [item.id],
      COLLECTIONID: userAccount.id,
      RelationProperty: "theme",
    };
    setLoading(true);
    CreateDesignElement(OBJ);
  };

  useEffect(() => {
    if (DesignElement != true) {
      ReRender();
    }
  }, [DesignElement]);

  useEffect(() => {}, [userAccount]);

  if (
    loading ||
    GetElement === true ||
    GetElement === null ||
    userAccount === false
  ) {
    return (
      <>
        <SubHeaders
          Copy={`Storing New Theme`}
          ICON={<IconFileDownload size={30} />}
        />
        <Center>
          <FixturaLoading />
        </Center>
      </>
    );
  }

  return (
    <>
      {createNew ? (
        <CreateNewTheme
          userAccount={userAccount}
          setCreateNew={setCreateNew}
          ReRender={ReRender}
          GetElement={GetElement}
        />
      ) : (
        <ColorTable
          GetElement={GetElement}
          userAccount={userAccount}
          StoreUSerChange={StoreUSerChange}
          setCreateNew={setCreateNew}
        />
      )}
    </>
  );
};

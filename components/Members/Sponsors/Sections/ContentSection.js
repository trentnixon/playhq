import { CreateFirstSponsor } from "../Components/CreateFirstSponsor";
import DragnDropSponsorList from "../Components/ListofDragnDrop";
import CreateaSponsorForm from "../Form/TheForm";

export const ContentSection = ({
    Sponsors,
    SPONSORLIMIT,
    isCreate,
    setIsCreate,
    userAccount,
  }) => {
    if (isCreate) {
      return (
        <CreateaSponsorForm
          OBJ={{
            Name: null,
            URL: null,
            Tagline: null,
            Logo: null,
            LogoPath: false,
            account: [userAccount.id],
            Description:null,
            Create: true,
            UpdateSponsor: false,
            isActive: true,
            Order: 100,
            setIsCreate:setIsCreate
          }}
        />
      );
    } else if (Sponsors.length === 0) {
      return <CreateFirstSponsor setIsCreate={setIsCreate} isCreate={isCreate} />;
    } else {
      return (
        <DragnDropSponsorList
          SPONSORS={Sponsors}
          SPONSORLIMIT={SPONSORLIMIT}
          setIsCreate={setIsCreate}
        />
      );
    }
  };
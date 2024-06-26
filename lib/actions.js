import dayjs from "dayjs";

export function getReadableDate(unixTimestamp) {
  // Convert the Unix timestamp to a Date object
  let dtObject = new Date(unixTimestamp * 1000);

  // Subtract 7 days
  dtObject.setDate(dtObject.getDate() - 7);

  // Return the date in the format 'Month day, year'
  return dtObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const FindAccountLabel = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return "Undefined";
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? account.attributes.associations.data[0]?.attributes?.Name
    : account.attributes.clubs.data[0]?.attributes?.Name;
};

export const FindAccountType = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return "Undefined";
  }

  return account.attributes.account_type.data.attributes.Name;
};
export const FindAccountTypeOBJ = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return false;
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? account.attributes.associations.data[0]
    : account.attributes.clubs.data[0];
};
export const FindAccountTypeAPI = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return false;
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? `/associations/`
    : `/clubs/`;
};

export const FindAccountLogo = (account) => {
  const ACCOUNTTYPE = account?.attributes?.account_type?.data?.attributes?.Name;
  if (!ACCOUNTTYPE) {
    return false;
  }

  return ACCOUNTTYPE === "Association"
    ? account?.attributes.associations.data[0]?.attributes.Logo.data?.attributes
        .url
    : account?.attributes.clubs.data[0]?.attributes.Logo.data?.attributes.url;
};

export const FindAccountLogoObj = (account) => {
  const ACCOUNTTYPE = account?.attributes?.account_type?.data?.attributes?.Name;
  if (!ACCOUNTTYPE) {
    return false;
  }

  
  const useFindLogoObj = ACCOUNTTYPE === "Association"
    ? account?.attributes.associations.data[0]
        
    : account?.attributes.clubs.data[0];

  return {
    "url": useFindLogoObj?.attributes.Logo.data?.attributes.url,
    "width": useFindLogoObj?.attributes.Logo.data?.attributes.width,
    "height": useFindLogoObj?.attributes.Logo.data?.attributes.height
  }
/*   return ACCOUNTTYPE === "Association"
    ? useFindLogoObj?.attributes.Logo.data?.attributes
        
    : useFindLogoObj?.attributes.Logo.data?.attributes; */
};

export const getUniqueCompositionIDsAndFilterByIdentifier = (
  assets,
  identifier
) => {
  if (!Array.isArray(assets)) {
    console.error("The assets argument must be an array.");
    return [];
  }

  const uniqueCompositionData = []; // Use an array to store unique objects

  for (const asset of assets) {
    if (
      asset.attributes.asset_category?.data?.attributes?.Identifier ===
      identifier
    ) {
      const compositionData = {
        CompositionID: asset.attributes.CompositionID,
        Metadata: asset.attributes.Metadata, // Assuming Metadata is another field you want
      };
      uniqueCompositionData.push(compositionData);
    }
  }

  return uniqueCompositionData; // Return the array of unique objects
};

export const getTrialStatus = (accountData) => {
  // Get account type
  const accountType = FindAccountType(accountData);
  //console.log("accountType", accountType, accountData);

  // Depending on account type, determine the path to access the trial_instance
  let trialInstancePath;
  switch (accountType) {
    case "Club":
      trialInstancePath =
        accountData?.attributes?.clubs?.data[0]?.attributes?.trial_instance;
      break;
    case "Association":
      trialInstancePath =
        accountData?.attributes?.associations?.data[0]?.attributes
          ?.trial_instance;
      break;
    default:
      return false; // Handle case where account type is neither Club nor Association
  }

  // Check trial status using trialInstancePath
  if (!trialInstancePath?.data) {
    return { status: null, trialInstancePath }; // Free trial not activated
  } else if (trialInstancePath.data.attributes.isActive) {
    return { status: true, trialInstancePath }; // Free trial is active
  } else {
    return { status: false, trialInstancePath }; // Free trial has finished
  }
};


export const constructTrialInstanceObj = (account) => {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 14);

  let trialObj = {
    startDate: today.toISOString().split("T")[0], // Format to YYYY-MM-DD
    endDate: endDate.toISOString().split("T")[0], // Format to YYYY-MM-DD
    isActive: true,
    account: [account.id], // Assuming the account object has an 'id' attribute
  };

  // Depending on account type, set club or association
  const accountType = FindAccountType(account); // Assuming you have the FindAccountType function available

  if (accountType === "Club") {
    trialObj.club = [account.attributes.clubs.data[0].id]; // Assuming the club object in account has an 'id' attribute
    trialObj.subscription_tier = [15];
  } else if (accountType === "Association") {
    trialObj.association = [account.attributes.associations.data[0].id]; // Assuming the association object in account has an 'id' attribute
    trialObj.subscription_tier = [16]; // [8] // local
  }

  return trialObj;
};

export const convertUnixTimestamp = (timestamp) => {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  const date = new Date(timestamp * 1000);

  // Get the year, month and day from the date object
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();

  // Return the formatted date string
  return `${day}-${month}-${year}`;
};

export const FormatReadableDateMDY = (date) => {
  return dayjs(date).format("MMMM DD, YYYY");
};
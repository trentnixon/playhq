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
  
    return account.attributes.account_type.data.attributes.Name
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
    : `/clubs/`
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
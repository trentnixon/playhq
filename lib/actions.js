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
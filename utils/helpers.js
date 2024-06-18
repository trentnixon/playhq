export function daysUntil(targetDay) {
  // Create an object to map day names to day numbers
  const dayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5, 
    Saturday: 6,
  };

  // Get today's date
  const today = new Date();

  // Get the day of the week as a number (0-6)
  const todayDay = today.getDay();

  // Get the target day as a number (0-6)
  const targetDayNumber = dayMap[targetDay];

  // Calculate the number of days until the target day
  let daysUntil = targetDayNumber - todayDay;

  // If the number of days until the target day is negative, add 7 to make it positive
  if (daysUntil < 0) {
    daysUntil += 7;
  }

  return daysUntil;
}

export const orderedArray = (array) => {
  const orderedArray = array.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });
  return orderedArray;
};


export function checkDeliveryDate(Response) {
  //console.log("checkDeliveryDate", Response)
  const Ordered = orderedArray(Response);
  //console.log(Ordered, Ordered.length);
  if (Ordered?.length === 0) return false;

  const currentDate = new Date();
  const createdOnDate = new Date(Ordered[0].createdAt);

  if (currentDate.toDateString() === createdOnDate.toDateString()) {
    return "delivered today";
  } else {
    return false;
  }
}


export  const FormattDateFormDownloadTable = (formattDate) => {
  const dateString = formattDate;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",

  });
  return formattedDate;
}; 

export const FormattReadableDateFormDownloadTable = (formattDate) => {
  const date = new Date(formattDate);
  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });

  // Function to add ordinal suffix to day
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month}`;
};


export const isBefore2024 = (dateString) => {
  const cutoffDate = new Date("2024-01-01");
  const date = new Date(dateString);
  return date < cutoffDate;
};
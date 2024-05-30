export function sponsorsFormatted(sponsors) {
    const formattedSponsors = {
      default: {
        primary_sponsor: null,
        general_sponsors: [],
      },
      league: [],
      grade: [],
      team: [],
    };
  
    sponsors.forEach((sponsor) => {
      const { sponsorship_allocations, Name, Logo } = sponsor.attributes;
      if (
        !sponsorship_allocations ||
        !Array.isArray(sponsorship_allocations.data)
      ) {
        console.error("Invalid sponsorship_allocations structure", sponsor);
        return;
      }
  
      const sponsorObj = {
        sponsorId: sponsor.id,
        name: Name,
        logo: {
          url: Logo.data.attributes.url,
          width: Logo.data.attributes.width,
          height: Logo.data.attributes.height,
        },
      };
  
      sponsorship_allocations.data.forEach((allocation) => {
        const { Allocation } = allocation.attributes;
        if (!Allocation || !Allocation.accountGroup) {
          console.error("Invalid accountGroup structure", allocation);
          return;
        }
  
        const { accountGroup } = Allocation;
        const {
          category,
          id: allocationLevel,
          level,
          name: allocationName,
        } = accountGroup;
  
        if (category === "default") {
          if (allocationLevel === "primary_sponsor") {
            formattedSponsors.default.primary_sponsor = sponsorObj;
          } else if (allocationLevel.startsWith("general_sponsor")) {
            formattedSponsors.default.general_sponsors.push({
              position: parseInt(allocationLevel.split("_").pop(), 10),
              ...sponsorObj,
            });
          }
        } else {
          const allocationItem = {
            level,
            id: allocationLevel,
            allocationName,
            ...sponsorObj,
          };
  
          if (category === "league") {
            formattedSponsors.league.push(allocationItem);
          } else if (category === "grade") {
            formattedSponsors.grade.push(allocationItem);
          } else if (category === "team") {
            formattedSponsors.team.push(allocationItem);
          }
        }
      });
    });
  
    // Sort general sponsors by their position
    formattedSponsors.default.general_sponsors.sort(
      (a, b) => a.position - b.position
    );
  
    // Cleanup step to remove any keys with empty arrays
    for (const key in formattedSponsors) {
      if (
        Array.isArray(formattedSponsors[key]) &&
        formattedSponsors[key].length === 0
      ) {
        delete formattedSponsors[key];
      } else if (typeof formattedSponsors[key] === "object") {
        for (const subKey in formattedSponsors[key]) {
          if (
            Array.isArray(formattedSponsors[key][subKey]) &&
            formattedSponsors[key][subKey].length === 0
          ) {
            delete formattedSponsors[key][subKey];
          }
        }
      }
    }
  
    return formattedSponsors;
  }
  
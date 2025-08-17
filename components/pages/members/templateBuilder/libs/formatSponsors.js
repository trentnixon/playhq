// Format Sponsors - Transform Strapi sponsor data to test data format

/**
 * Formats sponsor data from Strapi to the structure expected by test datasets
 * @param {Array} strapiSponsors - Raw sponsor data from Strapi
 * @returns {Object} Formatted sponsors object for test data
 */
export const formatSponsors = strapiSponsors => {
  if (!strapiSponsors || !Array.isArray(strapiSponsors)) {
    return {
      primary: [],
      default: {
        primary_sponsor: [],
        general_sponsor_1: [],
        general_sponsor_2: [],
        general_sponsor_3: [],
        general_sponsor_4: [],
        general_sponsor_5: [],
        general_sponsor_6: [],
      },
    };
  }

  const formattedSponsors = {
    primary: [],
    default: {
      primary_sponsor: [],
    },
  };

  // Track processed sponsors to avoid duplicates
  const processedSponsorIds = new Set();
  const primarySponsors = [];
  const generalSponsors = [];

  // First pass: categorize sponsors
  strapiSponsors.forEach(sponsor => {
    const sponsorData = sponsor.attributes;

    // Skip if already processed
    if (processedSponsorIds.has(sponsor.id)) {
      return;
    }

    // Extract logo URL (prefer medium, fallback to original)
    const logoUrl =
      sponsorData.Logo?.data?.attributes?.formats?.medium?.url ||
      sponsorData.Logo?.data?.attributes?.url ||
      '';

    // Create formatted sponsor object
    const formattedSponsor = {
      id: sponsor.id,
      isPrimary: sponsorData.isPrimary || false,
      isActive: sponsorData.isActive || false,
      isArticle: sponsorData.isArticle || false,
      isVideo: sponsorData.isVideo || false,
      url: sponsorData.URL || '',
      tagline: sponsorData.Tagline || '',
      description: sponsorData.Description || null,
      name: sponsorData.Name || '',
      logo: {
        id: sponsorData.Logo?.data?.id || null,
        url: logoUrl,
      },
    };

    // ONLY add to primary if the sponsor has isPrimary: true
    if (formattedSponsor.isPrimary) {
      primarySponsors.push(formattedSponsor);
    } else {
      generalSponsors.push(formattedSponsor);
    }

    processedSponsorIds.add(sponsor.id);
  });

  // Second pass: assign to specific slots
  // Add primary sponsors (should only be 1)
  primarySponsors.forEach(sponsor => {
    formattedSponsors.primary.push(sponsor);
    formattedSponsors.default.primary_sponsor.push(sponsor);
  });

  // Add general sponsors - each gets its own slot
  generalSponsors.forEach((sponsor, index) => {
    const slotNumber = index + 1; // Start from 1
    const slotKey = `general_sponsor_${slotNumber}`;

    // Initialize the slot if it doesn't exist
    if (!formattedSponsors.default[slotKey]) {
      formattedSponsors.default[slotKey] = [];
    }

    formattedSponsors.default[slotKey].push(sponsor);
  });

  return formattedSponsors;
};

/**
 * Gets the total number of sponsors for composition length calculation
 * @param {Array} strapiSponsors - Raw sponsor data from Strapi
 * @returns {number} Total number of sponsors
 */
export const getSponsorCount = strapiSponsors => {
  if (!strapiSponsors || !Array.isArray(strapiSponsors)) {
    return 0;
  }
  return strapiSponsors.length;
};

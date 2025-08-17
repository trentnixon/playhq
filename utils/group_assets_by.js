// associations

// teamUtils.js
// Centralized definition of age groups
const AGE_GROUPS = {
  JUNIOR: [
    'U7',
    'U8',
    'U9',
    'U10',
    'U11',
    'U12',
    'U13',
    'U14',
    'U15',
    'U16',
    'U17',
    'U18',
    'U19',
    'U20',
    'U21',
    'U22',
    'U23',
    'Y4',
    'Y5',
    'Y6',
    'Y7',
    'Y8',
    'Y9',
    'Y10',
    'Y11',
    'Y12',
    'Colts Y9 & 10',
    'Mixed Age Group',
  ],
  SENIOR: ['Senior', 'Senior/Open', '', ' '], // Removed duplicate "Senior"
  MASTERS: ['Over 35', 'Over 40', 'Over 50', 'Over 60'],
};

function isAgeGroupInList(ageGroup, ageGroupList) {
  return ageGroupList.includes(ageGroup);
}

export function categorizeTeamsByAgeGroup(teams) {
  const categorizedTeams = { Junior: [], Senior: [], Masters: [], Special: [] };
  teams.forEach(team => {
    team.attributes.grades.data.forEach(grade => {
      const ageGroup = grade.attributes.ageGroup;
      if (isAgeGroupInList(ageGroup, AGE_GROUPS.JUNIOR)) {
        categorizedTeams['Junior'].push(team);
      } else if (isAgeGroupInList(ageGroup, AGE_GROUPS.SENIOR)) {
        categorizedTeams['Senior'].push(team);
      } else if (isAgeGroupInList(ageGroup, AGE_GROUPS.MASTERS)) {
        categorizedTeams['Masters'].push(team);
      } else {
        categorizedTeams['Special'].push(team);
      }
    });
  });
  return removeEmptyCategories(categorizedTeams);
}

export function categorizeTeamsBySeniorJunior(teams) {
  const categorizedTeams = { Junior: [], Senior: [] };
  teams.forEach(team => {
    team.attributes.grades.data.forEach(grade => {
      const ageGroup = grade.attributes.ageGroup;
      if (isAgeGroupInList(ageGroup, AGE_GROUPS.JUNIOR)) {
        categorizedTeams['Junior'].push(team);
      } else {
        categorizedTeams['Senior'].push(team);
      }
    });
  });
  return removeEmptyCategories(categorizedTeams);
}

function categorizeTeamsBySeniorJuniorForRoster(teams) {
  const categorizedTeams = { Junior: [], Senior: [] };

  teams.forEach(team => {
    const ageGroup = team.ageGroup;
    if (isAgeGroupInList(ageGroup, AGE_GROUPS.JUNIOR)) {
      categorizedTeams['Junior'].push(team);
    } else {
      categorizedTeams['Senior'].push(team);
    }
  });
  return removeEmptyCategories(categorizedTeams);
}

function removeEmptyCategories(categories) {
  Object.keys(categories).forEach(category => {
    if (categories[category].length === 0) {
      delete categories[category];
    }
  });
  return categories;
}

/*  module.exports = {
    categorizeTeamsByAgeGroup,
    categorizeTeamsBySeniorJunior,
    categorizeTeamsBySeniorJuniorForRoster,
  };
   */

function normalizeCompetitionName(name) {
  return encodeURIComponent(name);
}

export function groupByCompetitionAndGrade(comps) {
  const grouped = {};
  comps.forEach(comp => {
    comp.attributes.grades.data.forEach(grade => {
      const key = `${normalizeCompetitionName(
        comp.attributes.competitionName
      )} - ${encodeURIComponent(grade.attributes.gradeName)}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      const filteredGrades = comp.attributes.grades.data.filter(
        g => g.attributes.gradeName === grade.attributes.gradeName
      );
      grouped[key].push({
        id: comp.id,
        attributes: { ...comp.attributes, grades: { data: filteredGrades } },
      });
    });
  });
  return grouped;
}

export function groupByCompetitionName(comps) {
  const grouped = {};
  comps.forEach(comp => {
    let competitionName = normalizeCompetitionName(
      comp.attributes.competitionName
    );
    if (!grouped[competitionName]) {
      grouped[competitionName] = [];
    }
    grouped[competitionName].push(comp);
  });
  return grouped;
}

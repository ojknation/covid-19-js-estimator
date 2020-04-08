const covid19ImpactEstimator = (data) => {
  const input = data;
  const {reportedCases, timeToElapse, periodType} = input;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  let infectionByRequestedTimeImpact;
  let infectionByRequestedTimeSevereImpact;
  if (periodType === 'days') {
    const factor = timeToElapse / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'weeks') {
    const factor = (timeToElapse * 7) / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'months') {
    const factor = (timeToElapse * 30) / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  }
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: {
        days: infectionByRequestedTimeImpact,
        weeks: infectionByRequestedTimeImpact / 7,
        months: infectionByRequestedTimeImpact / 30
      }
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: {
        days: infectionByRequestedTimeSevereImpact,
        weeks: infectionByRequestedTimeSevereImpact / 7,
        months: infectionByRequestedTimeSevereImpact / 30
      }
    }
  };
};

export default covid19ImpactEstimator;

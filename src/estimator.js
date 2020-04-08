const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevereImpact = data.reportedCases * 50;
  let infectionByRequestedTimeImpact;
  let infectionByRequestedTimeSevereImpact;
  if (data.periodType === 'days') {
    const factor = data.timeToElapse / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (data.periodType === 'weeks') {
    const factor = (data.timeToElapse * 7) / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (data.periodType === 'months') {
    const factor = (data.timeToElapse * 30) / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  }
  const object = {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionByRequestedTime: {
        days: infectionByRequestedTimeImpact,
        weeks: infectionByRequestedTimeImpact / 7,
        months: infectionByRequestedTimeImpact / 30
      }
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionByRequestedTime: {
        days: infectionByRequestedTimeSevereImpact,
        weeks: infectionByRequestedTimeSevereImpact / 7,
        months: infectionByRequestedTimeSevereImpact / 30
      }
    }
  };
  return object;
};

export default covid19ImpactEstimator;

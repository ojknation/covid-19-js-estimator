const covid19ImpactEstimator = (data) => {
  const input = data;
  const { reportedCases, timeToElapse, periodType } = input;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  let infectionByRequestedTimeImpact;
  let infectionByRequestedTimeSevereImpact;
  if (periodType === 'days') {
    const factor = Math.floor(timeToElapse / 3);
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'weeks') {
    const factor = Math.floor((timeToElapse * 7) / 3);
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'months') {
    const factor = Math.floor((timeToElapse * 30) / 3);
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  }
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionByRequestedTimeSevereImpact
    }
  };
};

export default covid19ImpactEstimator;

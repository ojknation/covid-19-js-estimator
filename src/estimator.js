const covid19ImpactEstimator = (data) => {
  const input = data;
  const currentlyInfectedImpact = data.reportedCases * 10;
  const currentlyInfectedSevereImpact = data.reportedCases * 50;
<<<<<<< HEAD
  const infectionByRequestedTimeImpact
  const infectionByRequestedTimeSevereImpact
=======
  const infectionByRequestedTimeImpact;
  const infectionByRequestedTimeSevereImpact;
>>>>>>> 8ea3d9a35205be017720c9645fb01d3f58f52214
  if (data.periodType === 'days') {
    const factor = data.timeToElapse / 3;
    infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (data.periodType === 'days') {
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
      infectionByRequestedTime: infectionByRequestedTimeImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionByRequestedTime: infectionByRequestedTimeSevereImpact
    }
  };
  return object;
};

export default covid19ImpactEstimator;

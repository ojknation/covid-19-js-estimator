const covid19ImpactEstimator = (data) => {
  const input = data;
  const { 
    reportedCases, 
    timeToElapse, 
    periodType, 
    totalHospitalBeds 
  } = input;
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
  const availableBedSpace = Math.floor(35 * 0.01 * totalHospitalBeds);
  const fifteenPercent = 0.01 * 15;
  const severeCasesImpact = Math.floor(infectionByRequestedTimeImpact * fifteenPercent);
  const severeCasesSevereImpact =Math.floor(infectionByRequestedTimeSevereImpact * fifteenPercent);
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCases_Impact,
      hospitalBedsByRequestedTime: (availableBedSpace - severeCasesImpact)
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCases_SevereImpact,
      hospitalBedsByRequestedTime: (availableBedSpace - severeCasesSevereImpact)
    }
  };
};

export default covid19ImpactEstimator;

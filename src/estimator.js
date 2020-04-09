const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
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
  const availableBedSpace = 0.35 * totalHospitalBeds;
  const severeCasesImpact = infectionByRequestedTimeImpact * 0.15;
  const severeCasesSevereImpact = infectionByRequestedTimeSevereImpact * 0.15;
  const hospitalBedsImpact = Math.floor(availableBedSpace - severeCasesImpact);
  const hospitalBedsSevereImpact = Math.floor(availableBedSpace - severeCasesSevereImpact);
  const impactCasesForICU = Math.floor(infectionByRequestedTimeImpact * 0.05);
  const severeImpactCasesForICU = Math.floor(infectionByRequestedTimeSevereImpact * 0.05);
  const impactVentilators = Math.floor(infectionByRequestedTimeImpact * 0.02);
  const severeImpactVentilators = Math.floor(infectionByRequestedTimeSevereImpact * 0.02);
  const dollarsInFlightImpact = Math.floor(infectionByRequestedTimeImpact * avgDailyIncomeInUSD * avgDailyIncomePopulation);
  const dollarsInFlightSevereImpact = Math.floor(infectionByRequestedTimeSevereImpact * avgDailyIncomeInUSD * avgDailyIncomePopulation);
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesImpact,
      hospitalBedsByRequestedTime: hospitalBedsImpact,
      casesForICUByRequestedTime: impactCasesForICU,
      casesForVentilatorsByRequestedTime: impactVentilators,
      dollarsInFlight: dollarsInFlightImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsSevereImpact,
      casesForICUByRequestedTime: severeImpactCasesForICU,
      casesForVentilatorsByRequestedTime: severeImpactVentilators,
      dollarsInFlight: dollarsInFlightSevereImpact
    }
  };
};

export default covid19ImpactEstimator;

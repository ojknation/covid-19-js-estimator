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
    const factor = timeToElapse / 3;
    infectionByRequestedTimeImpact = Math.trunc(currentlyInfectedImpact * (2 ** factor));
    infectionByRequestedTimeSevereImpact = Math.trunc(currentlyInfectedSevereImpact * (2 ** factor));
  } else if (periodType === 'weeks') {
    const factor = (timeToElapse * 7) / 3;
    infectionByRequestedTimeImpact = Math.trunc(currentlyInfectedImpact * (2 ** factor));
    infectionByRequestedTimeSevereImpact = Math.trunc(currentlyInfectedSevereImpact * (2 ** factor));
  } else if (periodType === 'months') {
    const factor = (timeToElapse * 30) / 3;
    infectionByRequestedTimeImpact = Math.trunc(currentlyInfectedImpact * (2 ** factor));
    infectionByRequestedTimeSevereImpact = Math.trunc(currentlyInfectedSevereImpact * (2 ** factor));
  }
  const availableBedSpace = 0.35 * totalHospitalBeds;
  const severeCasesImpact = Math.trunc(infectionByRequestedTimeImpact * 0.15);
  const severeCasesSevereImpact = Math.trunc(infectionByRequestedTimeSevereImpact * 0.15);
  const hospitalBedsImpact = Math.trunc(availableBedSpace - severeCasesImpact);
  const hospitalBedsSevereImpact = Math.trunc(availableBedSpace - severeCasesSevereImpact);
  const impactCasesForICU = Math.trunc(infectionByRequestedTimeImpact * 0.05);
  const severeImpactCasesForICU = Math.trunc(infectionByRequestedTimeSevereImpact * 0.05);
  const impactVentilators = Math.trunc(infectionByRequestedTimeImpact * 0.02);
  const severeImpactVentilators = Math.trunc(infectionByRequestedTimeSevereImpact * 0.02);
  const populationIncome = avgDailyIncomeInUSD * avgDailyIncomePopulation;
  const dollarsIFImpact = Math.trunc(infectionByRequestedTimeImpact * populationIncome);
  const dollarsIFSevereImpact = Math.trunc(infectionByRequestedTimeSevereImpact * populationIncome);
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionByRequestedTimeImpact,
      severeCasesByRequestedTime: severeCasesImpact,
      hospitalBedsByRequestedTime: hospitalBedsImpact,
      casesForICUByRequestedTime: impactCasesForICU,
      casesForVentilatorsByRequestedTime: impactVentilators,
      dollarsInFlight: dollarsIFImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionByRequestedTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsSevereImpact,
      casesForICUByRequestedTime: severeImpactCasesForICU,
      casesForVentilatorsByRequestedTime: severeImpactVentilators,
      dollarsInFlight: dollarsIFSevereImpact
    }
  };
};

export default covid19ImpactEstimator;

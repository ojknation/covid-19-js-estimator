const covid19ImpactEstimator = (data) => {
  const input = data;
  const {
    reportedCases,
    timeToElapse,
    periodType,
    totalHospitalBeds,
    region: {
      avgDailyIncomePopulation,
      avgDailyIncomeInUSD
    }
  } = input;
  const currentlyInfectedImpact = reportedCases * 10;
  const currentlyInfectedSevereImpact = reportedCases * 50;
  let infectionBRTimeImpact;
  let infectionBRTimeSevereImpact;
  let days;
  if (periodType === 'days') {
    days = timeToElapse;
    const factor = Math.trunc(days / 3);
    infectionBRTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionBRTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'weeks') {
    days = timeToElapse * 7;
    const factor = Math.trunc(days / 3);
    infectionBRTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionBRTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'months') {
    days = timeToElapse * 30;
    const factor = Math.trunc(days / 3);
    infectionBRTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionBRTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  }
  const availableBedSpace = 0.35 * totalHospitalBeds;
  const severeCasesImpact = Math.trunc(infectionBRTimeImpact * 0.15);
  const severeCasesSevereImpact = Math.trunc(infectionBRTimeSevereImpact * 0.15);
  const hospitalBedsImpact = Math.trunc(availableBedSpace - severeCasesImpact);
  const hospitalBedsSevereImpact = Math.trunc(availableBedSpace - severeCasesSevereImpact);
  const impactCasesForICU = Math.trunc(infectionBRTimeImpact * 0.05);
  const severeImpactCasesForICU = Math.trunc(infectionBRTimeSevereImpact * 0.05);
  const impactVentilators = Math.trunc(infectionBRTimeImpact * 0.02);
  const severeImpactVentilators = Math.trunc(infectionBRTimeSevereImpact * 0.02);
  const populationIncome = avgDailyIncomePopulation * avgDailyIncomeInUSD;
  const dollarsIFImpact = infectionBRTimeImpact * days * populationIncome;
  const dollarsIFSevereImpact = infectionBRTimeSevereImpact * days * populationIncome;
  return {
    data: input,
    impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionsByRequestedTime: infectionBRTimeImpact,
      severeCasesByRequestedTime: severeCasesImpact,
      hospitalBedsByRequestedTime: hospitalBedsImpact,
      casesForICUByRequestedTime: impactCasesForICU,
      casesForVentilatorsByRequestedTime: impactVentilators,
      dollarsInFlight: dollarsIFImpact
    },
    severeImpact: {
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionsByRequestedTime: infectionBRTimeSevereImpact,
      severeCasesByRequestedTime: severeCasesSevereImpact,
      hospitalBedsByRequestedTime: hospitalBedsSevereImpact,
      casesForICUByRequestedTime: severeImpactCasesForICU,
      casesForVentilatorsByRequestedTime: severeImpactVentilators,
      dollarsInFlight: dollarsIFSevereImpact
    }
  };
};

export default covid19ImpactEstimator;

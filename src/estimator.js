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
  let infectionBRTimeImpact;
  let infectionBRTimeSevereImpact;
  if (periodType === 'days') {
    const factor = Math.trunc(timeToElapse / 3);
    infectionBRTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionBRTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'weeks') {
    const factor = Math.trunc((timeToElapse * 7) / 3);
    infectionBRTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionBRTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  } else if (periodType === 'months') {
    const factor = Math.trunc((timeToElapse * 30) / 3);
    infectionBRTimeImpact = currentlyInfectedImpact * (2 ** factor);
    infectionBRTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
  }
  const availableBedSpace = Math.round(0.35 * totalHospitalBeds);
  const severeCasesImpact = Math.round(infectionBRTimeImpact * 0.15);
  const severeCasesSevereImpact = Math.round(infectionBRTimeSevereImpact * 0.15);
  const hospitalBedsImpact = availableBedSpace - severeCasesImpact;
  const hospitalBedsSevereImpact = availableBedSpace - severeCasesSevereImpact;
  const impactCasesForICU = Math.round(infectionBRTimeImpact * 0.05);
  const severeImpactCasesForICU = Math.round(infectionBRTimeSevereImpact * 0.05);
  const impactVentilators = Math.round(infectionBRTimeImpact * 0.02);
  const severeImpactVentilators = Math.round(infectionBRTimeSevereImpact * 0.02);
  const populationIncome = Math.round(avgDailyIncomeInUSD * avgDailyIncomePopulation);
  const dollarsIFImpact = infectionBRTimeImpact * populationIncome;
  const dollarsIFSevereImpact = infectionBRTimeSevereImpact * populationIncome;
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

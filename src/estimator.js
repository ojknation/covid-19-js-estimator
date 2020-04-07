const covid19ImpactEstimator = (data) => {
const input = data;
const currentlyInfectedImpact = data.reportedCases * 10;
const currentlyInfectedSevereImpact = data.reportedCases * 50;
const factor = data.timeToElapse / 3;
const infectionByRequestedTimeImpact = currentlyInfectedImpact * (2 ** factor);
const infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * (2 ** factor);
const object = {
data: input,
impact: {
      currentlyInfected: currentlyInfectedImpact,
      infectionByRequestedTime: infectionByRequestedTimeImpact
},
severeImpact:{
      currentlyInfected: currentlyInfectedSevereImpact,
      infectionByRequestedTime: infectionByRequestedTimeSevereImpact
}
};
return object;
}
export default covid19ImpactEstimator;
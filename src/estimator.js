const covid19ImpactEstimator = (data) => {

    const input = data;
    const currentlyInfectedImpact = data.reportedCases * 10;
    const currentlyInfectedSevereImpact = data.reportedCases * 50;
    const infectionByRequestedTimeImpact = currentlyInfectedImpact * Math.pow(2,data.timeToElapse);
    const infectionByRequestedTimeSevereImpact = currentlyInfectedSevereImpact * Math.pow(2,data.timeToElapse);


    let object = {
        data : input,
        impact: {
            currentlyInfected : currentlyInfectedImpact,
            infectionByRequestedTime : infectionByRequestedTimeImpact
        },
        severeImpact: {
            currentlyInfected : currentlyInfectedSevereImpact,
            infectionByRequestedTime : infectionByRequestedTimeSevereImpact
        }
    };

    return object;
}



export default covid19ImpactEstimator;



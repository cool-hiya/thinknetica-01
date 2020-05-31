function displayFlights() {
    console.log('*** List of all flights ***');
    console.table(flights);
}

function isEnableToRegister(flight, nowTime) {
    return nowTime >= flight.registrationStarts && nowTime <= flight.registrationEnds;
}
const utils = {
    isEnableToRegister: (flight, nowTime) => {
        return nowTime >= flight.registrationStarts && nowTime <= flight.registrationEnds;
    }
}
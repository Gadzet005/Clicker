class Profile_dto{
    userId;
    lastTimeSynchronization;
    coinCount;
    wordCount;
    upgrades;

    constructor(model) {
        this.userId = model.userId;
        this.lastTimeSynchronization = model.lastTimeSynchronization;
        this.coinCount = model.coinCount;
        this.wordCount = model.wordCount;
        this.upgrades = model.upgrades;
    }
}

module.exports = Profile_dto;
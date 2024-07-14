class User_dto{
    name;
    email;
    id;
    walletData;

    constructor(model) {
        this.email = model.email;
        this.name = model.name;
        this.id = model.id;
        this.walletData = model.walletData;
    }
}

module.exports = User_dto;
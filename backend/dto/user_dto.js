class User_dto{
    name;
    email;
    id;
    wallet;

    constructor(model) {
        this.email = model.email;
        this.name = model.name;
        this.id = model.id;
        this.wallet = model.wallet;
    }
}

module.exports = User_dto;
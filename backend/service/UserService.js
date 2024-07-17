const { User } = require('../db')
const { Profile } = require('../db')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const ApiError = require('../errors')
const User_dto = require('../dto/user_dto')
const tokenService = require('../service/TokenService')
const upgradeList = require("../controller/UpgradeList.json");



class UserService {
    async register(email, name, password){
        try{
            if(await User.findOne({where: { email }})){

                throw new Error('Пользователь уже зарегистрирован');
            }
            
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email: email, name: name, walletData: '', password: hashPassword, refreshToken: 'tmp'})

            

            const profile = await Profile.create({userId: user.id, lastTimeSynchronization: 0, coinCount: 0, wordCount: 0, upgrades: {"arr":[{id:"1", "level":0}, {id:"2", "level":0}, {id:"3", "level":0}, {id:"4", "level":0}]}})
            
            

            profile.save();

            const userDTO = new User_dto(user);

            
            

            const tokens = tokenService.generateTokens({...userDTO});

            await tokenService.saveToken(userDTO.id, tokens.refreshToken);
            return{
                ...tokens,
                user: userDTO,
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }

    async login(email, password) {
        try {

            const user = await User.findOne({where: {email}});
            if (!user) throw ApiError.badRequest('Неверная почта или пароль');

            const isEqual = await bcrypt.compare(password, user.password);
            if(!isEqual) throw ApiError.badRequest('Неверная почта или пароль');

            const userDTO = new User_dto(user);
            const tokens = tokenService.generateTokens({...userDTO});

            await tokenService.saveToken(userDTO.id, tokens.refreshToken);
            return {
                ...tokens,
                user: userDTO
            }
        }
        catch (e) {
            throw new Error(e)
        }
    }

    async refresh(refreshToken) {
        const localUserData = tokenService.validateRefreshToken(refreshToken);
        if(!localUserData) throw ApiError.unauthorized();

        const tokens = tokenService.generateTokens({
            email: localUserData.email,
            name: localUserData.name,
            id: localUserData.id,
        });
        await tokenService.refreshToken(localUserData.id, tokens.refreshToken);
        const userDTO = new User_dto(localUserData);
        return{
            ...tokens,
            user: userDTO
        }
    }
}

module.exports = new UserService();
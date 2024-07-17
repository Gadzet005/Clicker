const { Profile } = require('../db')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const ApiError = require('../errors')
const Profile_dto = require('../dto/profile_dto')
const tokenService = require('../service/TokenService')


class GameService {

    async type(accessToken, success, completeWord){
        
        try {
            
            const localUserData = tokenService.validateAccessToken(accessToken);
            if(!localUserData) throw ApiError.unauthorized();

            const id = localUserData.id;
            const profile = await Profile.findOne({where: {id}});

            if(success){
                profile.coinCount += ;
                
                if(completeWord){
                    profile.wordCount++;
                }
            }
            else{
                
            }
            profile.save();
            

        } catch (e) {
          next(e);
        }
    }

    async buyUpgrade(accessToken, upgradeId){
        try {

            const localUserData = tokenService.validateAccessToken(accessToken);
            if(!localUserData) throw ApiError.unauthorized();

        } catch (e) {
          next(e);
        }
    }
    async getProfile(accessToken){
        try {

            const localUserData = tokenService.validateAccessToken(accessToken);
            if(!localUserData) throw ApiError.unauthorized();

        } catch (e) {
          next(e);
        }
    }
    async getBestUsersByWord(){
        try {
            const arr = []

        } catch (e) {
          next(e);
        }
    }
    async getBestUsersByCoin(){
        try {
        } catch (e) {
          next(e);
        }
    }
}

module.exports = new GameService();
const keyTokenModel = require('../models/keyToken')

class KeyTokenService{
    static createKeyToken = async({userId, publicKey, privateKey, refreshToken})=>{
        try {
            const filter = {user:userId},
            update = {
                publicKey,privateKey,refreshTokensUsed:[],refreshToken
            },
            options = {upsert:true,new:true}

            const tokens = await keyTokenModel.findOneAndUpdate(filter,update,options);
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async(userId)=>{
        return await keyTokenModel.findOne({user:new Types.ObjectId(userId)}).lean()
    }

    static removeKeyById = async(id)=>{
        return await keyTokenModel.deleteMany({id})
    }
}

module.exports = KeyTokenService
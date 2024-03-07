const userModel = require('../models/user');
const crypto = require('node:crypto');
const KeyTokenService = require('./keyTokenService');
const { createTokenPair } = require('../authentication/authUtils');
const { getInfoData } = require('../utils');
const { BadRequestError,ConflictRequestError,AuthFailureError} = require('../core/errorResponse');
const UserService = require('./userService');

class AccessService{
    static register = async ({email,password})=>{
        
        const holderUser = await userModel.findOne({email}).lean()
        if(holderUser) throw new BadRequestError('Error, user aleady sign up');

        const salt = crypto.randomBytes(16).toString('hex')
        const passwordHashed = await crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex')

        const newUser = await userModel.create({email, password:passwordHashed, salt})

        if(newUser){
            //generate private/public key
            const {privateKey,publicKey } = crypto.generateKeyPairSync('rsa',{
                modulusLength:4096,
                publicKeyEncoding:{
                    type:'pkcs1',
                    format:'pem'
                },
                privateKeyEncoding:{
                    type:'pkcs1',
                    format:'pem'
                }
            })
            console.log({privateKey,publicKey});
            const publicKeyString = await KeyTokenService.createKeyToken({
                userId:newUser._id,
                publicKey
            });
            if(!publicKeyString){
                return{
                    code:'xxx',
                    message:'publicKeyString error'
                }
            }
            const publicKeyObject = crypto.createPublicKey(publicKeyString)
            //create token pair
            const tokens = await createTokenPair({userId:newUser._id,email},publicKeyObject,privateKey)
            console.log(`Create Token Success::`,tokens);
            return{
                code:201,
                metadata:{
                    shop:newUser,
                    tokens
                },    
            }
        }
        return {
            code:200,
            metadata:null
        }
    }

    static logIn = async({email, password, refreshToken =  null})=>{
        //1
        const foundUser = await UserService.findByEmail({email})
        if(!foundUser) throw new BadRequestError('User not registed');
        //2

        const salt = foundUser.salt
        console.log('this is salt',salt)
        const passwordHashed = await crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
        const match = (passwordHashed === foundUser.password);
        console.log(`this is passwordHashed ${passwordHashed}\n this is foundUser password ${foundUser.password}`)
        if(!match) throw new AuthFailureError('Authentication error')

        //3
        const {privateKey,publicKey } = crypto.generateKeyPairSync('rsa',{
            modulusLength:4096,
            publicKeyEncoding:{
                type:'pkcs1',
                format:'pem'
            },
            privateKeyEncoding:{
                type:'pkcs1',
                format:'pem'
            }
        })
        //4
        const { _id:userId } = foundUser
        const tokens = await createTokenPair({userId,email},publicKey,privateKey)

        await KeyTokenService.createKeyToken({
            refreshToken:tokens.refreshToken,
            privateKey,
            publicKey,
            userId:foundUser._id,email
        })  
        return{
            user:getInfoData({field:['_id','name'],object:foundUser}),
            tokens
        }
    }
    static logOut = async(keyStore)=>{
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
        console.log({delKey})
        return delKey 
    }
}


module.exports = AccessService
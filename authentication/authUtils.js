'use strict'

const JWT = require('jsonwebtoken');
const { asyncHandler } = require('../helper/asyncHandler');
const {AuthFailureError,NotFoundError} = require('../core/errorResponse')

const createTokenPair = async (payload, publicKey, privateKey)=>{
    try {
        const accessToken = await JWT.sign(payload,privateKey, {
            algorithm: 'RS256',
            expiresIn:'2 days',
        })
        const refreshToken= await JWT.sign(payload,privateKey, {
            algorithm: 'RS256',
            expiresIn:'7 days',
        })

        //
        JWT.verify(accessToken,publicKey,(err,decode)=>{
            if(err){
                console.log(`error verify::`,err)
            }else{
                console.log(`decode verify`,decode)
            }
        })
        return {accessToken,refreshToken}
    } catch (error) {
        console.log('Authentication Utilities error:::',error)
    }
}

const authentication = asyncHandler(async(req,res,next)=>{
    /* 
        1 - check userId misssing
        2 - get acccess token
        3 - verify Token
        4 - check user in database
        5 - check keyStore with this userId
        6 - OK => return next()
    */

    //1
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invalid Request')

    //2
    const keyStore = await findByUserId(userId)
    if(!keyStore) throw new NotFoundError('Not Found Keystore')

    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invalid Request')

    try {
        const decodeUser = JWT.verify(accessToken,keyStore.publicKey)
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid User Id')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})



module.exports={
    createTokenPair,
    authentication,
}
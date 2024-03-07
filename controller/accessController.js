'use strict'
const {OK, CREATED, SuccessResponse} = require('../core/successResponse');
const AccessService = require('../service/accessService');

class AccessController{
    static register = async (req,res,next)=>{
        new CREATED({
            message:'registed OK',
            metadata:await AccessService.register(req.body)//invoke AccessService.register(req.body) and attach to metadata
        }).send(res)
    }
    static logIn = async (req,res,next)=>{
        new SuccessResponse({
            metadata:await AccessService.logIn(req.body)
        }).send(res)
    }
    static logOut = async (req,res,next)=>{
        new SuccessResponse({
            message:'logout success',
            metadata:await AccessService.logOut( {keyStore:req.keyStore} )
        }).send(res)
    }
}

module.exports = AccessController
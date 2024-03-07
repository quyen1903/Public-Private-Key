'use strict'

const userModel = require("../models/user")

class UserService{
    static findByEmail = async({email,select = {email:1, password:1, salt:1}})=>{
        return await userModel.findOne({email}).select(select).lean()
    }
    
    static findSaltByEmail = async({email,select = {salt:1}})=>{
        return await userModel.findOne({email}).select(select).lean()
    }
}


module.exports = UserService

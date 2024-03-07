'use strict'

const{model,Schema,Types} = require('mongoose');


const DOCUMENT_NAME='User'
const COLLECTION_NAME='Users'
 // Declare the Schema of the Mongo model
const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    password:{
        type:String,
    },
    salt:{
        type:String
    },
    // twitterId:{
    //     type:String,
    //     unique:true
    // },
    // googleId: {
    //     type:String,
    //     unique:true
    // },
    secrets: [
        {
          _id:Types.ObjectId,
          text: String,
        },
    ],
},{
    timestamps:true,
    collection:COLLECTION_NAME
});
//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
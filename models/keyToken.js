const { model,Schema,Types }=require('mongoose');

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

const keyTokenSchema = new Schema({
    user:{
      type: Types.ObjectId,
      require:true,
      ref:'User'
    },
    privateKey:{
        type:String,
        require:true
    },
    publicKey:{
        type:String,
        require:true
    },
    refreshToken:{
        type:String,
        require:true
    },

},{
    collection:COLLECTION_NAME,
    timestamps:true
});

module.exports = model(DOCUMENT_NAME,keyTokenSchema);
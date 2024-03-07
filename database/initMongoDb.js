const mongoose = require('mongoose');
const { countConnect } = require('../helper/checkConnect.js');
require('dotenv').config({ path: './.env' });

const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);

class Database{
    constructor(){
        this.connect();
    }
    connect(type = 'mongodb'){
        if(1 === 1){
            mongoose.set('debug',true);
            mongoose.set('debug',{color:true})
        }
        mongoose.connect(DB,{maxPoolSize:50})
        .then(_=>{
            console.log('connected mongodb success pro',countConnect())
        })
        .catch(err=>console.log(`Err connect!`))
    }
    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance();
module.exports= instanceMongodb
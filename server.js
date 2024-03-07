const app = require('./app');
const PORT = process.env.PORT

const server = app.listen(PORT,()=>{
    console.log(`Secrets start with port ${PORT}`)
})

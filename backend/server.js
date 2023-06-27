const app = require('./app');
const connect=require('./config/database')

const dotenv=require('dotenv');
const connectDatabase = require('./config/database');
//Handling Uncaught Exception (console.log(youtube) below code is for not defined error)
process.on("uncaughtException",(err)=>{
    console.log("Error: ${err.message} ");
    console.log("shutting down the server due to uncaught Exception ")
    process.exit(1);
})
//CONFIG to inlude port 
dotenv.config({path:'backend/config/config.env'})
//Connecting to database
connectDatabase();



const server=app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandled Promises Rejection
process.on("unhandledRejection",(err)=>{
    console.log("Error: ${err.message} ");
    console.log("shutting down the server due to unhandled promises Rejection");
    server.close(()=>{
        process.exit(1);
    })

}

)


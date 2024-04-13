import mongoose from "mongoose";

const db_connection = async ()=>{
    await mongoose.connect(process.env.LOCAL_HOST_URL)
    .then(res=>{console.log("Conected successfuly");})
    .catch(err=>{console.log("Error: ",err);})
}

export default db_connection;


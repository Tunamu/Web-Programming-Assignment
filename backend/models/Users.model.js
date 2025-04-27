import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    maxPoints: {
        type: Number,
        required: false
    }
})


const Users = mongoose.model("Users",usersSchema)

export default Users;
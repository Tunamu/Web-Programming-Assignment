import UsersModel from "../models/Users.model.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
    try{
        const users = await UsersModel.find();
        res.status(200).json({success: "true", data: users});
    }catch(error){
        res.status(500).json({success: "false", message: error.message});
    }
}

export const getUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: "false", message: "User id not found"});
    }

    try {
        const user = await UsersModel.findById(id);
        res.status(200).json({success: "true", data: user});
    }catch(error){
        res.status(500).json({success: "false", message: error.message});
    }
}

export const postUser = async (req, res) => {
    const user = req.body;

    if(!user.username || !user.password || !user.email){
        return res.status(400).json({success: "false", message:"Please enter all fields"});
    }

    const newUser = new UsersModel(user)

    try{
        await newUser.save()
        res.status(200).json({success: "true", data: newUser});
    }catch(error){
        console.log("Error creating user." + error.message);
        res.status(500).json({success: "false", message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: "false", message: "User id not found"});
    }

    try{
        await UsersModel.findByIdAndDelete({_id : id});
        res.status(200).json({success: "true", message: "User deleted successfully"});
    }catch(error){
        res.status(500).json({success: "false", message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;

    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: "false", message: "User id not found"});
    }

    try{
        const updatedUser = await UsersModel.findByIdAndUpdate(id,user,{new: true})
        res.status(200).json({success: "true", data: updatedUser});
    }catch(error){
        res.status(500).json({success: "false", message: error.message});
    }
}
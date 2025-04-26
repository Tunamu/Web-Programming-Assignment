import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import QuestionsModel from "./models/Questions.model.js";
import cors from 'cors';

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json())

app.get('/api/GetAllQuestions', async (req, res) => {
    try{
        const questions = await QuestionsModel.find();
        res.status(200).json({success: true, questions: questions});
    }catch(error){
        console.error("Error getting questions from server");
        res.status(500).json({success:false ,error: error.message});
    }
})

app.post('/api/PostQuestion', async (req, res) => {
    const question = req.body;

    if(!question.type || !question.difficulty || !question.category || !question.question || !question.correct_answer || !question.incorrect_answers){
        return res.status(400).json({success: false, message: 'Please provide all fields'});
    }

    const newQuestion = new QuestionsModel(question);

    try{
        await newQuestion.save();
        return res.status(200).json({success: true, question: newQuestion});
    }catch(error){
        console.error("Error creating Question", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
})

app.delete('/api/DeleteQuestion/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await QuestionsModel.findByIdAndDelete({_id: id});
        return res.status(200).json({success: true, message:  "Question deleted successfully" });
    }catch(error){
        console.error("Error deleting Question", error.message);
        res.status(404).json({success: false, message: "Question not found"});
    }
})

app.listen(5001, ()=> {
    connectDB()
    console.log("Server started at http://localhost:5000");
});


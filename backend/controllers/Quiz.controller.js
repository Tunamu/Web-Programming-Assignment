import QuizModel from "../models/Quiz.model.js";
import mongoose from "mongoose";

const ScoreCalculator = (grade,time ) => {
    const n = 100 * grade;
    const base = Math.abs(n * Math.exp(1));
    const expo = -0.2 * time;
    const result = Math.pow(base, expo);
    return grade > 0 ? result : -result;
}

export const postQuiz = async (req, res) => {
    try{
        const data = req.body;
        let score = 0;

        data.forEach(item => {
            if(!mongoose.Types.ObjectId.isValid(item.questionId)){
                res.status(400).json({success:false , error:"One or more question id is invalid"});
            }else{
                if(item.selectedAnswer === item.correctAnswer) {
                    score += ScoreCalculator(1,item.timeTaken);
                }else{
                    score += ScoreCalculator(-1,item.timeTaken);
                }
            }
        })

        //IF konacak
        //const newQuiz = new QuizModel(userId,score)
        res.status(200).json({success:true , score:score});
    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const getLeaderBoard = async (req, res) => {
    try{
        const leaderBoard = await QuizModel.find().sort({score:-1});
        if(!leaderBoard){
            res.status(404).json({success:false , error:"Leaderboard not found"});
        }else{
            res.status(200).json({success:true , data:leaderBoard});
        }
    }catch(error){
        res.status(500).json({success:false , error:error.message});
    }
}
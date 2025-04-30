import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    score: {
        type: mongoose.Schema.Types.Double,
        required: true,
    }},
    {
    timestamps: true,
    }
)

const QuizResults = mongoose.model("QuizResults", QuizSchema);

export default QuizResults;
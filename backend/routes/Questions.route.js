import express from 'express';
import {deleteQuestion, getAllQuestions, postQuestion, getQuiz} from "../controllers/Questions.controller.js";

const router = express.Router();

router.get("/Quiz", getQuiz);
router.get('/', getAllQuestions)
router.post('/', postQuestion)
router.delete('/:id', deleteQuestion)

export default router;
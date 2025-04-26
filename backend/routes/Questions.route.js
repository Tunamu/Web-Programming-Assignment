import express from 'express';
import {deleteQuestion, getAllQuestions, postQuestion} from "../controllers/Questions.controller.js";

const router = express.Router();

router.get('/', getAllQuestions)
router.post('/', postQuestion)
router.delete('/:id', deleteQuestion)

export default router;
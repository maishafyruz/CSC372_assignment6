/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file defines the routes for the Triviabook API.
*/

import { Router } from 'express'
import {
  listTopics,
  listQuestionsByTopic,
  randomQuestion
} from '../controllers/trivia-controller.js'

let router = Router()

router.get('/topics', listTopics)
router.get('/topic/:topic', listQuestionsByTopic)
router.get('/random', randomQuestion)

export default router
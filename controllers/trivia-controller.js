/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file contains the controller functions for the Triviabook API.
*/

import {
  getAllTopics, findTopic, getQuestionsByTopic, getRandomQuestion
} from '../models/trivia-model.js'

/**
 * Sends all trivia topics from the database.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @return {Promise<void>} Sends the topic list as JSON.
 */
export async function listTopics(req, res) {
  let topics = await getAllTopics()

  res.json(topics)
}

/**
 * Sends the questions for a topic with optional filters.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @return {Promise<void>} Sends the matching questions as JSON.
 */
export async function listQuestionsByTopic(req, res) {
  let topicName = req.params.topic
  let difficulty = req.query.difficulty
  let limit = req.query.limit

  let topic = await findTopic(topicName)

  if (!topic) {
    return res.status(404).json({
      error: 'Topic not found.'
    })
  }

  if (
    difficulty &&
    difficulty !== 'easy' &&
    difficulty !== 'medium' &&
    difficulty !== 'hard'
  ) {
    return res.status(400).json({
      error: 'Difficulty must be easy, medium, or hard.'
    })
  }

  if (limit) {
    limit = Number(limit)

    if (!Number.isInteger(limit) || limit <= 0) {
      return res.status(400).json({
        error: 'Limit must be a positive integer.'
      })
    }
  }

  let questions = await getQuestionsByTopic(
    topic.id,
    difficulty,
    limit
  )

  res.json(questions)
}

/**
 * Sends one random trivia question without the answer.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @return {Promise<void>} Sends a random question as JSON.
 */
export async function randomQuestion(req, res) {
  let question = await getRandomQuestion()

  if (!question) {
    return res.status(404).json({
      error: 'No questions found.'
    })
  }

  res.json(question)
}
/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file contains the database functions for the Triviabook application.
*/

import { pool } from '../database.js'

/**
 * Gets all trivia topics from the database.
 * @return {Promise<Array>} A list of all topics.
 */
export async function getAllTopics() {
  let result = await pool.query(
    'SELECT * FROM topics ORDER BY id'
  )

  return result.rows
}

/**
 * Finds a topic by name.
 * @param {string} topic - The topic name to find.
 * @return {Promise<Object|undefined>} The topic if it exists.
 */
export async function findTopic(topic) {
  let result = await pool.query(
    'SELECT * FROM topics WHERE name = $1',
    [topic]
  )

  return result.rows[0]
}

/**
 * Gets questions for a topic with optional difficulty and limit filters.
 * @param {number} topicId - The id of the topic.
 * @param {string} difficulty - The difficulty filter.
 * @param {number} limit - The maximum number of questions to return.
 * @return {Promise<Array>} The matching questions.
 */
export async function getQuestionsByTopic(topicId, difficulty, limit) {
  let queryText =
    'SELECT id, question, answer, difficulty FROM questions WHERE topic_id = $1'

  let params = [topicId]

  if (difficulty) {
    params.push(difficulty)
    queryText += ` AND difficulty = $${params.length}`
  }

  queryText += ' ORDER BY id'

  if (limit) {
    params.push(limit)
    queryText += ` LIMIT $${params.length}`
  }

  let result = await pool.query(queryText, params)

  return result.rows
}

/**
 * Gets one random trivia question from the database.
 * @return {Promise<Object|undefined>} A random question.
 */
export async function getRandomQuestion() {
  let result = await pool.query(
    `SELECT questions.id, topics.name AS topic,
            questions.question, questions.difficulty
     FROM questions
     JOIN topics ON questions.topic_id = topics.id
     ORDER BY RANDOM()
     LIMIT 1`
  )

  return result.rows[0]
}
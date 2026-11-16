/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file contains the controller functions for the Triviabook API.
*/

import { getAllTopics } from '../models/trivia-model.js'

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
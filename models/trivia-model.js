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
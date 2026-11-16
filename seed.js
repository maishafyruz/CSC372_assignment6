/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file adds the starter Triviabook topics and questions to the Postgres database.
*/

import { pool } from './database.js'

/**
 * Adds the required starter data to the database.
 * @return {Promise<void>} Resolves when the seed data has been added.
 */
async function seedDatabase() {
  let scienceResult = await pool.query(
    'INSERT INTO topics (name) VALUES ($1) RETURNING id',
    ['science']
  )

  let scienceId = scienceResult.rows[0].id

  let geographyResult = await pool.query(
    'INSERT INTO topics (name) VALUES ($1) RETURNING id',
    ['geography']
  )

  let geographyId = geographyResult.rows[0].id

  await pool.query(
    `INSERT INTO questions (topic_id, question, answer, difficulty)
     VALUES
     ($1, $2, $3, $4),
     ($1, $5, $6, $7),
     ($1, $8, $9, $10)`,
    [
      scienceId,
      'What planet is known as the Red Planet?',
      'Mars',
      'easy',
      'What is the chemical symbol for gold?',
      'Au',
      'medium',
      'What is the powerhouse of the cell?',
      'Mitochondria',
      'easy'
    ]
  )

  await pool.query(
    `INSERT INTO questions (topic_id, question, answer, difficulty)
     VALUES
     ($1, $2, $3, $4),
     ($1, $5, $6, $7)`,
    [
      geographyId,
      'What is the capital of Australia?',
      'Canberra',
      'medium',
      'Which river flows through Cairo?',
      'The Nile',
      'easy'
    ]
  )

  console.log('Seed data added.')
  await pool.end()
}

seedDatabase()
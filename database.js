/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file connects the Triviabook application to the Neon Postgres database and creates the topics and questions tables if they do not exist.
*/

import pg from 'pg'

export let pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

await pool.query(`
  CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
  )
`)

await pool.query(`
  CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard'))
  )
`)
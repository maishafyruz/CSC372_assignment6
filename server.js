/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file creates the Express server for the Triviabook application and connects the Triviabook API routes.
*/

import express from 'express'
import triviaRouter from './routes/trivia-router.js'

let app = express()
let port = process.env.PORT || 3000

app.use(express.json())

app.use('/triviabook', triviaRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
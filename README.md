# Triviabook - CSC 372 Assignment 6

Triviabook is a full-stack trivia application built with Node.js, Express, and PostgreSQL. The application stores trivia topics and questions in a Neon Postgres database and provides an Express API for retrieving questions, checking answers, and adding new questions.

The browser interface allows users to view trivia topics, search questions by topic and difficulty, request a random question, check an answer, and add new trivia questions.

## Live Application

Render deployment link: **https://csc372-assignment6.onrender.com**

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Neon Postgres
- HTML
- CSS
- JavaScript

## Database Schema

The application uses two related tables.

### `topics`

| Column | Type | Description |
| --- | --- | --- |
| `id` | SERIAL PRIMARY KEY | Unique topic ID |
| `name` | TEXT NOT NULL UNIQUE | Name of the trivia topic |

### `questions`

| Column | Type | Description |
| --- | --- | --- |
| `id` | SERIAL PRIMARY KEY | Unique question ID |
| `topic_id` | INTEGER NOT NULL | References `topics(id)` |
| `question` | TEXT NOT NULL | Trivia question |
| `answer` | TEXT NOT NULL | Correct answer |
| `difficulty` | TEXT NOT NULL | `easy`, `medium`, or `hard` |

The `topic_id` column creates the relationship between each question and its topic.

## Seed Data

The database is initially seeded with the required science and geography questions from the assignment specification.

The seed script is located in:

```text
seed.js
```

To run the seed script:

```bash
node --env-file=.env seed.js
```

The seed script should only be run when the starter data needs to be added to a new database.

## Setup

1. Clone the GitHub repository.

2. Install the project dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory.

4. Add the Neon Postgres connection string:

```text
DATABASE_URL=your_neon_database_url
```

5. If the database needs the starter data, run:

```bash
node --env-file=.env seed.js
```

6. Start the application:

```bash
npm start
```

7. Open the application in the browser:

```text
http://localhost:3000
```

The `.env` file and `node_modules` folder are excluded from source control through `.gitignore`.

## API Endpoints

### GET `/triviabook/topics`

Returns a list of all trivia topics.

Example:

```text
GET /triviabook/topics
```

---

### GET `/triviabook/topic/:topic`

Returns the questions belonging to the specified topic.

Optional query parameters:

- `difficulty` - filters by `easy`, `medium`, or `hard`
- `limit` - limits the number of questions returned

Examples:

```text
GET /triviabook/topic/science
```

```text
GET /triviabook/topic/science?difficulty=easy
```

```text
GET /triviabook/topic/science?limit=2
```

```text
GET /triviabook/topic/science?difficulty=easy&limit=1
```

An invalid topic returns a `404` response. Invalid difficulty or limit values return a `400` response.

---

### GET `/triviabook/random`

Returns one randomly selected trivia question.

The correct answer is not included in the response.

Example:

```text
GET /triviabook/random
```

---

### POST `/triviabook/answer`

Checks a user's answer to a question.

The request body requires:

```json
{
  "id": 1,
  "guess": "Mars"
}
```

The comparison is case-insensitive and ignores leading and trailing whitespace.

Example response:

```json
{
  "correct": true,
  "answer": "Mars"
}
```

Missing parameters return a `400` response. A question ID that does not exist returns a `404` response.

---

### POST `/triviabook/question/add`

Adds a new question to the database.

The request body requires:

```json
{
  "topic": "history",
  "question": "Who was the first president of the United States?",
  "answer": "George Washington",
  "difficulty": "easy"
}
```

If the topic does not already exist, it is created automatically.

The response contains the updated list of questions for the topic.

Missing required fields or an invalid difficulty return a `400` response.

## Project Architecture

The backend follows the model-controller-router structure required for the assignment.

```text
models/
  trivia-model.js

controllers/
  trivia-controller.js

routes/
  trivia-router.js
```

- **Model:** communicates with the PostgreSQL database.
- **Controller:** handles requests, validation, and responses.
- **Router:** defines the API routes and connects them to controller functions.

The application also includes:

```text
database.js
seed.js
server.js
public/
  index.html
  styles.css
  script.js
```

## Author

Maisha Fyruz  
CSC 372-01 - Web Development
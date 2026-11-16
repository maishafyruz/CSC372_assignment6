/*
  Name: Maisha Fyruz
  Date: 11.15.2026
  CSC 372-01

  This file contains the client-side JavaScript for the Triviabook
  application. It loads data from the Express API and updates the page.
*/

/**
 * Loads all trivia topics from the API and displays them on the page.
 * @return {Promise<void>} Resolves after the topics are displayed.
 */
async function loadTopics() {
  let topicsList = document.getElementById('topics-list')

  topicsList.innerHTML = ''

  try {
    let response = await fetch('/triviabook/topics')

    if (!response.ok) {
      throw new Error('Unable to load topics.')
    }

    let topics = await response.json()

    let list = document.createElement('ul')

    topics.forEach(function(topic) {
      let item = document.createElement('li')
      item.textContent = topic.name
      list.appendChild(item)
    })

    topicsList.appendChild(list)
  } catch (error) {
    let message = document.createElement('p')
    message.textContent = error.message
    topicsList.appendChild(message)
  }
}

let topicSearchForm = document.getElementById('topic-search-form')
topicSearchForm.addEventListener('submit', searchByTopic)

let randomButton = document.getElementById('random-button')
randomButton.addEventListener('click', loadRandomQuestion)

let answerForm = document.getElementById('answer-form')
answerForm.addEventListener('submit', checkAnswer)

let addQuestionForm = document.getElementById('add-question-form')
addQuestionForm.addEventListener('submit', addQuestion)

loadTopics()

/**
 * Loads one random trivia question from the API.
 * @return {Promise<void>} Resolves after the random question is displayed.
 */
async function loadRandomQuestion() {
  let randomQuestion = document.getElementById('random-question')

  randomQuestion.innerHTML = ''

  try {
    let response = await fetch('/triviabook/random')

    if (!response.ok) {
      throw new Error('Unable to load a random question.')
    }

    let question = await response.json()

    let questionText = document.createElement('p')
    questionText.textContent = question.question

    let details = document.createElement('p')
    details.textContent =
      'Topic: ' + question.topic +
      ' | Difficulty: ' + question.difficulty +
      ' | Question ID: ' + question.id

    randomQuestion.appendChild(questionText)
    randomQuestion.appendChild(details)
  } catch (error) {
    let message = document.createElement('p')
    message.textContent = error.message
    randomQuestion.appendChild(message)
  }
}

/**
 * Checks a user's answer for a trivia question.
 * @param {Event} event - The form submit event.
 * @return {Promise<void>} Resolves after the answer result is displayed.
 */
async function checkAnswer(event) {
  event.preventDefault()

  let id = document.getElementById('question-id').value
  let guess = document.getElementById('guess-input').value
  let result = document.getElementById('answer-result')

  result.innerHTML = ''

  try {
    let response = await fetch('/triviabook/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: Number(id),
        guess: guess
      })
    })

    let data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    let message = document.createElement('p')

    if (data.correct) {
      message.textContent = 'Correct! The answer is ' + data.answer + '.'
    } else {
      message.textContent = 'Incorrect. The correct answer is ' + data.answer + '.'
    }

    result.appendChild(message)
  } catch (error) {
    let message = document.createElement('p')
    message.textContent = error.message
    result.appendChild(message)
  }
}

/**
 * Adds a new trivia question through the API.
 * @param {Event} event - The form submit event.
 * @return {Promise<void>} Resolves after the question is added.
 */
async function addQuestion(event) {
  event.preventDefault()

  let topic = document.getElementById('new-topic').value.trim()
  let question = document.getElementById('new-question').value.trim()
  let answer = document.getElementById('new-answer').value.trim()
  let difficulty = document.getElementById('new-difficulty').value
  let result = document.getElementById('add-question-result')

  result.innerHTML = ''

  try {
    let response = await fetch('/triviabook/question/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: topic,
        question: question,
        answer: answer,
        difficulty: difficulty
      })
    })

    let data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    let message = document.createElement('p')
    message.textContent = 'Question added successfully.'
    result.appendChild(message)

    let list = document.createElement('ul')

    data.forEach(function(item) {
      let listItem = document.createElement('li')
      listItem.textContent =
        item.question + ' (' + item.difficulty + ')'
      list.appendChild(listItem)
    })

    result.appendChild(list)

    document.getElementById('add-question-form').reset()

    loadTopics()
  } catch (error) {
    let message = document.createElement('p')
    message.textContent = error.message
    result.appendChild(message)
  }
}

/**
 * Searches for trivia questions by topic and optional filters.
 * @param {Event} event - The form submit event.
 * @return {Promise<void>} Resolves after the search results are displayed.
 */
async function searchByTopic(event) {
  event.preventDefault()

  let topic = document.getElementById('topic-input').value.trim()
  let difficulty = document.getElementById('difficulty-select').value
  let limit = document.getElementById('limit-input').value
  let results = document.getElementById('topic-results')

  results.innerHTML = ''

  if (!topic) {
    let message = document.createElement('p')
    message.textContent = 'Please enter a topic.'
    results.appendChild(message)
    return
  }

  let url = '/triviabook/topic/' + encodeURIComponent(topic)

  if (difficulty) {
    url += '?difficulty=' + encodeURIComponent(difficulty)
  }

  if (limit) {
    if (difficulty) {
      url += '&limit=' + encodeURIComponent(limit)
    } else {
      url += '?limit=' + encodeURIComponent(limit)
    }
  }

  try {
    let response = await fetch(url)
    let data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    if (data.length === 0) {
      let message = document.createElement('p')
      message.textContent = 'No questions found.'
      results.appendChild(message)
      return
    }

    let list = document.createElement('ul')

    data.forEach(function(item) {
      let listItem = document.createElement('li')
      listItem.textContent =
        item.question + ' (' + item.difficulty + ')'
      list.appendChild(listItem)
    })

    results.appendChild(list)
  } catch (error) {
    let message = document.createElement('p')
    message.textContent = error.message
    results.appendChild(message)
  }
}
// Questions.js

export const questions = {
  1: {
    text: 'Do you like video games?',
    options: ['Yes', 'No'],
  },
  2: {
    text: 'Do you prefer adventure games?',
    options: ['Yes', 'No'],
    condition: (response) => response === 'Yes',
  },
  3: {
    text: 'Do you like books?',
    options: ['Yes', 'No'],
    condition: (response) => response === 'No',
  },
  4: {
    text: 'Do you like music?',
    options: ['Yes', 'No'],
    condition: (response) => response === 'No',
  },
  5: {
    text: 'Do you like sports?',
    options: ['Yes', 'No'],
    condition: (response) => response === 'No',
  },
  6 : {
    text: 'Do you prefer strategy games?',
    options: ['Yes', 'No'],
    condition: (response) => response === 'No',

  },
  // Add more questions based on your logic
}

export const initialResponses = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  // Add more questions based on your logic
}

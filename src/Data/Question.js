export const questions = {
  1: {
    text: 'Do you like video games?',
    options: ['Yes', 'No'],
  },
  2: {
    text: 'Do you prefer adventure games?',
    options: ['Yes', 'No'],
    condition: (response, responses) => responses[1] === 'Yes',
  },
  3: {
    text: 'Do you prefer strategy games?',
    options: ['Yes', 'No'],
    condition: (response, responses) => responses[2] === 'No',
  },
  4: {
    text: 'Do you like books?',
    options: ['Yes', 'No'],
    condition: (response, responses) => responses[1] === 'No',
  },
  5: {
    text: 'Do you like musics?',
    options: ['Yes', 'No'],
    condition: (response, responses) => responses[5] === 'No',
  },
  // Ajoutez d'autres questions en fonction de votre logique
}

export const initialResponses = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  // Ajoutez plus de questions en fonction de votre logique
}

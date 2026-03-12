const IDLE_QUIPS = [
  "Still deciding?",
  "I believe in you.",
  "Tests don't write themselves...",
  "Take your time, I'll wait.",
  "The CI pipeline misses you.",
  "Pick a branch, any branch.",
  "You're doing great.",
  "I've been here since the mainframe days.",
  "Fun fact: I never sleep.",
  "That branch looks interesting...",
  "Trust your instincts.",
  "Ship it!",
  "Have you tried turning it off and on again?",
  "I promise not to judge your code.",
  "Remember to stretch.",
  "Coffee break?",
];

let lastIndex = -1;

export const getRandomQuip = (): string => {
  let index = Math.floor(Math.random() * IDLE_QUIPS.length);
  while (index === lastIndex && IDLE_QUIPS.length > 1) {
    index = Math.floor(Math.random() * IDLE_QUIPS.length);
  }
  lastIndex = index;
  return IDLE_QUIPS[index];
};

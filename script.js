// Story Segment Pool
const storySegments = [
  {
    text: "You find yourself in a magical forest. Do you follow the laughter or the mysterious light?",
    choice1: "Follow the laughter",
    choice2: "Follow the light",
    image1: "laughter.jpg",
    image2: "light.jpg",
    nextSegment1: 1,
    nextSegment2: 2,
  },
  {
    text: "You meet a group of mischievous fairies. Do you join their dance or watch from a distance?",
    choice1: "Join the dance",
    choice2: "Watch from a distance",
    image1: "dance.jpg",
    image2: "watch.jpg",
    nextSegment1: 3,
    nextSegment2: 4,
  },
  {
    text: "The light leads to Prospero. Do you help him with his magic or explore the island?",
    choice1: "Help Prospero",
    choice2: "Explore the island",
    image1: "prospero.jpg",
    image2: "island.jpg",
    nextSegment1: 5,
    nextSegment2: 6,
  },
  // Add 40+ story segments as needed.
];

// Game Variables
let score = 10;
let timer = 10;
let currentSegmentIndex = 0;
let timerInterval;

// DOM Elements
const storyText = document.getElementById("story-text");
const choice1Button = document.getElementById("choice1");
const choice2Button = document.getElementById("choice2");
const imageDisplay = document.getElementById("image-display");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

// Update Story Segment
function updateStory(segmentIndex) {
  clearTimeout(timerInterval); // Reset timer
  timer = 10;
  currentSegmentIndex = segmentIndex;

  const segment = storySegments[segmentIndex];
  storyText.innerText = segment.text;
  choice1Button.innerText = segment.choice1;
  choice2Button.innerText = segment.choice2;
  imageDisplay.innerHTML = ""; // Clear image
  startTimer();
}

// Handle Choice
function handleChoice(choice) {
  const segment = storySegments[currentSegmentIndex];
  const nextSegmentIndex = choice === 1 ? segment.nextSegment1 : segment.nextSegment2;
  const image = choice === 1 ? segment.image1 : segment.image2;

  imageDisplay.innerHTML = `<img src="${image}" alt="Choice Image">`;
  setTimeout(() => updateStory(nextSegmentIndex), 3000);
}

// Timer Logic
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.innerText = timer;

    if (timer === 0) {
      clearInterval(timerInterval);
      score--;
      scoreDisplay.innerText = score;
      if (score <= 0) endGame();
      else updateStory(currentSegmentIndex); // Repeat the same segment
    }
  }, 1000);
}

// End Game
function endGame() {
  alert("Decider has concluded! Your adventure ends here. Thanks for playing!");
  location.reload(); // Restart game
}

// Custom Introduction
function startGame() {
  alert("Welcome to *Decider*! Will your journey through Shakespeare’s magical worlds end in triumph or disaster? Make your choices wisely!");
  updateStory(0);
}

// Event Listeners
choice1Button.addEventListener("click", () => handleChoice(1));
choice2Button.addEventListener("click", () => handleChoice(2));

// Start the Game
startGame();

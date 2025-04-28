// DOM Elements
const gameContainer = document.getElementById('game-container');
const startScreen = document.getElementById('start-screen');
const themeScreen = document.getElementById('theme-screen');
const categoryScreen = document.getElementById('category-screen');
const gameScreen = document.getElementById('game-screen');
const playerNameInput = document.getElementById('player-name');
const newGameButton = document.getElementById('new-game');
const lettersButton = document.getElementById('letters-button');
const numbersButton = document.getElementById('numbers-button');
const shapesButton = document.getElementById('shapes-button');
const allButton = document.getElementById('all-button');
const scoreBoard = document.getElementById('score-board');
const wrongPopsBoard = document.getElementById('wrong-pops-board');
const leaderboardButton = document.getElementById('leaderboard-button');
const leaderboardPopup = document.getElementById('leaderboard-popup');
const closeLeaderboardButton = document.getElementById('close-leaderboard');
const howToPlayButton = document.getElementById('how-to-play');
const howToPlayPopup = document.getElementById('how-to-play-popup');
const closeHowToPlayButton = document.getElementById('close-how-to-play');
const gameOverDiv = document.getElementById('game-over');
const restartGameButton = document.getElementById('restart-game');
const bottomLine = document.getElementById('bottom-line');
const leaderboardList = document.getElementById('leaderboard-list');
const levelUpPopup = document.getElementById('level-up-popup');
const currentLevelSpan = document.getElementById('current-level');
const finalScoreSpan = document.getElementById('final-score');
const backgroundMusic = document.getElementById('background-music');
const soundToggle = document.getElementById('sound-toggle');
const forestThemeButton = document.getElementById('forest-theme');
const aquaticThemeButton = document.getElementById('aquatic-theme');
const difficultThemeButton = document.getElementById('difficult-theme');
const forestBackground = document.getElementById('forest-background');
const movingAnimals = document.getElementById('moving-animals');
const aquaticBackground = document.getElementById('aquatic-background');
const movingFish = document.getElementById('moving-fish');
const difficultBackground = document.getElementById('difficult-background');
const pauseButton = document.getElementById('pause-button');
const pausePopup = document.getElementById('pause-popup');
const resumeButton = document.getElementById('resume-button');
const achievementsButton = document.getElementById('achievements-button');
const achievementsPopup = document.getElementById('achievements-popup');
const closeAchievementsButton = document.getElementById('close-achievements');
const achievementsList = document.getElementById('achievements-list');
const comboCounter = document.getElementById('combo-counter');
const comboPopup = document.getElementById('combo-popup');
const comboText = document.getElementById('combo-text');
const comboCount = document.getElementById('combo-count');
const timerDisplay = document.getElementById('timer');
const classicModeButton = document.getElementById('classic-mode');
const timedModeButton = document.getElementById('timed-mode');
const popSound = document.getElementById('pop-sound');
const comboSound = document.getElementById('combo-sound');
const bombSound = document.getElementById('bomb-sound');
const aboutButton = document.getElementById('about-button');
const aboutPopup = document.getElementById('about-popup');
const closeAbout = document.getElementById('close-about');
const disclaimerButton = document.getElementById('disclaimer-button');
const disclaimerPopup = document.getElementById('disclaimer-popup');
const closeDisclaimer = document.getElementById('close-disclaimer');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const mobileHowToPlay = document.getElementById('mobile-how-to-play');
const mobileLeaderboard = document.getElementById('mobile-leaderboard-button');
const mobileAchievements = document.getElementById('mobile-achievements-button');
const mobileAbout = document.getElementById('mobile-about-button');
const mobileDisclaimer = document.getElementById('mobile-disclaimer-button');

// Game State
let playerName = '';
let score = 0;
let wrongPops = 0;
let gameSpeed = 5;
let level = 1;
let balloonInterval;
let currentCategory = 'all';
let isSoundOn = true;
let isPaused = false;
let currentTheme = 'forest';
let animationsPaused = false;
let balloonsPerInterval = 1;
let combo = 0;
let comboTimeout;
let multiplierActive = false;
let multiplierTimeout;
let gameMode = 'classic';
let gameTime = 60;
let timerInterval;
let achievements = {
  firstGame: false,
  pop100: false,
  perfectGame: false,
  level5: false,
  combo10: false
};
let gameModeSelected = false;

// Leaderboard data
let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
let achievementsData = JSON.parse(localStorage.getItem('achievements')) || {};

// Add this at the start of your script.js
document.addEventListener('DOMContentLoaded', function() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile-specific initialization
    alert("Mobile mode activated"); // Remove after testing
    initMobile();
  }
});

function initMobile() {
  // Any mobile-specific adjustments
}
// Initialize the game
function initGame() {
  initializeLeaderboard();
  loadAchievements();
  setupEventListeners();
  showWelcomeBackground();
}
function setupMobileControls() {
  // Make buttons work on touch devices
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('touchend', function(e) {
      e.preventDefault();
      this.click();
    });
  });
  
  // Make name input work
  const nameInput = document.getElementById('player-name');
  nameInput.addEventListener('touchend', function() {
    this.focus();
  });
  
  // Make balloons pop on touch
  document.addEventListener('touchend', function(e) {
    if (e.target.classList.contains('balloon')) {
      e.preventDefault();
      e.target.click();
    }
  }, { passive: false });
}

function setupEventListeners() {
  // Main game buttons
  newGameButton.addEventListener('click', startGame);
  restartGameButton.addEventListener('click', restartGame);
  
  // Theme selection
  forestThemeButton.addEventListener('click', selectForestTheme);
  aquaticThemeButton.addEventListener('click', selectAquaticTheme);
  difficultThemeButton.addEventListener('click', selectDifficultTheme);
  
  // Category selection
  lettersButton.addEventListener('click', () => startGameWithCategory('letters'));
  numbersButton.addEventListener('click', () => startGameWithCategory('numbers'));
  shapesButton.addEventListener('click', () => startGameWithCategory('shapes'));
  allButton.addEventListener('click', () => startGameWithCategory('all'));
  
  // Game mode selection
  classicModeButton.addEventListener('click', () => setGameMode('classic'));
  timedModeButton.addEventListener('click', () => setGameMode('timed'));
  
  // Popup controls
  leaderboardButton.addEventListener('click', showLeaderboard);
  closeLeaderboardButton.addEventListener('click', hideLeaderboard);
  howToPlayButton.addEventListener('click', showHowToPlay);
  closeHowToPlayButton.addEventListener('click', hideHowToPlay);
  achievementsButton.addEventListener('click', showAchievements);
  closeAchievementsButton.addEventListener('click', hideAchievements);
  aboutButton.addEventListener('click', showAbout);
  closeAbout.addEventListener('click', hideAbout);
  disclaimerButton.addEventListener('click', showDisclaimer);
  closeDisclaimer.addEventListener('click', hideDisclaimer);
  
  // Game controls
  soundToggle.addEventListener('click', toggleSound);
  pauseButton.addEventListener('click', togglePause);
  resumeButton.addEventListener('click', resumeGame);
  
  // Mobile menu
  mobileMenuButton.addEventListener('click', toggleMobileMenu);
  mobileHowToPlay.addEventListener('click', () => {
    showHowToPlay();
    hideMobileMenu();
  });
  mobileLeaderboard.addEventListener('click', () => {
    showLeaderboard();
    hideMobileMenu();
  });
  mobileAchievements.addEventListener('click', () => {
    showAchievements();
    hideMobileMenu();
  });
  mobileAbout.addEventListener('click', () => {
    showAbout();
    hideMobileMenu();
  });
  mobileDisclaimer.addEventListener('click', () => {
    showDisclaimer();
    hideMobileMenu();
  });
  
  // Keyboard controls
  document.addEventListener('keydown', handleKeyDown);
  
  // Touch events for mobile
  gameContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  gameContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('show');
}

function hideMobileMenu() {
  mobileMenu.classList.remove('show');
}

function setGameMode(mode) {
  gameMode = mode;
  gameModeSelected = true;
  classicModeButton.classList.toggle('active', mode === 'classic');
  timedModeButton.classList.toggle('active', mode === 'timed');
}

function startGame() {
  playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert('Please enter your name!');
    return;
  }
  if (!gameModeSelected) {
    alert('Please select a game mode (Classic or Timed)!');
    return;
  }
  
    // Show back button
    document.getElementById('back-to-start').style.display = 'block';
  if (!achievements.firstGame) {
    achievements.firstGame = true;
    unlockAchievement('firstGame');
  }
  
  startScreen.style.display = 'none';
  themeScreen.style.display = 'block';
}

// Add back button functionality
document.getElementById('back-to-start').addEventListener('click', () => {
  themeScreen.style.display = 'none';
  startScreen.style.display = 'block';
});

document.getElementById('back-to-theme').addEventListener('click', () => {
  categoryScreen.style.display = 'none';
  themeScreen.style.display = 'block';
});

document.getElementById('back-to-category').addEventListener('click', () => {
  gameScreen.style.display = 'none';
  categoryScreen.style.display = 'block';
});

function selectForestTheme() {
  currentTheme = 'forest';
  forestBackground.style.display = 'block';
  movingAnimals.style.display = 'block';
  aquaticBackground.style.display = 'none';
  movingFish.style.display = 'none';
  difficultBackground.style.display = 'none';
  
  themeScreen.style.display = 'none';
  categoryScreen.style.display = 'block';
}

function selectAquaticTheme() {
  currentTheme = 'aquatic';
  aquaticBackground.style.display = 'block';
  movingFish.style.display = 'block';
  forestBackground.style.display = 'none';
  movingAnimals.style.display = 'none';
  difficultBackground.style.display = 'none';
  
  themeScreen.style.display = 'none';
  categoryScreen.style.display = 'block';
}

function selectDifficultTheme() {
  currentTheme = 'difficult';
  difficultBackground.style.display = 'block';
  forestBackground.style.display = 'none';
  movingAnimals.style.display = 'none';
  aquaticBackground.style.display = 'none';
  movingFish.style.display = 'none';
  
  themeScreen.style.display = 'none';
  categoryScreen.style.display = 'block';
}

function startGameWithCategory(category) {
  currentCategory = category;
  categoryScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  pauseButton.style.display = 'block';
  
  // Reset game state
  score = 0;
  wrongPops = 0;
  level = 1;
  combo = 0;
  gameSpeed = currentTheme === 'difficult' ? 4 : 5;
  balloonsPerInterval = 1;
  
  // Update displays
  scoreBoard.textContent = `Score: ${score}`;
  wrongPopsBoard.textContent = `Wrong Pops: ${wrongPops}/5`;
  comboCounter.style.display = 'none';
  gameOverDiv.style.display = 'none';
  
  const gameBackBtn = document.getElementById('back-to-category');
  gameBackBtn.style.top = '60px';
  gameBackBtn.style.left = '20px';
  // Clear any existing balloons
  document.querySelectorAll('.balloon, .explosion').forEach(el => el.remove());
  
  // Start game based on mode
  if (gameMode === 'timed') {
    gameTime = 60;
    timerDisplay.textContent = `Time: ${gameTime}s`;
    timerDisplay.style.display = 'block';
    timerInterval = setInterval(updateTimer, 1000);
   
  
  createBalloon();
  balloonInterval = setInterval(createBalloon, 1500);
} else {
  timerDisplay.style.display = 'none';
  // Classic mode
  balloonInterval = setInterval(createBalloon, 1500);
}
  // Play music if sound is on
  if (isSoundOn) backgroundMusic.play();
}

function createBalloon() {
  if (isPaused) return;
  
  for (let i = 0; i < balloonsPerInterval; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    // Determine balloon type (5% chance for special balloon)
    const isSpecial = Math.random() < 0.05;
    let content, balloonType = 'normal';
    
    if (isSpecial) {
      const specialType = Math.random();
      if (specialType < 0.4) {
        balloonType = 'rainbow';
        content = '★';
      } else if (specialType < 0.8) {
        balloonType = 'multiplier';
        content = '2x';
      } else {
        balloonType = 'bomb';
        content = '💣';
      }
    } else {
      // Regular balloon content
      switch (currentCategory) {
        case 'letters':
          content = Math.random() < 0.7 ? getRandomLetter() : getRandomNumber();
          break;
        case 'numbers':
          content = Math.random() < 0.7 ? getRandomNumber() : getRandomLetter();
          break;
        case 'shapes':
          content = getRandomShape();
          break;
        case 'all':
          content = getRandomContent();
          break;
      }
    }
    
    balloon.textContent = content;
    if (balloonType !== 'normal') balloon.classList.add(balloonType);
    
    // Balloon styling
    const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1', '#955251'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = balloonType === 'normal' ? randomColor : '';
    balloon.style.left = `${Math.random() * (gameContainer.offsetWidth - 80)}px`;
    balloon.style.animationDuration = `${gameSpeed}s`;
    
    if (animationsPaused) {
      balloon.style.animationPlayState = 'paused';
    }
    
    // Event listeners
    balloon.addEventListener('click', () => handleBalloonPop(balloon, content, balloonType));
    balloon.addEventListener('touchend', (e) => {
      e.preventDefault();
      handleBalloonPop(balloon, content, balloonType);
    });
    
    // Collision detection
    const checkCollision = setInterval(() => {
      if (isPaused) return;
      const balloonRect = balloon.getBoundingClientRect();
      const bottomLineRect = bottomLine.getBoundingClientRect();
      
      if (balloonRect.bottom >= bottomLineRect.top) {
        clearInterval(checkCollision);
        balloon.remove();
        if (currentCategory === 'shapes' || currentCategory === 'all') {
          wrongPops++;
          wrongPopsBoard.textContent = `Wrong Pops: ${wrongPops}/5`;
          if (wrongPops >= 5) endGame();
        }
      }
    }, 10);
    
    gameContainer.appendChild(balloon);
  }
}


function handleBalloonPop(balloon, content, balloonType) {
  if (isPaused) return;
  
  const balloonRect = balloon.getBoundingClientRect();
  createExplosion(balloonRect.left, balloonRect.top);
  balloon.remove();
  
  // Play sound effect
  if (isSoundOn) {
    if (balloonType === 'bomb') {
      bombSound.currentTime = 0;
      bombSound.play();
    } else {
      popSound.currentTime = 0;
      popSound.play();
    }
  }
  


// Mobile-friendly event listeners:
balloon.addEventListener('click', handleBalloonPop);
balloon.addEventListener('touchend', function(e) {
  e.preventDefault();
  handleBalloonPop(balloon);
}, { passive: false });
  // Handle different balloon types
  switch (balloonType) {
    case 'rainbow':
      addScore(5);
      break;
    case 'multiplier':
      activateMultiplier();
      break;
    case 'bomb':
      addScore(-5);
      break;
    default:
      // Regular balloon logic
      if (currentCategory === 'letters' && !isNaN(content)) {
        wrongPops++;
        wrongPopsBoard.textContent = `Wrong Pops: ${wrongPops}/5`;
        if (wrongPops >= 5) endGame();
        resetCombo();
      } else if (currentCategory === 'numbers' && isNaN(content)) {
        wrongPops++;
        wrongPopsBoard.textContent = `Wrong Pops: ${wrongPops}/5`;
        if (wrongPops >= 5) endGame();
        resetCombo();
      } else {
        addScore(1);
        incrementCombo();
      }
  }
}

function addScore(points) {
  // Apply multiplier if active
  const actualPoints = multiplierActive ? points * 2 : points;
  score += actualPoints;
  scoreBoard.textContent = `Score: ${score}`;
  
  // Check for achievements
  if (score >= 100 && !achievements.pop100) {
    achievements.pop100 = true;
    unlockAchievement('pop100');
  }
  
  checkLevelUp();
}

function activateMultiplier() {
  if (multiplierActive) {
    clearTimeout(multiplierTimeout);
  } else {
    multiplierActive = true;
    document.body.classList.add('multiplier-active');
  }
  
  multiplierTimeout = setTimeout(() => {
    multiplierActive = false;
    document.body.classList.remove('multiplier-active');
  }, 10000);
}

function incrementCombo() {
  combo++;
  comboCounter.textContent = `Combo: ${combo}x`;
  comboCounter.style.display = 'block';
  
  // Show combo popup for combos of 5 or more
  if (combo >= 5) {
    showComboPopup();
    
    // Achievement for 10+ combo
    if (combo === 10 && !achievements.combo10) {
      achievements.combo10 = true;
      unlockAchievement('combo10');
    }
  }
  
  // Reset combo after 2 seconds of inactivity
  clearTimeout(comboTimeout);
  comboTimeout = setTimeout(resetCombo, 2000);
}

function resetCombo() {
  combo = 0;
  comboCounter.style.display = 'none';
}

function showComboPopup() {
  comboCount.textContent = `${combo}x`;
  comboPopup.style.display = 'block';
  
  if (isSoundOn && combo >= 5) {
    comboSound.currentTime = 0;
    comboSound.play();
  }
  
  setTimeout(() => {
    comboPopup.style.display = 'none';
  }, 1000);
}

function updateTimer() {
  if (isPaused) return;
  
  gameTime--;
  timerDisplay.textContent = `Time: ${gameTime}s`;
  
  if (gameTime <= 0) {
    endGame();
  }
}

function checkLevelUp() {
  if (score % 20 === 0) {
    level++;
    if (currentTheme === 'difficult') {
      gameSpeed = Math.max(1, gameSpeed - 1);
      if (level >= 3) balloonsPerInterval = 3;
    } else {
      gameSpeed = Math.max(2, gameSpeed - 0.5);
    }
    
    showLevelUpPopup(level);
    
    // Achievement for level 5
    if (level === 5 && !achievements.level5) {
      achievements.level5 = true;
      unlockAchievement('level5');
    }
  }
}

function showLevelUpPopup(level) {
  currentLevelSpan.textContent = level;
  levelUpPopup.style.display = 'block';
  setTimeout(() => {
    levelUpPopup.style.display = 'none';
  }, 2000);
}

function createExplosion(left, top) {
  const explosion = document.createElement('div');
  explosion.classList.add('explosion');
  explosion.style.left = `${left}px`;
  explosion.style.top = `${top}px`;
  gameContainer.appendChild(explosion);
  setTimeout(() => explosion.remove(), 500);
}

function toggleSound() {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    backgroundMusic.play();
    soundToggle.textContent = 'Sound: On';
  } else {
    backgroundMusic.pause();
    soundToggle.textContent = 'Sound: Off';
  }
}

function togglePause() {
  if (!isPaused) {
    isPaused = true;
    pauseButton.textContent = "▶ Resume";
    pausePopup.style.display = 'block';
    clearInterval(balloonInterval);
    if (gameMode === 'timed') clearInterval(timerInterval);
    backgroundMusic.pause();
    pauseAllAnimations();
  }
}

function resumeGame() {
  if (isPaused) {
    isPaused = false;
    pauseButton.textContent = "⏸ Pause";
    pausePopup.style.display = 'none';
    balloonInterval = setInterval(createBalloon, 1500);
    if (gameMode === 'timed') timerInterval = setInterval(updateTimer, 1000);
    if (isSoundOn) backgroundMusic.play();
    resumeAllAnimations();
  }
}

function pauseAllAnimations() {
  animationsPaused = true;
  document.querySelectorAll('.balloon, .animal, .fish').forEach(el => {
    el.style.animationPlayState = 'paused';
  });
}

function resumeAllAnimations() {
  animationsPaused = false;
  document.querySelectorAll('.balloon, .animal, .fish').forEach(el => {
    if (el.style.display !== 'none') {
      el.style.animationPlayState = 'running';
    }
  });
}

function endGame() {
  clearInterval(balloonInterval);
  if (gameMode === 'timed') clearInterval(timerInterval);
  isPaused = true;
  finalScoreSpan.textContent = score;
  
  // Check for perfect game achievement
  if (wrongPops === 0 && score > 0 && !achievements.perfectGame) {
    achievements.perfectGame = true;
    unlockAchievement('perfectGame');
  }
  
  if (score > 0) {
    updateLeaderboard();
  }
  
  gameOverDiv.style.display = 'block';
  pauseButton.style.display = 'none';
}

function restartGame() {
  gameModeSelected = false;
  // Clear all intervals
  clearInterval(balloonInterval);
  if (gameMode === 'timed') clearInterval(timerInterval);
  
  // Reset game state
  isPaused = false;
  score = 0;
  wrongPops = 0;
  level = 1;
  combo = 0;
  gameSpeed = currentTheme === 'difficult' ? 4 : 5;
  balloonsPerInterval = 1;
  
  // Clear all balloons and explosions
  document.querySelectorAll('.balloon, .explosion').forEach(el => el.remove());
  
  // Reset displays
  scoreBoard.textContent = `Score: ${score}`;
  wrongPopsBoard.textContent = `Wrong Pops: ${wrongPops}/5`;
  comboCounter.style.display = 'none';
  gameOverDiv.style.display = 'none';
  
  // Return to theme selection screen
  gameScreen.style.display = 'none';
  themeScreen.style.display = 'block';
  pauseButton.style.display = 'none';
  
  // Force reflow to reset animations (critical fix)
  void gameContainer.offsetHeight;
}
function updateLeaderboard() {
  leaderboardData = leaderboardData.filter(entry => entry && entry.name && entry.score !== undefined);
  
  if (playerName && score > 0) {
    leaderboardData.push({ name: playerName, score: score });
  }

  leaderboardData.sort((a, b) => b.score - a.score);
  leaderboardData = leaderboardData.slice(0, 10);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));

  leaderboardList.innerHTML = leaderboardData
    .map((entry, index) => `<li>${index + 1}. ${entry.name}: ${entry.score}</li>`)
    .join('');
}

function initializeLeaderboard() {
  leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboardData = leaderboardData.filter(entry => entry && entry.name && !isNaN(entry.score));
  updateLeaderboard();
}

function loadAchievements() {
  const savedAchievements = JSON.parse(localStorage.getItem('achievements'));
  if (savedAchievements) {
    achievements = { ...achievements, ...savedAchievements };
  }
  updateAchievementsDisplay();
}

function unlockAchievement(achievementId) {
  achievements[achievementId] = true;
  localStorage.setItem('achievements', JSON.stringify(achievements));
  showAchievementNotification(achievementId);
  updateAchievementsDisplay();
}

function showAchievementNotification(achievementId) {
  const achievementNames = {
    firstGame: 'First Game!',
    pop100: '100 Points!',
    perfectGame: 'Perfect Game!',
    level5: 'Level 5!',
    combo10: '10x Combo!'
  };
  
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.innerHTML = `
    <div class="achievement-icon">🏆</div>
    <div class="achievement-text">
      <strong>Achievement Unlocked!</strong>
      <p>${achievementNames[achievementId]}</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

function updateAchievementsDisplay() {
  achievementsList.innerHTML = '';
  
  const achievementData = [
    { id: 'firstGame', title: 'First Game', desc: 'Play your first game' },
    { id: 'pop100', title: '100 Points', desc: 'Score 100 points in one game' },
    { id: 'perfectGame', title: 'Perfect Game', desc: 'Complete a game with no wrong pops' },
    { id: 'level5', title: 'Level 5', desc: 'Reach level 5 in a game' },
    { id: 'combo10', title: '10x Combo', desc: 'Get a 10x combo' }
  ];
  
  achievementData.forEach(ach => {
    const achievementElement = document.createElement('div');
    achievementElement.className = `achievement ${achievements[ach.id] ? 'unlocked' : 'locked'}`;
    achievementElement.innerHTML = `
      <div class="achievement-icon">${achievements[ach.id] ? '🏆' : '🔒'}</div>
      <div class="achievement-details">
        <h3>${ach.title}</h3>
        <p>${ach.desc}</p>
      </div>
    `;
    achievementsList.appendChild(achievementElement);
  });
}

function showLeaderboard() {
  leaderboardPopup.style.display = 'block';
}

function hideLeaderboard() {
  leaderboardPopup.style.display = 'none';
}

function showHowToPlay() {
  howToPlayPopup.style.display = 'block';
}

function hideHowToPlay() {
  howToPlayPopup.style.display = 'none';
}

function showAchievements() {
  achievementsPopup.style.display = 'block';
}

function hideAchievements() {
  achievementsPopup.style.display = 'none';
}

function showAbout() {
  aboutPopup.style.display = 'block';
}

function hideAbout() {
  aboutPopup.style.display = 'none';
}

function showDisclaimer() {
  disclaimerPopup.style.display = 'block';
}

function hideDisclaimer() {
  disclaimerPopup.style.display = 'none';
}

function handleKeyDown(e) {
  if (gameScreen.style.display !== 'block') return;
  if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
    if (isPaused) resumeGame();
    else togglePause();
  }
}

function handleTouchStart(e) {
  // Prevent default to avoid scrolling
  e.preventDefault();
}

function handleTouchEnd(e) {
  // Handle touch end if needed
}

// Helper functions
function getRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return letters[Math.floor(Math.random() * letters.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function getRandomShape() {
  const shapes = ['▲', '●', '■', '★', '🍎', '🍌','😊','😁','🌞','🍍','🍧'];
  return shapes[Math.floor(Math.random() * shapes.length)];
}

function getRandomContent() {
  const options = [getRandomLetter(), getRandomNumber(), getRandomShape()];
  return options[Math.floor(Math.random() * options.length)];
}

function showWelcomeBackground() {
  // Implement if needed
}

function showThemeBackground() {
  // Implement if needed
}

// Initialize the game
window.onload = function() {
  setupMobileControls(); // Add this line
  initGame(); // Your existing initialization
};
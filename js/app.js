// App Configuration
const CONFIG = {
    API_URL: 'http://localhost:3000/api',
    GAME_DURATION: 300, // 5 minutes per game
    DIFFICULTY_LEVELS: ['easy', 'medium', 'hard'],
    REWARDS: {
        focus: 3,
        memory: 2,
        reaction: 2,
        flexibility: 4
    }
};

// User State Management
class UserState {
    constructor() {
        this.user = null;
        this.progress = {
            dailyProgress: 0,
            stars: 0,
            completedGames: []
        };
        this.loadProgress();
    }

    loadProgress() {
        try {
            const savedProgress = localStorage.getItem('userProgress');
            if (savedProgress) {
                this.progress = JSON.parse(savedProgress);
            }
        } catch (error) {
            console.error('Error loading progress:', error);
            // Reset progress if loading fails
            this.progress = {
                dailyProgress: 0,
                stars: 0,
                completedGames: []
            };
        }
    }

    async login(username, password) {
        try {
            const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.user || !data.progress) {
                throw new Error('Invalid response data');
            }

            this.user = data.user;
            this.progress = data.progress;
            this.saveProgress();
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            // 如果 API 不可用，使用本地存儲
            this.user = { username };
            this.loadProgress();
            return false;
        }
    }

    updateProgress(gameType, score) {
        try {
            if (!CONFIG.REWARDS[gameType]) {
                throw new Error(`Invalid game type: ${gameType}`);
            }

            this.progress.dailyProgress = Math.min(100, this.progress.dailyProgress + 20); // 20% per game
            this.progress.stars += CONFIG.REWARDS[gameType];
            this.progress.completedGames.push({
                type: gameType,
                score,
                timestamp: new Date().toISOString()
            });
            this.saveProgress();
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    }

    saveProgress() {
        try {
            localStorage.setItem('userProgress', JSON.stringify(this.progress));
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
}

// Game Manager
class GameManager {
    constructor() {
        this.game = null;
        this.userState = new UserState();
    }

    initGame(gameType) {
        try {
            switch(gameType) {
                case 'focus':
                    this.initFocusGame();
                    break;
                case 'memory':
                    this.initMemoryGame();
                    break;
                case 'reaction':
                    this.initReactionGame();
                    break;
                case 'flexibility':
                    this.initFlexibilityGame();
                    break;
                default:
                    throw new Error(`Invalid game type: ${gameType}`);
            }
        } catch (error) {
            console.error('Error initializing game:', error);
            // 顯示錯誤訊息給用戶
            alert('遊戲初始化失敗，請稍後再試');
        }
    }

    initFocusGame() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: FocusGameScene,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };
        this.game = new Phaser.Game(config);
    }

    initMemoryGame() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: MemoryGameScene,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };
        this.game = new Phaser.Game(config);
    }

    initReactionGame() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: ReactionGameScene,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };
        this.game = new Phaser.Game(config);
    }

    initFlexibilityGame() {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: FlexibilityGameScene,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            }
        };
        this.game = new Phaser.Game(config);
    }
}

// Initialize app
const app = {
    userState: new UserState(),
    gameManager: new GameManager(),
    
    init() {
        this.setupEventListeners();
        this.checkAuth();
    },

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const gameType = e.currentTarget.getAttribute('data-game-type');
                this.startGame(gameType);
            });
        });

        // Progress tracking
        this.setupProgressTracking();
    },

    async checkAuth() {
        const savedProgress = localStorage.getItem('userProgress');
        if (savedProgress) {
            this.userState.progress = JSON.parse(savedProgress);
        }
    },

    startGame(gameType) {
        this.gameManager.initGame(gameType);
    },

    setupProgressTracking() {
        // Update progress bar
        const updateProgressBar = () => {
            const progress = this.userState.progress.dailyProgress;
            document.querySelector('.progress-fill').style.width = `${progress}%`;
            document.querySelector('.progress-fill').textContent = `${progress}%`;
        };

        // Update stars display
        const updateStars = () => {
            const stars = this.userState.progress.stars;
            document.querySelector('.stars-count').textContent = stars;
        };

        // Initial updates
        updateProgressBar();
        updateStars();
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
}); 
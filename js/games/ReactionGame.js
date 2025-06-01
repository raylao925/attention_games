class ReactionGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ReactionGameScene' });
        this.score = 0;
        this.timeRemaining = 300; // 5 minutes
        this.isTargetActive = false;
        this.target = null;
        this.scoreText = null;
        this.timeText = null;
        this.gameOver = false;
        this.isPaused = false;
        this.isMuted = false;
    }

    preload() {
        // Load game assets with error handling
        try {
            // 主要資源
            this.load.image('target', 'assets/images/target.png');
            this.load.image('background', 'assets/images/background.png');
            this.load.audio('success', 'assets/sounds/success.mp3');
            this.load.audio('fail', 'assets/sounds/fail.mp3');

            // 備用資源
            this.load.image('target_fallback', 'https://cdn.pixabay.com/photo/2016/03/31/19/13/bullseye-1294931_1280.png');
            this.load.image('background_fallback', 'https://cdn.pixabay.com/photo/2016/03/31/19/13/background-1294934_1280.png');
            this.load.audio('success_fallback', 'https://cdn.freesound.org/previews/109/109662_1311046-lq.mp3');
            this.load.audio('fail_fallback', 'https://cdn.freesound.org/previews/411/411460_5121236-lq.mp3');
        } catch (error) {
            console.error('Error loading game assets:', error);
        }

        // 監聽加載錯誤
        this.load.on('loaderror', (file) => {
            console.error('Error loading file:', file.src);
            // 使用備用資源
            if (file.key === 'target') {
                this.load.image('target', 'target_fallback');
            } else if (file.key === 'background') {
                this.load.image('background', 'background_fallback');
            } else if (file.key === 'success') {
                this.load.audio('success', 'success_fallback');
            } else if (file.key === 'fail') {
                this.load.audio('fail', 'fail_fallback');
            }
        });
    }

    create() {
        try {
            // 添加背景
            this.add.image(400, 300, 'background')
                .setDisplaySize(800, 600);

            // 創建目標
            this.createTarget();

            // 添加分數文本
            this.scoreText = this.add.text(16, 16, 'Score: 0', {
                fontSize: '32px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 4
            }).setScrollFactor(0);

            // 添加時間文本
            this.timeText = this.add.text(16, 56, 'Time: 5:00', {
                fontSize: '32px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 4
            }).setScrollFactor(0);

            // 添加遊戲說明
            this.add.text(400, 300, '當目標變綠時點擊！', {
                fontSize: '24px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 4
            }).setOrigin(0.5).setScrollFactor(0);

            // 添加鍵盤控制說明
            this.add.text(400, 340, '使用空白鍵點擊目標', {
                fontSize: '20px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 3
            }).setOrigin(0.5).setScrollFactor(0);

            // 開始遊戲
            this.spawnTarget();

            // 設置計時器
            this.time.addEvent({
                delay: 1000,
                callback: this.updateTimer,
                callbackScope: this,
                loop: true
            });

            // 設置鍵盤控制
            this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.spaceKey.on('down', () => {
                if (this.target && this.target.visible) {
                    this.targetClicked();
                }
            });

            // 設置暫停功能
            this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
            this.pauseKey.on('down', () => {
                this.togglePause();
            });

            // 設置音效控制
            this.muteKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
            this.muteKey.on('down', () => {
                this.toggleMute();
            });

            // 設置全螢幕控制
            this.fullscreenKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            this.fullscreenKey.on('down', () => {
                this.toggleFullscreen();
            });

            // 設置遊戲控制按鈕事件
            this.setupControlButtons();
        } catch (error) {
            console.error('Error in create method:', error);
            this.scene.restart();
        }
    }

    setupControlButtons() {
        // 暫停按鈕
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });

        // 音效按鈕
        document.getElementById('soundBtn').addEventListener('click', () => {
            this.toggleMute();
        });

        // 全螢幕按鈕
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }

    togglePause() {
        if (this.gameOver) return;

        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.scene.pause();
            document.getElementById('pauseBtn').setAttribute('aria-label', '繼續遊戲');
            document.getElementById('pauseBtn').querySelector('i').className = 'fas fa-play';
        } else {
            this.scene.resume();
            document.getElementById('pauseBtn').setAttribute('aria-label', '暫停遊戲');
            document.getElementById('pauseBtn').querySelector('i').className = 'fas fa-pause';
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.sound.mute = this.isMuted;
        document.getElementById('soundBtn').setAttribute('aria-label', this.isMuted ? '開啟音效' : '關閉音效');
        document.getElementById('soundBtn').querySelector('i').className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }

    toggleFullscreen() {
        const gameContainer = document.getElementById('game-container');
        if (!document.fullscreenElement) {
            gameContainer.requestFullscreen();
            document.getElementById('fullscreenBtn').setAttribute('aria-label', '退出全螢幕');
            document.getElementById('fullscreenBtn').querySelector('i').className = 'fas fa-compress';
        } else {
            document.exitFullscreen();
            document.getElementById('fullscreenBtn').setAttribute('aria-label', '切換全螢幕');
            document.getElementById('fullscreenBtn').querySelector('i').className = 'fas fa-expand';
        }
    }

    update() {
        if (this.gameOver || this.isPaused) return;

        // 更新目標位置
        if (this.target && this.target.visible) {
            // 添加一些隨機移動
            this.target.x += Phaser.Math.Between(-2, 2);
            this.target.y += Phaser.Math.Between(-2, 2);

            // 確保目標不會移出螢幕
            this.target.x = Phaser.Math.Clamp(this.target.x, 50, 750);
            this.target.y = Phaser.Math.Clamp(this.target.y, 50, 550);
        }
    }

    createTarget() {
        try {
            this.target = this.add.image(400, 300, 'target')
                .setInteractive()
                .setScale(2)
                .setTint(0xff0000)
                .setVisible(false);

            this.target.on('pointerdown', () => this.targetClicked());
        } catch (error) {
            console.error('Error creating target:', error);
            // 使用備用目標
            this.target = this.add.image(400, 300, 'target_fallback')
                .setInteractive()
                .setScale(2)
                .setTint(0xff0000)
                .setVisible(false);
        }
    }

    spawnTarget() {
        if (this.gameOver || this.isPaused) return;

        try {
            // 隨機位置
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 500);

            this.target.setPosition(x, y);
            this.target.setVisible(true);
            this.isTargetActive = false;

            // 隨機延遲後激活目標
            const delay = Phaser.Math.Between(1000, 3000);
            this.time.delayedCall(delay, () => {
                if (!this.gameOver && !this.isPaused) {
                    this.isTargetActive = true;
                    this.target.setTint(0x00ff00); // 變綠表示可以點擊
                    // 如果玩家沒有及時點擊，目標會消失
                    this.time.delayedCall(1000, this.targetMissed, [], this);
                }
            });
        } catch (error) {
            console.error('Error spawning target:', error);
            this.scene.restart();
        }
    }

    targetClicked() {
        if (!this.target.visible || this.gameOver || this.isPaused) return;

        try {
            if (this.isTargetActive) {
                // 成功
                this.sound.play('success');
                this.score += 10;
                this.scoreText.setText('Score: ' + this.score);
                this.addParticleEffect(this.target.x, this.target.y, 0x00ff00);
            } else {
                // 太早點擊
                this.sound.play('fail');
                this.score = Math.max(0, this.score - 5);
                this.scoreText.setText('Score: ' + this.score);
                this.addParticleEffect(this.target.x, this.target.y, 0xff0000);
            }

            this.target.setVisible(false);
            this.isTargetActive = false;

            // 安排下一個目標
            this.time.delayedCall(1000, this.spawnTarget, [], this);
        } catch (error) {
            console.error('Error in targetClicked:', error);
        }
    }

    targetMissed() {
        if (!this.isTargetActive || this.gameOver || this.isPaused) return;

        try {
            this.sound.play('fail');
            this.score = Math.max(0, this.score - 5);
            this.scoreText.setText('Score: ' + this.score);
            this.addParticleEffect(this.target.x, this.target.y, 0xff0000);

            this.target.setVisible(false);
            this.isTargetActive = false;

            // 安排下一個目標
            this.time.delayedCall(1000, this.spawnTarget, [], this);
        } catch (error) {
            console.error('Error in targetMissed:', error);
        }
    }

    updateTimer() {
        if (this.gameOver || this.isPaused) return;

        try {
            this.timeRemaining--;
            const minutes = Math.floor(this.timeRemaining / 60);
            const seconds = this.timeRemaining % 60;
            this.timeText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);

            if (this.timeRemaining <= 0) {
                this.gameOver = true;
                this.showGameOver();
            }
        } catch (error) {
            console.error('Error updating timer:', error);
        }
    }

    addParticleEffect(x, y, color) {
        try {
            const particles = this.add.particles(x, y, 'target', {
                speed: 100,
                scale: { start: 0.5, end: 0 },
                blendMode: 'ADD',
                lifespan: 500,
                quantity: 10,
                tint: color
            });

            this.time.delayedCall(500, () => {
                particles.destroy();
            });
        } catch (error) {
            console.error('Error adding particle effect:', error);
        }
    }

    showGameOver() {
        try {
            // 保存分數
            if (window.gameManager && window.gameManager.userState) {
                window.gameManager.userState.updateProgress('reaction', this.score);
            }

            // 顯示遊戲結束畫面
            const gameOverText = this.add.text(400, 300, '遊戲結束!\n得分: ' + this.score, {
                fontSize: '48px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 4,
                align: 'center'
            }).setOrigin(0.5);

            // 添加重新開始按鈕
            const restartButton = this.add.text(400, 400, '重新開始', {
                fontSize: '32px',
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 4,
                backgroundColor: '#4F46E5',
                padding: { x: 20, y: 10 }
            })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.restart();
            });

            // 添加鍵盤控制
            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.restart();
            });

            // 更新 ARIA 標籤
            document.getElementById('game-container').setAttribute('aria-label', `遊戲結束，得分：${this.score}，按空白鍵重新開始`);
        } catch (error) {
            console.error('Error showing game over:', error);
            this.scene.restart();
        }
    }
} 
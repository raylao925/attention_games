class FocusGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FocusGameScene' });
        this.targets = [];
        this.score = 0;
        this.timeRemaining = 300; // 5 minutes
    }

    preload() {
        // Load game assets
        this.load.image('target', 'assets/images/target.png');
        this.load.image('background', 'assets/images/background.png');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Add timer text
        this.timerText = this.add.text(16, 56, 'Time: 5:00', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Start spawning targets
        this.spawnTarget();

        // Set up timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // Update target positions
        this.targets.forEach(target => {
            target.x += target.velocityX;
            target.y += target.velocityY;

            // Bounce off walls
            if (target.x <= 0 || target.x >= 800) {
                target.velocityX *= -1;
            }
            if (target.y <= 0 || target.y >= 600) {
                target.velocityY *= -1;
            }
        });
    }

    spawnTarget() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        const target = this.add.image(x, y, 'target');
        
        // Set random velocity
        target.velocityX = Phaser.Math.Between(-2, 2);
        target.velocityY = Phaser.Math.Between(-2, 2);
        
        // Make target interactive
        target.setInteractive();
        target.on('pointerdown', () => this.hitTarget(target));
        
        this.targets.push(target);

        // Schedule next spawn
        this.time.delayedCall(2000, this.spawnTarget, [], this);
    }

    hitTarget(target) {
        // Remove target
        target.destroy();
        this.targets = this.targets.filter(t => t !== target);
        
        // Update score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        
        // Add particle effect
        this.addParticleEffect(target.x, target.y);
    }

    addParticleEffect(x, y) {
        const particles = this.add.particles('target');
        const emitter = particles.createEmitter({
            x: x,
            y: y,
            speed: { min: 100, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            lifespan: 500,
            quantity: 10
        });
        
        // Auto-destroy particles after effect
        this.time.delayedCall(500, () => {
            particles.destroy();
        });
    }

    updateTimer() {
        this.timeRemaining--;
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.timerText.setText(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);

        if (this.timeRemaining <= 0) {
            this.endGame();
        }
    }

    endGame() {
        // Stop all game activities
        this.scene.pause();
        
        // Show end game screen
        const endGameText = this.add.text(400, 300, 'Game Over!', {
            fontSize: '64px',
            fill: '#fff'
        }).setOrigin(0.5);
        
        const finalScoreText = this.add.text(400, 380, `Final Score: ${this.score}`, {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);
        
        // Add restart button
        const restartButton = this.add.text(400, 450, 'Play Again', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#4F46E5',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.restart();
        });

        // Update user progress
        app.userState.updateProgress('focus', this.score);
    }
} 
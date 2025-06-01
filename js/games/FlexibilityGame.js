class FlexibilityGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FlexibilityGameScene' });
        this.score = 0;
        this.timeRemaining = 300; // 5 minutes
        this.currentRule = null;
        this.currentShape = null;
        this.rules = [
            { text: 'Click Red Shapes', color: 0xff0000 },
            { text: 'Click Blue Shapes', color: 0x0000ff },
            { text: 'Click Circles', shape: 'circle' },
            { text: 'Click Squares', shape: 'square' }
        ];
    }

    preload() {
        // Load game assets
        this.load.image('circle', 'assets/images/circle.png');
        this.load.image('square', 'assets/images/square.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.audio('success', 'assets/sounds/success.mp3');
        this.load.audio('fail', 'assets/sounds/fail.mp3');
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

        // Add rule text
        this.ruleText = this.add.text(400, 100, '', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Set up timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Start game
        this.startRound();
    }

    startRound() {
        // Clear existing shapes
        if (this.currentShape) {
            this.currentShape.destroy();
        }

        // Select new rule
        this.currentRule = this.rules[Phaser.Math.Between(0, this.rules.length - 1)];
        this.ruleText.setText(this.currentRule.text);

        // Create new shape
        this.createShape();
    }

    createShape() {
        const shapeType = Phaser.Math.Between(0, 1) === 0 ? 'circle' : 'square';
        const color = Phaser.Math.Between(0, 1) === 0 ? 0xff0000 : 0x0000ff;
        
        this.currentShape = this.add.image(
            Phaser.Math.Between(100, 700),
            Phaser.Math.Between(200, 500),
            shapeType
        )
        .setInteractive()
        .setScale(2)
        .setTint(color);

        this.currentShape.shapeType = shapeType;
        this.currentShape.color = color;

        this.currentShape.on('pointerdown', () => this.shapeClicked());
    }

    shapeClicked() {
        let isCorrect = false;

        if (this.currentRule.color) {
            // Color-based rule
            isCorrect = this.currentShape.color === this.currentRule.color;
        } else {
            // Shape-based rule
            isCorrect = this.currentShape.shapeType === this.currentRule.shape;
        }

        if (isCorrect) {
            // Success
            this.sound.play('success');
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            this.addParticleEffect(this.currentShape.x, this.currentShape.y, 0x00ff00);
        } else {
            // Wrong
            this.sound.play('fail');
            this.score = Math.max(0, this.score - 5);
            this.scoreText.setText('Score: ' + this.score);
            this.addParticleEffect(this.currentShape.x, this.currentShape.y, 0xff0000);
        }

        // Schedule next round
        this.time.delayedCall(1000, this.startRound, [], this);
    }

    addParticleEffect(x, y, color) {
        const particles = this.add.particles('circle');
        const emitter = particles.createEmitter({
            x: x,
            y: y,
            speed: { min: 100, max: 200 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0 },
            tint: color,
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
        app.userState.updateProgress('flexibility', this.score);
    }
} 
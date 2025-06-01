class MemoryGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MemoryGameScene' });
        this.sequence = [];
        this.playerSequence = [];
        this.level = 1;
        this.score = 0;
        this.isShowingSequence = false;
    }

    preload() {
        // Load game assets
        this.load.image('tile', 'assets/tile.png');
        this.load.image('background', 'assets/background.png');
        this.load.audio('beep', 'assets/beep.mp3');
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Add level text
        this.levelText = this.add.text(16, 56, 'Level: 1', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Create game grid
        this.createGrid();

        // Start first level
        this.startLevel();
    }

    createGrid() {
        this.tiles = [];
        const gridSize = 3;
        const tileSize = 100;
        const spacing = 20;
        const startX = (800 - (gridSize * (tileSize + spacing))) / 2;
        const startY = (600 - (gridSize * (tileSize + spacing))) / 2;

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = startX + col * (tileSize + spacing);
                const y = startY + row * (tileSize + spacing);
                
                const tile = this.add.image(x, y, 'tile')
                    .setInteractive()
                    .setScale(tileSize / 100);
                
                tile.row = row;
                tile.col = col;
                tile.setTint(0x808080);
                
                tile.on('pointerdown', () => this.tileClicked(tile));
                
                this.tiles.push(tile);
            }
        }
    }

    startLevel() {
        this.sequence = [];
        this.playerSequence = [];
        this.isShowingSequence = true;

        // Generate sequence
        for (let i = 0; i < this.level + 2; i++) {
            const randomTile = this.tiles[Phaser.Math.Between(0, this.tiles.length - 1)];
            this.sequence.push(randomTile);
        }

        // Show sequence
        this.showSequence();
    }

    showSequence() {
        let i = 0;
        const showNextTile = () => {
            if (i < this.sequence.length) {
                const tile = this.sequence[i];
                tile.setTint(0x00ff00);
                this.sound.play('beep');

                this.time.delayedCall(500, () => {
                    tile.setTint(0x808080);
                    i++;
                    this.time.delayedCall(300, showNextTile);
                });
            } else {
                this.isShowingSequence = false;
            }
        };

        showNextTile();
    }

    tileClicked(tile) {
        if (this.isShowingSequence) return;

        tile.setTint(0x00ff00);
        this.sound.play('beep');

        this.time.delayedCall(200, () => {
            tile.setTint(0x808080);
        });

        this.playerSequence.push(tile);

        // Check if sequence is correct
        const currentIndex = this.playerSequence.length - 1;
        if (this.playerSequence[currentIndex] !== this.sequence[currentIndex]) {
            this.gameOver();
            return;
        }

        // Check if level is complete
        if (this.playerSequence.length === this.sequence.length) {
            this.levelComplete();
        }
    }

    levelComplete() {
        this.score += this.level * 10;
        this.scoreText.setText('Score: ' + this.score);
        
        this.level++;
        this.levelText.setText('Level: ' + this.level);

        // Show level complete message
        const levelCompleteText = this.add.text(400, 300, 'Level Complete!', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);

        this.time.delayedCall(1500, () => {
            levelCompleteText.destroy();
            this.startLevel();
        });
    }

    gameOver() {
        // Show game over screen
        const gameOverText = this.add.text(400, 300, 'Game Over!', {
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
        app.userState.updateProgress('memory', this.score);
    }
} 
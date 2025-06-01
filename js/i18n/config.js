// i18n Configuration
const i18n = {
    resources: {
        'en': {
            translation: {
                appName: 'Little Star Focus',
                back: 'Back',
                focusGame: 'Focus Target',
                memoryGame: 'Memory Master',
                reactionGame: 'Quick Reaction',
                flexibilityGame: 'Switch Challenge',
                gameOver: 'Game Over!',
                score: 'Score',
                restart: 'Play Again',
                time: 'Time',
                clickTarget: 'Click the target when it turns green!'
            }
        },
        'zh-TW': {
            translation: {
                appName: '小星專注力',
                back: '返回',
                focusGame: '專注目標',
                memoryGame: '記憶大師',
                reactionGame: '快速反應',
                flexibilityGame: '轉換挑戰',
                gameOver: '遊戲結束！',
                score: '得分',
                restart: '重新開始',
                time: '時間',
                clickTarget: '當目標變綠時點擊！'
            }
        }
    },
    lng: 'zh-TW',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
};

// Initialize i18next
i18next.init(i18n);

// Export for use in other files
window.i18next = i18next; 
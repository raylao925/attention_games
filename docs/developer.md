# 開發者文檔

本文檔提供了小星專注力應用程式的開發指南和技術細節。

## 專案結構

```
attention_games/
├── assets/              # 靜態資源
│   ├── images/         # 圖片資源
│   ├── sounds/         # 音效資源
│   └── fonts/          # 字體資源
├── js/                 # JavaScript 源代碼
│   ├── games/         # 遊戲邏輯
│   ├── i18n/          # 國際化配置
│   └── utils/         # 工具函數
├── css/               # 樣式文件
├── docs/              # 文檔
└── tests/             # 測試文件
```

## 技術棧

- 前端框架：原生 JavaScript
- 遊戲引擎：Phaser 3
- 樣式：CSS3 + SCSS
- 國際化：i18next
- 測試：Jest + Puppeteer

## 開發環境設置

1. 克隆專案：
```bash
git clone https://github.com/your-username/attention_games.git
cd attention_games
```

2. 安裝依賴：
```bash
npm install
```

3. 啟動開發服務器：
```bash
npm run dev
```

4. 運行測試：
```bash
npm test
```

## 代碼規範

### JavaScript
- 使用 ES6+ 語法
- 遵循 Airbnb JavaScript 風格指南
- 使用 ESLint 進行代碼檢查
- 使用 Prettier 進行代碼格式化

### CSS
- 使用 BEM 命名規範
- 使用 SCSS 預處理器
- 遵循 SMACSS 架構
- 使用 Stylelint 進行樣式檢查

### HTML
- 使用語義化標籤
- 確保可訪問性
- 遵循 HTML5 規範

## 遊戲開發指南

### 創建新遊戲

1. 在 `js/games/` 目錄下創建新的遊戲類：
```javascript
class NewGame extends Phaser.Scene {
    constructor() {
        super({ key: 'NewGame' });
    }

    preload() {
        // 加載資源
    }

    create() {
        // 初始化遊戲
    }

    update() {
        // 遊戲邏輯更新
    }
}
```

2. 在 `index.html` 中註冊遊戲：
```html
<script src="js/games/NewGame.js"></script>
```

3. 在 `app.js` 中初始化遊戲：
```javascript
const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [NewGame]
});
```

### 遊戲資源管理

1. 圖片資源：
- 放置在 `assets/images/` 目錄
- 支援 PNG、JPG、WebP 格式
- 建議使用精靈圖（Sprite Sheet）

2. 音效資源：
- 放置在 `assets/sounds/` 目錄
- 支援 MP3、OGG 格式
- 提供備用格式

3. 字體資源：
- 放置在 `assets/fonts/` 目錄
- 支援 WOFF2、WOFF 格式
- 提供備用字體

## 國際化

### 添加新語言

1. 在 `js/i18n/` 目錄下創建新的語言文件：
```javascript
export default {
    common: {
        // 通用翻譯
    },
    games: {
        // 遊戲相關翻譯
    }
};
```

2. 在 `config.js` 中註冊新語言：
```javascript
import newLanguage from './new-language.js';

i18next.init({
    resources: {
        'new-language': newLanguage
    }
});
```

### 使用翻譯

```javascript
import i18next from 'i18next';

const text = i18next.t('key.path');
```

## 測試

### 單元測試

```javascript
describe('Game Logic', () => {
    test('should calculate score correctly', () => {
        // 測試代碼
    });
});
```

### 集成測試

```javascript
describe('Game Integration', () => {
    test('should handle user interaction', async () => {
        // 測試代碼
    });
});
```

### E2E 測試

```javascript
describe('Game Flow', () => {
    test('should complete game session', async () => {
        // 測試代碼
    });
});
```

## 性能優化

### 資源優化
- 使用圖片壓縮
- 實現資源預加載
- 使用資源緩存
- 實現資源懶加載

### 代碼優化
- 使用代碼分割
- 實現按需加載
- 優化渲染性能
- 減少重繪和重排

### 網絡優化
- 使用 CDN
- 實現資源預取
- 優化 API 請求
- 使用服務端渲染

## 部署

### 構建
```bash
npm run build
```

### 部署步驟
1. 運行測試套件
2. 構建生產版本
3. 壓縮靜態資源
4. 上傳到服務器

### 環境配置
- 開發環境：`development`
- 測試環境：`testing`
- 生產環境：`production`

## 錯誤處理

### 前端錯誤
- 使用全局錯誤處理
- 實現錯誤日誌
- 提供用戶反饋
- 實現錯誤恢復

### 後端錯誤
- 實現錯誤中間件
- 記錄錯誤日誌
- 發送錯誤通知
- 提供錯誤追蹤

## 安全措施

### 前端安全
- 實現 XSS 防護
- 使用 CSP
- 實現 CSRF 防護
- 安全存儲數據

### 後端安全
- 實現身份驗證
- 使用 HTTPS
- 實現速率限制
- 保護敏感數據

## 版本控制

### Git 工作流
- 使用 Git Flow
- 遵循提交規範
- 使用分支保護
- 實現代碼審查

### 版本號規範
- 主版本號：不兼容的 API 修改
- 次版本號：向下兼容的功能性新增
- 修訂號：向下兼容的問題修正

## 文檔維護

### 代碼文檔
- 使用 JSDoc
- 保持文檔更新
- 提供示例代碼
- 說明使用限制

### API 文檔
- 使用 OpenAPI
- 提供接口說明
- 包含請求示例
- 說明錯誤處理

## 貢獻指南

1. Fork 專案
2. 創建特性分支
3. 提交更改
4. 推送到分支
5. 創建 Pull Request

## 更新日誌

### 2024-03-21
- 添加開發者文檔
- 更新專案結構
- 添加測試指南
- 完善部署流程
- 更新安全措施

## 相關資源

- [Phaser 3 文檔](https://phaser.io/docs)
- [i18next 文檔](https://www.i18next.com/)
- [Jest 文檔](https://jestjs.io/)
- [ESLint 文檔](https://eslint.org/) 
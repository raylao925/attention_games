# 小星專注力 - ADHD兒童訓練遊戲

一個專為 ADHD 兒童設計的互動訓練遊戲平台，透過有趣的遊戲方式提升兒童的專注力、記憶力和反應能力。

## 專案結構

### 1. 資源檔案 (assets/)
#### 音效檔案
- `fail.mp3` - 失敗音效
- `success.mp3` - 成功音效
- `beep.mp3` - 提示音效

#### 圖片資源
- `background.png` - 背景圖片
- `square.png` - 方形圖示
- `circle.png` - 圓形圖示
- `target.png` - 目標圖示

### 2. JavaScript 模組 (js/)
- `app.js` - 主要應用程式邏輯

#### 遊戲模組 (js/games/)
- `FocusGame.js` - 專注力訓練遊戲
- `MemoryGame.js` - 記憶力訓練遊戲
- `ReactionGame.js` - 反應力訓練遊戲
- `FlexibilityGame.js` - 靈活性訓練遊戲

### 3. 主要檔案功能說明

#### 頁面檔案
- `index.html` - 主頁面，包含遊戲入口和用戶進度展示，整合 Tailwind CSS 與 Font Awesome，使用 Phaser.js 遊戲引擎
- `games.html` - 遊戲列表頁面，展示所有可用的訓練遊戲
- `profile.html` - 用戶檔案管理，顯示用戶進度和成就
- `parent.html` - 家長控制面板，監控和管理兒童使用情況
- `plan.html` - 訓練計畫管理，設定和追蹤訓練目標
- `achievements.html` - 成就系統頁面，展示已獲得和未獲得的成就

### 4. 核心架構

#### 前端框架與工具
- **Tailwind CSS** - 響應式設計和樣式管理
- **Font Awesome** - 圖示支援
- **Phaser.js** (版本 3.55.2) - 互動式遊戲引擎

#### 遊戲狀態管理
- 模組化遊戲邏輯設計，每個遊戲獨立狀態管理
- app.js 統一管理遊戲生命週期

#### 事件處理
- 採用事件驅動架構
- Phaser.js 事件系統處理遊戲事件
- DOM 事件處理使用者互動

### 5. 技術特點
- 響應式設計，支援行動端與桌面端
- 模組化架構，便於維護與擴充
- 資源管理集中，使用 download_assets.js 處理資源下載
- 使用者體驗優化：漸進式載入、動畫效果、清晰視覺回饋

### 6. 建議與改進方向

#### 檔案組織
- 建議將 CSS 樣式抽離獨立檔案
- 建立統一資源管理系統

#### 效能優化
- 實現資源預載入
- 優化圖片與音效資源

#### 程式碼品質
- 新增錯誤處理機制
- 實現完整日誌系統

#### 安全性
- 新增用戶認證機制
- 實現資料加密儲存

## 開發環境要求
- 現代瀏覽器（Chrome、Firefox、Safari、Edge 等）
- Node.js 環境（用於資源下載和管理）

## 貢獻指南
歡迎提交 Pull Request 或建立 Issue 來協助改進專案。

## 授權條款
本專案採用 MIT 授權條款。詳見 [LICENSE](LICENSE) 檔案。

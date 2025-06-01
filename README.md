# 小星专注力 - ADHD儿童训练游戏

一个专为ADHD儿童设计的互动训练游戏平台，通过有趣的游戏方式提升儿童的专注力、记忆力和反应能力。

## 项目结构

### 1. 资源文件 (assets/)
#### 音效文件
- `fail.mp3` - 失败音效
- `success.mp3` - 成功音效
- `beep.mp3` - 提示音效

#### 图片资源
- `background.png` - 背景图片
- `square.png` - 方形图标
- `circle.png` - 圆形图标
- `target.png` - 目标图标

### 2. JavaScript 模块 (js/)
- `app.js` - 主要应用程序逻辑

#### 游戏模块 (js/games/)
- `FocusGame.js` - 专注力训练游戏
- `MemoryGame.js` - 记忆力训练游戏
- `ReactionGame.js` - 反应力训练游戏
- `FlexibilityGame.js` - 灵活性训练游戏

### 3. 主要文件功能说明

#### 页面文件
- `index.html` - 主页面，包含游戏入口和用户进度展示，整合 Tailwind CSS 与 Font Awesome，使用 Phaser.js 游戏引擎
- `games.html` - 游戏列表页面，展示所有可用的训练游戏
- `profile.html` - 用户档案管理，显示用户进度和成就
- `parent.html` - 家长控制面板，监控和管理儿童使用情况
- `plan.html` - 训练计划管理，设定和追踪训练目标
- `achievements.html` - 成就系统页面，展示已获得和未获得的成就

### 4. 核心架构

#### 前端框架与工具
- **Tailwind CSS** - 响应式设计和样式管理
- **Font Awesome** - 图标支持
- **Phaser.js** (版本 3.55.2) - 互动式游戏引擎

#### 游戏状态管理
- 模块化游戏逻辑设计，每个游戏独立状态管理
- app.js 统一管理游戏生命周期

#### 事件处理
- 采用事件驱动架构
- Phaser.js 事件系统处理游戏事件
- DOM 事件处理用户互动

### 5. 技术特点
- 响应式设计，支持移动端与桌面端
- 模块化架构，便于维护与扩展
- 资源管理集中，使用 download_assets.js 处理资源下载
- 用户体验优化：渐进式加载、动画效果、清晰视觉反馈

### 6. 建议与改进方向

#### 文件组织
- 建议将 CSS 样式抽离独立文件
- 建立统一资源管理系统

#### 性能优化
- 实现资源预加载
- 优化图片与音效资源

#### 代码质量
- 添加错误处理机制
- 实现完整日志系统

#### 安全性
- 添加用户认证机制
- 实现数据加密存储

## 开发环境要求
- 现代浏览器（Chrome、Firefox、Safari、Edge 等）
- Node.js 环境（用于资源下载和管理）

## 贡献指南
欢迎提交 Pull Request 或创建 Issue 来帮助改进项目。

## 许可证
本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

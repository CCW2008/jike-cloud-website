# 极客云科网站 - 部署指南

## 功能特点
- 动态内容管理（服务、案例、博客）
- 后台管理系统
- 留言反馈功能
- 数据统计展示

## 本地运行

### 1. 安装 Node.js
访问 https://nodejs.org/ 下载并安装 LTS 版本

### 2. 进入项目目录
```bash
cd 极客云科网站
```

### 3. 安装依赖
```bash
npm install
```

### 4. 启动网站
```bash
npm start
```

打开浏览器访问: http://localhost:3000

后台管理: http://localhost:3000/admin/login
默认账号: admin / admin123

---

## 免费部署到 Railway（推荐新手）

### 步骤 1: 注册 Railway
1. 访问 https://railway.app/
2. 使用 GitHub 账号登录
3. 点击 "New Project" → "Deploy from GitHub"

### 步骤 2: 上传代码到 GitHub
1. 注册 GitHub: https://github.com/
2. 创建新仓库，命名为 `jike-cloud-website`
3. 将 `极客云科网站` 文件夹里的所有文件上传到仓库

### 步骤 3: 连接 Railway
1. 在 Railway 页面选择 "Deploy from GitHub repo"
2. 选择你的仓库
3. Railway 会自动检测 Node.js 并部署

### 步骤 4: 访问网站
部署完成后，Railway 会给你一个免费域名，例如: `xxx.railway.app`

---

## 免费部署到 Render

### 步骤 1: 注册 Render
1. 访问 https://render.com/
2. 使用邮箱或 GitHub 登录

### 步骤 2: 创建 Web Service
1. 点击 "New" → "Web Service"
2. 连接你的 GitHub 仓库
3. 设置:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. 选择 Free 套餐
5. 点击 "Create Web Service"

### 步骤 3: 访问网站
获得一个 `*.onrender.com` 免费域名

---

## 目录结构

```
极客云科网站/
├── server.js          # 服务器主文件
├── package.json       # 项目配置
├── data/              # 数据存储目录（自动创建）
│   └── database.json  # JSON 数据库
├── public/            # 静态资源目录
└── views/             # 页面模板
    ├── index.ejs     # 主页面
    └── admin/        # 后台管理
        ├── login.ejs
        └── dashboard.ejs
```

## 注意事项

1. 首次运行会自动创建 `data/database.json` 数据库文件
2. 部署到云端时，数据文件会存储在服务器内存中，重启后会重置
3. 如需持久化存储，建议后续升级使用 MongoDB 或 PostgreSQL

## 常见问题

**Q: 端口被占用怎么办？**
A: 修改 `server.js` 中的 `PORT` 环境变量，或运行: `PORT=8080 npm start`

**Q: 如何修改后台密码？**
A: 登录后台后，进入"账号设置"页面修改

**Q: 忘记密码怎么办？**
A: 编辑 `data/database.json`，将 `admin` 的 `password` 字段改为 `admin123`

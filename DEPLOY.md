# 极客云科网站 - 完整部署指南

## 🎯 部署目标
将极客云科网站部署到互联网，获得一个免费的公开域名，无需本地环境配置。

## 📋 准备材料
- 一个邮箱账号（用于注册 GitHub 和 Railway）
- 极客云科网站项目文件（已准备就绪）

## 🚀 部署步骤

### 第一步：注册 GitHub 账号
1. **访问 GitHub**：打开浏览器，访问 [https://github.com](https://github.com)
2. **注册账号**：
   - 点击右上角的 "Sign up"
   - 输入邮箱、密码、用户名
   - 验证邮箱地址
3. **登录账号**：使用刚注册的账号登录

### 第二步：创建 GitHub 仓库
1. **创建新仓库**：
   - 点击右上角的 "+" 图标
   - 选择 "New repository"
2. **配置仓库**：
   - **Repository name**: `jike-cloud-website`
   - **Description**: `极客云科网络科技工作室官网`
   - **Public** (选择公开)
   - ✅ 勾选 "Add a README file"
3. **完成创建**：点击 "Create repository"

### 第三步：上传项目文件

**方法 A：使用 GitHub 网页上传（推荐新手）**
1. 进入刚创建的仓库页面
2. 点击 "Add file" → "Upload files"
3. **拖拽上传**：
   - 打开 `极客云科网站` 文件夹
   - 选择**所有文件**（包括 server.js、package.json、views 文件夹等）
   - 直接拖拽到 GitHub 上传区域
4. **提交文件**：
   - 在 "Commit changes" 区域填写消息：`Initial commit`
   - 点击 "Commit changes"

**方法 B：使用 Git 命令行（适合有经验用户）**
```bash
# 进入项目目录
cd 极客云科网站

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/你的用户名/jike-cloud-website.git

# 推送
git branch -M main
git push -u origin main
```

### 第四步：注册 Railway 账号
1. **访问 Railway**：打开浏览器，访问 [https://railway.app](https://railway.app)
2. **登录**：点击 "Login" → "Login with GitHub"
3. **授权**：授权 Railway 访问你的 GitHub 账号

### 第五步：部署项目到 Railway
1. **创建新项目**：
   - 在 Railway 仪表板点击 "New Project"
   - 选择 "Deploy from GitHub repo"
2. **选择仓库**：
   - 找到并选择你的 `jike-cloud-website` 仓库
   - 点击 "Import"
3. **等待部署**：
   - Railway 会自动检测 Node.js 项目
   - 自动安装依赖并启动服务
   - 部署状态会显示 "Building" → "Deploying" → "Active"

### 第六步：获取免费域名
1. **部署完成后**：点击项目卡片
2. **查看域名**：
   - 在 "Settings" → "Domain" 部分
   - 找到生成的免费域名：`xxx.railway.app`
3. **访问网站**：
   - 点击域名链接，即可在互联网上访问你的网站

## 🌐 网站访问
- **前台**：`https://你的域名.railway.app`
- **后台管理**：`https://你的域名.railway.app/admin/login`
- **默认账号**：
  - 用户名：`admin`
  - 密码：`admin123`

## 📁 项目文件结构
```
jike-cloud-website/
├── server.js          # 服务器主文件
├── package.json       # 项目配置
├── railway.json       # Railway 部署配置
├── README.md          # 项目文档
├── data/              # 数据存储
│   └── database.json  # JSON 数据库
├── public/            # 静态资源目录
└── views/             # 页面模板
    ├── index.ejs      # 主页面
    └── admin/         # 后台管理
        ├── login.ejs
        └── dashboard.ejs
```

## ⚙️ 配置说明

### Railway 环境变量
项目已配置以下环境变量：
- `NODE_ENV`: `production`
- `PORT`: `3000`

### 数据库说明
- 使用 JSON 文件存储数据
- 首次访问会自动创建 `data/database.json`
- Railway 免费版重启后数据会重置
- 如需持久化存储，可升级使用 Railway 的 PostgreSQL 数据库

## 🚨 常见问题

### 1. 部署失败怎么办？
- 检查 GitHub 仓库是否正确上传了所有文件
- 确保 package.json 中的依赖配置正确
- 查看 Railway 部署日志，了解具体错误原因

### 2. 网站无法访问怎么办？
- 检查 Railway 部署状态是否为 "Active"
- 确认域名是否正确
- 尝试刷新浏览器缓存

### 3. 后台登录失败怎么办？
- 确认账号密码：`admin / admin123`
- 检查网络连接
- 查看 Railway 日志是否有错误

### 4. 数据丢失怎么办？
- Railway 免费版重启后数据会重置
- 建议定期备份 `data/database.json` 文件
- 考虑使用持久化数据库解决方案

## 📞 技术支持
- 访问后台管理系统修改网站内容
- 如需自定义功能，可修改 server.js 和相关文件
- 更多部署选项请参考 README.md 文件

---

## ✅ 部署完成！

恭喜！你的极客云科网站已经成功部署到互联网上。现在你可以：

1. **访问网站**：通过 Railway 提供的域名访问
2. **管理内容**：登录后台管理系统添加服务、案例和博客
3. **分享网站**：将域名分享给客户和合作伙伴

如果遇到任何问题，请参考本指南或查看 Railway 文档。
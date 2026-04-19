const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'jike-cloud-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

function readDB() {
  try {
    // 确保 data 目录存在
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Created data directory');
    }
    
    if (!fs.existsSync(DB_FILE)) {
      const initialDB = {
        admin: { username: 'admin', password: 'admin123' },
        services: [],
        cases: [],
        blogPosts: [],
        statistics: { projects: 68, clients: 42, uptime: 99.8, satisfaction: 100 },
        messages: [],
        support: {
          online: true,
          hours: '周一至周五 9:00-18:00',
          phone: '400-123-4567',
          email: 'support@jikecloud.com',
          qq: '123456789',
          wechat: 'jikecloud-service',
          faqs: [
            { id: 1, question: '如何联系客服？', answer: '您可以通过电话、邮箱、QQ或微信联系我们' },
            { id: 2, question: '服务响应时间？', answer: '工作时间内1小时内响应，紧急问题30分钟内响应' }
          ]
        }
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
      console.log('Created initial database');
      return initialDB;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  } catch (error) {
    console.error('Error reading database:', error);
    return {
      admin: { username: 'admin', password: 'admin123' },
      services: [],
      cases: [],
      blogPosts: [],
      statistics: { projects: 68, clients: 42, uptime: 99.8, satisfaction: 100 },
      messages: [],
      support: {
        online: true,
        hours: '周一至周五 9:00-18:00',
        phone: '400-123-4567',
        email: 'support@jikecloud.com',
        qq: '123456789',
        wechat: 'jikecloud-service',
        faqs: [
          { id: 1, question: '如何联系客服？', answer: '您可以通过电话、邮箱、QQ或微信联系我们' },
          { id: 2, question: '服务响应时间？', answer: '工作时间内1小时内响应，紧急问题30分钟内响应' }
        ]
      }
    };
  }
}

function writeDB(data) {
  try {
    // 确保 data 目录存在
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log('Created data directory in writeDB');
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

function isAuthenticated(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.redirect('/admin/login');
}

app.get('/', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'home',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.get('/services', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'services',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.get('/about', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'about',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.get('/cases', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'cases',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.get('/blog', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'blog',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.get('/data', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'data',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.get('/contact', (req, res) => {
  const db = readDB();
  res.render('index', { 
    page: 'contact',
    services: db.services,
    cases: db.cases,
    blogPosts: db.blogPosts,
    statistics: db.statistics,
    support: db.support
  });
});

app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const db = readDB();
    const newMessage = {
      id: Date.now(),
      name, email, phone, message,
      createdAt: new Date().toISOString(),
      status: 'unread'
    };
    db.messages.push(newMessage);
    writeDB(db);
    res.json({ success: true, message: '留言已收到，我们会尽快联系您！' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.json({ success: false, message: '提交失败，请稍后再试' });
  }
});

app.get('/admin/login', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: null });
});

app.post('/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const db = readDB();
    if (username === db.admin.username && password === db.admin.password) {
      req.session.isAdmin = true;
      res.redirect('/admin/dashboard');
    } else {
      res.render('admin/login', { error: '用户名或密码错误' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.render('admin/login', { error: '登录失败，请稍后再试' });
  }
});

app.get('/admin/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login');
});

app.get('/admin/dashboard', isAuthenticated, (req, res) => {
  try {
    const db = readDB();
    res.render('admin/dashboard', { 
      admin: db.admin,
      statistics: db.statistics,
      messages: db.messages,
      services: db.services,
      cases: db.cases,
      blogPosts: db.blogPosts,
      support: db.support
    });
  } catch (error) {
    console.error('Error loading dashboard:', error);
    res.render('admin/dashboard', { 
      admin: { username: 'admin' },
      statistics: { projects: 0, clients: 0, uptime: 0, satisfaction: 0 },
      messages: [],
      services: [],
      cases: [],
      blogPosts: [],
      support: {
        online: false,
        hours: '',
        phone: '',
        email: '',
        qq: '',
        wechat: '',
        faqs: []
      }
    });
  }
});

app.post('/admin/api/update-admin', isAuthenticated, (req, res) => {
  try {
    const { username, password } = req.body;
    const db = readDB();
    if (username) db.admin.username = username;
    if (password) db.admin.password = password;
    writeDB(db);
    res.json({ success: true, message: '更新成功' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.json({ success: false, message: '更新失败' });
  }
});

app.post('/admin/api/update-statistics', isAuthenticated, (req, res) => {
  try {
    const { projects, clients, uptime, satisfaction } = req.body;
    const db = readDB();
    db.statistics = { projects, clients, uptime, satisfaction };
    writeDB(db);
    res.json({ success: true, message: '统计数据已更新' });
  } catch (error) {
    console.error('Error updating statistics:', error);
    res.json({ success: false, message: '更新失败' });
  }
});

app.post('/admin/api/services', isAuthenticated, (req, res) => {
  try {
    const { action, id, title, icon, description } = req.body;
    const db = readDB();
    if (action === 'add') {
      db.services.push({ id: Date.now(), title, icon, description });
    } else if (action === 'edit') {
      const index = db.services.findIndex(s => s.id == id);
      if (index !== -1) db.services[index] = { ...db.services[index], title, icon, description };
    } else if (action === 'delete') {
      db.services = db.services.filter(s => s.id != id);
    }
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    console.error('Error handling services:', error);
    res.json({ success: false });
  }
});

app.post('/admin/api/cases', isAuthenticated, (req, res) => {
  try {
    const { action, id, title, description } = req.body;
    const db = readDB();
    if (action === 'add') {
      db.cases.push({ id: Date.now(), title, description, image: '' });
    } else if (action === 'edit') {
      const index = db.cases.findIndex(c => c.id == id);
      if (index !== -1) db.cases[index] = { ...db.cases[index], title, description };
    } else if (action === 'delete') {
      db.cases = db.cases.filter(c => c.id != id);
    }
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    console.error('Error handling cases:', error);
    res.json({ success: false });
  }
});

app.post('/admin/api/blog', isAuthenticated, (req, res) => {
  try {
    const { action, id, title, category, date, description, image } = req.body;
    const db = readDB();
    if (action === 'add') {
      db.blogPosts.push({ id: Date.now(), title, category, date, description, image: image || '' });
    } else if (action === 'edit') {
      const index = db.blogPosts.findIndex(b => b.id == id);
      if (index !== -1) db.blogPosts[index] = { ...db.blogPosts[index], title, category, date, description, image: image || '' };
    } else if (action === 'delete') {
      db.blogPosts = db.blogPosts.filter(b => b.id != id);
    }
    writeDB(db);
    res.json({ success: true, action });
  } catch (error) {
    console.error('Error handling blog:', error);
    res.json({ success: false });
  }
});

app.post('/admin/api/messages/read', isAuthenticated, (req, res) => {
  try {
    const { id } = req.body;
    const db = readDB();
    const msg = db.messages.find(m => m.id == id);
    if (msg) msg.status = 'read';
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.json({ success: false });
  }
});

app.post('/admin/api/messages/delete', isAuthenticated, (req, res) => {
  try {
    const { id } = req.body;
    const db = readDB();
    db.messages = db.messages.filter(m => m.id != id);
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.json({ success: false });
  }
});

app.post('/admin/api/support/update', isAuthenticated, (req, res) => {
  try {
    const { online, hours, phone, email, qq, wechat } = req.body;
    const db = readDB();
    db.support = { ...db.support, online, hours, phone, email, qq, wechat };
    writeDB(db);
    res.json({ success: true, message: '客服设置已更新' });
  } catch (error) {
    console.error('Error updating support:', error);
    res.json({ success: false, message: '更新失败' });
  }
});

app.post('/admin/api/support/faq', isAuthenticated, (req, res) => {
  try {
    const { action, id, question, answer } = req.body;
    const db = readDB();
    if (action === 'add') {
      db.support.faqs.push({ id: Date.now(), question, answer });
    } else if (action === 'edit') {
      const index = db.support.faqs.findIndex(f => f.id == id);
      if (index !== -1) db.support.faqs[index] = { ...db.support.faqs[index], question, answer };
    } else if (action === 'delete') {
      db.support.faqs = db.support.faqs.filter(f => f.id != id);
    }
    writeDB(db);
    res.json({ success: true });
  } catch (error) {
    console.error('Error handling FAQ:', error);
    res.json({ success: false });
  }
});

// 全局错误处理
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, function() {
  console.log('极客云科网站已启动: http://localhost:' + PORT);
  console.log('后台管理: http://localhost:' + PORT + '/admin/login');
  console.log('默认管理员账号: admin / admin123');
  console.log('Data directory: ' + DATA_DIR);
  console.log('Database file: ' + DB_FILE);
});

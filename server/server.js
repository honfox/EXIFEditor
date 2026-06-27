const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// 认证路由
app.use('/api', authRoutes);

// 启动服务器
app.listen(PORT, () => {
    console.log(`✅ EXIF 编辑器后端服务已启动: http://localhost:${PORT}`);
    console.log(`   健康检查: http://localhost:${PORT}/api/health`);
});

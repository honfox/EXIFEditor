const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../db');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// 注册
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // 验证用户名
    if (!username || username.length < 3 || username.length > 20) {
        return res.status(400).json({ error: '用户名需3-20个字符' });
    }
    if (!/^[a-zA-Z0-9_一-龥]+$/.test(username)) {
        return res.status(400).json({ error: '用户名只能包含字母、数字、下划线和中文' });
    }
    // 验证密码
    if (!password || password.length < 6) {
        return res.status(400).json({ error: '密码至少6位' });
    }

    // 检查用户是否已存在
    const existing = findUserByUsername.get(username);
    if (existing) {
        return res.status(409).json({ error: '用户名已被注册' });
    }

    // 创建用户
    const hash = bcrypt.hashSync(password, 10);
    const result = createUser.run(username, hash);

    // 生成 token
    const token = jwt.sign(
        { id: result.lastInsertRowid, username },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        token,
        user: { id: result.lastInsertRowid, username }
    });
});

// 登录
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: '请输入用户名和密码' });
    }

    const user = findUserByUsername.get(username);
    if (!user) {
        return res.status(401).json({ error: '用户名或密码错误' });
    }

    if (!bcrypt.compareSync(password, user.password_hash)) {
        return res.status(401).json({ error: '用户名或密码错误' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        token,
        user: { id: user.id, username: user.username }
    });
});

// 获取当前用户信息
router.get('/userinfo', authMiddleware, (req, res) => {
    const user = findUserByUsername.get(req.user.username);
    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }
    res.json({
        user: {
            id: user.id,
            username: user.username,
            created_at: user.created_at
        }
    });
});

module.exports = router;

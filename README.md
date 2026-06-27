# EXIFEditor

这是一个纯ai写的答辩图片/视频EXIF编辑器自带后端 自带注册登录 我也不知道有什么用但是写了就对了 不想启动后端直接用admin账号密码登录就行

> **Username:** `admin` | **Password:** `admin`

---

## 📸 这是什么？

一个基于 Web 的图片/视频 EXIF 元数据编辑器。可以修改照片的拍摄设备、时间、GPS 定位、拍摄参数等信息，支持批量处理，纯前端操作，不需要后端也能用。

所有图片/视频处理都在浏览器本地完成，文件不会上传到任何服务器。
<img src="https://pic1.imgdb.cn/item/6a3fbd932546dff76d1e2a8c.png" alt="704c421a-91b6-4919-8817-de4017b26808.png">
## ✨ 功能特性

### 图片 EXIF 编辑

支持修改以下 EXIF 字段：

| 分类 | 字段 |
|------|------|
| 设备信息 | 相机厂商 (Make)、相机型号 (Model)、镜头型号 (LensModel)、软件版本 (Software) |
| 拍摄参数 | 光圈 (FNumber)、快门速度 (ExposureTime)、ISO (ISOSpeedRatings)、焦距 (FocalLength)、35mm 等效焦距、曝光补偿 (ExposureBiasValue)、闪光灯 (Flash)、测光模式 (MeteringMode)、白平衡 (WhiteBalance) |
| 时间信息 | 拍摄时间 (DateTimeOriginal)、数字化时间 (DateTimeDigitized)、修改时间 (DateTime) |
| 图片尺寸 | 宽度 (PixelXDimension)、高度 (PixelYDimension) |
| GPS 定位 | 经纬度 (GPSLatitude/Longitude)、坐标参考 (GPSLatitudeRef/LongitudeRef) |

支持格式：JPG、JPEG、PNG、HEIC/HEIF（自动转换）

### 视频元数据编辑

支持 MP4/MOV 格式，修改 Apple QuickTime 元数据：

- 拍摄设备厂商 (com.apple.quicktime.make)
- 拍摄设备型号 (com.apple.quicktime.model)
- 软件版本 (com.apple.quicktime.software)
- GPS 定位 (com.apple.quicktime.location.ISO6709)
- 创建时间 (com.apple.quicktime.creationdate)

纯 JavaScript 实现的 MP4 Box 解析器，无需 FFmpeg。

### 设备预设

内置 7 大品牌、70+ 机型的一键预设：

| 品牌 | 机型范围 |
|------|----------|
| Apple | iPhone 7 ~ iPhone 17 Pro Max、iPad Pro |
| vivo | X90 Pro+ ~ X300 Pro |
| iQOO | 11 ~ 15 |
| OPPO | Find X6 ~ Find X8 Ultra |
| OnePlus | 9 Pro ~ 14 |
| Xiaomi | 13 ~ 17 Ultra |
| Redmi | K60 ~ K90 Pro |

每个预设包含：机型名、镜头描述、光圈、焦距、35mm 等效焦距、ISO、快门速度、曝光补偿、软件版本。

### GPS 定位

- 🗺️ 交互式地图选点（Leaflet + 高德地图）
- 🔍 城市搜索（高德 REST API）
- ⚡ 12 个常用城市快捷选择
- 📍 内置 80+ 中国城市/景点坐标数据库

### 其他功能

- 🎨 8 种主题色 + 自定义颜色选择器
- 📱 移动端适配（iOS 风格 UI）
- 📂 拖拽上传 + 批量处理
- 🔄 HEIC/HEIF 自动转 JPEG
- 📥 单个/批量下载
- 📤 Web Share API 分享（移动端）

## 🚀 快速开始

### 方式一：直接使用（推荐）

不想启动后端？直接用就行：

1. 用浏览器打开 `index.html`
2. 登录时输入账号 `admin`，密码 `admin`
3. 开始编辑

### 方式二：带后端完整部署

#### 启动后端

```bash
cd server
npm install
npm start
```

后端默认运行在 `http://localhost:3000`。

#### 后端 API

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| POST | `/api/register` | 用户注册 |
| POST | `/api/login` | 用户登录 |
| GET | `/api/userinfo` | 获取用户信息（需 Bearer Token） |

#### 打开前端

浏览器打开 `index.html`，使用注册的账号登录即可。

## 📁 项目结构

```
EXIFEditor/
├── index.html                 # 前端单页应用（所有前端代码都在这一个文件里）
├── scripts/
│   └── allll.js               # piexifjs 库（EXIF 读写）
├── images/
│   ├── g.jpg                  # 教程图片
│   └── jiaocheng.png          # iOS 保存教程图片
├── server/
│   ├── server.js              # Express 服务入口
│   ├── db.js                  # SQLite 数据库初始化
│   ├── package.json           # 后端依赖
│   ├── routes/
│   │   └── auth.js            # 认证路由（注册/登录/用户信息）
│   └── middleware/
│       └── auth.js            # JWT 认证中间件
└── README.md
```

## 🛠️ 技术栈

### 前端
- 纯 HTML/CSS/JavaScript（无框架）
- piexifjs — JPEG EXIF 读写
- Leaflet.js — 交互式地图
- 高德地图 — 地图瓦片 + 地理编码
- heic2any — HEIC 格式转换

### 后端
- Node.js + Express
- SQLite (better-sqlite3)
- JWT (jsonwebtoken)
- bcryptjs 密码加密

## 📋 注意事项

- 图片处理完全在浏览器端完成，文件不会上传到服务器
- 输出图片统一为 JPEG 格式，原始 EXIF 数据会被完全替换（不是合并）
- 上传图片时不会读取已有 EXIF 数据，需要手动填写或选择预设
- 后端仅用于用户认证，不参与文件处理
- 视频编辑使用纯 JavaScript 实现的 MP4 Box 解析器，自动处理 stco/co64 偏移量调整

## 📄 License

MIT

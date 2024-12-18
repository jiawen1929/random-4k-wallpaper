# Random 4K Wallpaper Service 🖼️

一个基于 Minio 对象存储的随机4K壁纸服务，支持 Docker 部署。通过简单的 HTTP 请求即可获取随机壁纸，适合用作壁纸切换、网站背景等场景。

<div align="center">

![GitHub](https://img.shields.io/github/license/jiawen1929/random-4k-wallpaper)
![Docker](https://img.shields.io/badge/docker-ready-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![Python](https://img.shields.io/badge/python-3.x-blue.svg)

</div>

## ✨ 功能特点

- 🖼️ 随机返回存储桶中的壁纸
- 🐳 支持 Docker 容器化部署
- 🔄 自动生成临时访问链接
- ⚡ 轻量级 Express 服务
- 🛠️ 提供下载和删除工具脚本
- 🔒 支持 HTTPS 安全访问
- ⚙️ 支持环境变量配置

## 📁 目录结构

```tree
├── Dockerfile           # Docker 镜像构建文件
├── docker-compose.yml   # Docker Compose 配置文件
├── package.json        # Node.js 项目配置
└── server.js           # 主服务程序
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/jiawen1929/random-4k-wallpaper.git
cd random-4k-wallpaper
```

### 2. 配置环境变量

修改 `docker-compose.yml` 中的环境变量：

```yaml
environment:
  - MINIO_ENDPOINT=your-minio-server
  - MINIO_PORT=9001
  - MINIO_ACCESS_KEY=your-access-key
  - MINIO_SECRET_KEY=your-secret-key
  - MINIO_USE_SSL=false
  - MINIO_BUCKET=your-bucket
```

### 3. 构建并启动服务

```bash
docker-compose up -d
```

### 4. 访问服务

访问 `http://localhost:12673/random-4k` 获取随机壁纸。

## ⚙️ 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|:--------:|:------:|:--------:|
| MINIO_ENDPOINT | Minio 服务器地址 | minio.sujiawen.com |
| MINIO_PORT | Minio 端口 | 8888 |
| MINIO_ACCESS_KEY | 访问密钥 | jiawen |
| MINIO_SECRET_KEY | 访问密钥 | - |
| MINIO_USE_SSL | 是否使用 SSL | false |
| MINIO_BUCKET | 存储桶名称 | backgroudimage |
| PORT | 服务端口 | 3000 |

## 🛠️ 工具脚本

### 下载工具 (download_images.py)

用于批量下载 Minio 中的图片到本地：

```bash
python download_images.py
```

特点：
- ✨ 支持多种图片格式（jpg, png, jpeg, webp）
- 🔄 断点续传功能
- ⚡ 并发下载
- 🔁 自动重试机制

### 删除工具 (delete_images.py)

用于批量删除 Minio 中的图片：

```bash
python delete_images.py
```

特点：
- 🔒 安全确认机制
- 📝 详细的操作日志
- 🎯 精确的错误处理

## 📦 部署方式

### Docker 部署（推荐）
```bash
docker-compose up -d
```

### PM2 部署（可选）
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

## 📝 注意事项

- 确保 Minio 服务器可访问
- 建议在生产环境中使用 HTTPS
- 定期检查和清理临时访问链接
- 建议配置访问日志和监控

## 📄 License

MIT License © 2024 [jiawen1929](https://github.com/jiawen1929)

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📮 联系方式

- Issue: [GitHub Issues](https://github.com/jiawen1929/random-4k-wallpaper/issues)
- Email: mail@sujiawen.com

## 📋 更新日志

### v1.0.0 (2024-01-20)
- 🎉 初始版本发布
- ✨ 基本功能实现
- 🐳 Docker 支持

## ⚠️ 免责声明

- 本项目中的壁纸图片均来源于互联网，仅供个人学习和研究使用
- 如果图片侵犯了您的权益，请通过以下方式联系我们，我们会立即处理：
  - 发送邮件到 mail@sujiawen.com
  - 在 [GitHub Issues](https://github.com/jiawen1929/random-4k-wallpaper/issues) 中提出
- 本项目不对任何图片的版权问题负责
- 请在使用这些图片时遵守相关法律法规
- 禁止将本项目用于任何商业用途
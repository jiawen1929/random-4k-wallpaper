const express = require('express');
const Minio = require('minio');
const app = express();

// 添加 CORS 和缓存控制头
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    next();
});

// 从环境变量获取 Minio 配置
const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT || '192.168.1.101',
    port: parseInt(process.env.MINIO_PORT) || 9001,
    useSSL: process.env.MINIO_USE_SSL === 'false',
    accessKey: process.env.MINIO_ACCESS_KEY || 'jiawen',
    secretKey: process.env.MINIO_SECRET_KEY || 'x83BCIQ3xuAIC9iwDV667Zlq'
});

// 从环境变量获取存储桶名称
const bucketName = process.env.MINIO_BUCKET || 'backgroudimage';

app.get('/', async (req, res) => {
    try {
        console.log('Minio 配置:', {
            endPoint: process.env.MINIO_ENDPOINT,
            port: parseInt(process.env.MINIO_PORT),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY,
            bucket: process.env.MINIO_BUCKET
        });

        // 列出所有对象
        const objects = [];
        const stream = minioClient.listObjects(bucketName, '', true);

        stream.on('data', (obj) => {
            objects.push(obj.name);
        });

        stream.on('end', async () => {
            if (objects.length === 0) {
                return res.status(404).send('没有找到图片');
            }

            // 随机选择一个图片
            const randomImage = objects[Math.floor(Math.random() * objects.length)];

            // 直接返回图片内容
            const stream = await minioClient.getObject(bucketName, randomImage);

            // 根据文件扩展名设置正确的内容类型
            const ext = randomImage.split('.').pop().toLowerCase();
            const contentTypes = {
                'jpg': 'image/jpeg',
                'jpeg': 'image/jpeg',
                'png': 'image/png',
                'webp': 'image/webp'
            };
            res.setHeader('Content-Type', contentTypes[ext] || 'image/jpeg');

            // 将图片流传输到响应
            stream.pipe(res);

            // 处理错误
            stream.on('error', (err) => {
                console.error('读取图片错误:', err);
                res.status(500).send('获取图片失败');
            });
        });

        stream.on('error', (err) => {
            console.error('Minio 错误:', {
                code: err.code,
                message: err.message,
                bucket: err.bucketname,
                requestId: err.requestid
            });
            res.status(500).send('服务器错误');
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('服务器错误');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
}); 
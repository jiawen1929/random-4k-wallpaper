const express = require('express');
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');
const app = express();

// 添加 CORS 和缓存控制头
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');
    next();
});

// 配置 R2 客户端
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://r2.sujiawen.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
});

const bucketName = process.env.R2_BUCKET || 'backgroudimage';

app.get('/', async (req, res) => {
    try {
        // 列出所有对象
        const listCommand = new ListObjectsV2Command({
            Bucket: bucketName
        });

        const { Contents } = await s3Client.send(listCommand);
        
        if (!Contents || Contents.length === 0) {
            return res.status(404).send('没有找到图片');
        }

        // 随机选择一个图片
        const randomImage = Contents[Math.floor(Math.random() * Contents.length)];

        // 获取图片对象
        const getCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: randomImage.Key
        });

        const { Body, ContentType } = await s3Client.send(getCommand);

        // 设置响应头
        res.setHeader('Content-Type', ContentType);

        // 将图片流传输到响应
        Body.pipe(res);

    } catch (error) {
        console.error('错误:', error);
        res.status(500).send('服务器错误');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
}); 
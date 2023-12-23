# 使用官方 Node.js 基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 将依赖项复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将源代码复制到工作目录
COPY . .

# 构建应用程序
RUN npm run build

# 设置环境变量
ENV NODE_ENV production

# 启动应用程序
CMD ["npm", "run", "serve"]

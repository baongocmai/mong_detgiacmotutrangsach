# Sử dụng Node.js làm base image
FROM node:18 AS frontend

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json từ thư mục src vào container
COPY ../package.json ./  

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn của frontend vào container
COPY ./ ./frontend

# Build ứng dụng React
RUN npm run build

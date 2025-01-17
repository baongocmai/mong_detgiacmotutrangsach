# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn và build ứng dụng
COPY . . 
RUN npm run build

# Stage 2: Serve với serve
FROM node:18-alpine
WORKDIR /app

# Cài đặt serve
RUN npm install -g serve

# Sao chép build từ giai đoạn trước
COPY --from=builder /app/build /app/build

# Expose port 3000 và chạy ứng dụng
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]

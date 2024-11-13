# Menggunakan image Node.js untuk build frontend
FROM node:18-alpine AS build

# Set working directory di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh file ke dalam container
COPY . .

# Build aplikasi frontend
RUN npm run build

# Gunakan image Nginx untuk serving file statis
FROM nginx:alpine

# Salin hasil build ke direktori Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 untuk mengakses frontend
EXPOSE 80

# Jalankan Nginx server
CMD ["nginx", "-g", "daemon off;"]

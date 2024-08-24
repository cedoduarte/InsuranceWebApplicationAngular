FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/insurance-app /usr/share/nginx/html

EXPOSE 8080
# Etapa de construcción
FROM node:18.9.1-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENV VITE_BASE_URL="/"
COPY . .
RUN yarn build

# Etapa de producción
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY src/assets /usr/share/nginx/html/assets
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

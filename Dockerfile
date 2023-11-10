# First stage: Build the application
FROM node:14-alpine as nodework
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Second stage: Serve the application using Nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /app/www /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

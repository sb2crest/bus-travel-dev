# First stage: Build the application
FROM node:14-alpine as nodework
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . .
EXPOSE 8100
RUN npm run build
CMD [ "ionic", "serve" ]

# # Second stage: Serve the application using Nginx
# FROM nginx:1.23-alpine

# # Copy Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=nodework /app/dist /usr/share/nginx/html
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

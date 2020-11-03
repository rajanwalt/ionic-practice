
FROM node:latest as builder


ARG env=prod

# RUN apk update && apk add --no-cache make git

# Move our files into directory name "app"
RUN mkdir -p /client
WORKDIR /client
COPY package.json package-lock.json  /client/
RUN npm install @angular/cli -g &&  \
npm install -g typescript && npm install -g @ionic/cli
RUN cd /client && npm install
COPY .  /client

# Build with $env variable from outside
RUN cd /client && ionic build --prod

# Build a small nginx image with static website
FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /client/www /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
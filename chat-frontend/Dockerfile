FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY . ./

RUN npm run build

EXPOSE 443

CMD ["npx", "serve", "-l", "443", "--ssl-key", "key.pem", "--ssl-cert", "cert.pem", "-s", "build"]
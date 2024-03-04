FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY . ./

EXPOSE 8443

CMD ["npm", "run", "start"]
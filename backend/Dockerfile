FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=container

EXPOSE 3000

CMD ["npm", "start"]
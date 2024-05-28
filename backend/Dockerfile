FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG NODE_ENV
ARG JWT_SECRET
ARG REFRESH_SECRET
ARG SALT

# Définissez les variables d'environnement avec ENV
ENV NODE_ENV=$NODE_ENV
ENV JWT_SECRET=$JWT_SECRET
ENV REFRESH_SECRET=$REFRESH_SECRET
ENV SALT=$SALT

EXPOSE 3000

CMD ["npm", "start"]
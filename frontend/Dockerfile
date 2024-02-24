# Étape 1 : Installer les dépendances
FROM node:20.11
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

EXPOSE 4200

# Étape 2 : Exécuter le serveur de développement Angular
CMD ["npm", "start"]

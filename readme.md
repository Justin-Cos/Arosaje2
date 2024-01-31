# Projet A'rosa'je

## Installation

### Clonage du Projet

1. **Cloner le projet depuis le référentiel GitHub :**
   ```bash
   git clone https://github.com/Justin-Cos/Arosaje2.git

### Backend

1. **Récupérer les dépendances :**
   ```bash
   npm install
2. **Lancer les seeds :**
   ```bash
   npx sequelize-cli db:seed:all

3. **Lancer le serveur backend avec Docker :** 
   ```bash
   docker-compose --build --force-recreate

### Frontend
1. **Naviguer vers le dossier frontend :**
   ```bash
   cd front

2. **Récupérer les dépendances :**
   ```bash
   npm install
3. Lancer le serveur frontend :
   ```bash
   ng serve
   
## Remarques

Assurez-vous d'avoir Docker installé et en cours d'exécution pour le backend.
Le frontend utilise Angular, assurez-vous d'avoir Angular CLI installé.

## Préambule

L'entreprise "A'rosa-je," fondée en 1984, offre des services aux propriétaires de plantes, incluant la garde des plantes en l'absence des propriétaires et des conseils d'entretien. Dans le cadre d'une nouvelle offre, notre équipe a été sélectionnée pour développer une application permettant aux utilisateurs de faire garder leurs plantes, avec un partage de photos et de conseils. 
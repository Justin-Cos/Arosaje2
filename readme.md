# Projet A'rosa'je

## Installation

### Clonage du Projet

1. **Cloner le projet depuis le référentiel GitHub :**
   ```bash
   git clone https://github.com/Justin-Cos/Arosaje2.git

### Backend - Frontend
1. **Lancer le serveur backend et angular frontend avec Docker :** 
   ```bash
   docker-compose --build --force-recreate

## Remarques

Assurez-vous d'avoir Docker installé et en cours d'exécution pour le backend.

### Mobile

1. **Naviguer vers le dossier frontend :**
   ```bash
    cd frontend
   
2. **Récupérer les dépendances :**
   ```bash
   npm install

3. **Build  :**
   ```bash
   ionic cap build android

4. **Lancer le serveur mobile  :**
   ```bash
   ionic cap run android 
   
   
## Remarques

Le mobile utilise Angular, assurez-vous d'avoir Angular CLI installé.  
Le mobile utilise Gradle, assurez-vous d'avoir Gradle d'installé.
Assurez-vous d'avoir Android Studio installé et configuré.
Assurez-vous d'avoir le SDK Android installé et configuré.
Assurez-vous d'avoir Java installé et configuré.
Assurez-vous d'avoir Node.js 20.11 (conseillé) installé et configuré.
Assurez-vous d'avoir Ionic cli installé en version 7.2.
   ```bash
   npm i -g @ionic/cli@7.2.0

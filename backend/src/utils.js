const bcrypt = require('bcrypt');

module.exports = {
    convertToSnakeCase(name) {
        return name.replace(/\s+/g, '_').toLowerCase();
    },
    randomBoolean() {
        return Math.random() >= 0.5;
    },
    getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    },
    hashPassword(password) {
        return bcrypt.hashSync(password, process.env.SALT);
    },
    generateRandomCoordinatesInFrance() {
        const franceBoundaries = {
            minLongitude: -5.0,
            maxLongitude: 9.56,
            minLatitude: 41.33,
            maxLatitude: 51.12,
        };

        const randomLongitude = Math.random() * (franceBoundaries.maxLongitude - franceBoundaries.minLongitude) + franceBoundaries.minLongitude;
        const randomLatitude = Math.random() * (franceBoundaries.maxLatitude - franceBoundaries.minLatitude) + franceBoundaries.minLatitude;

        return {
            longitude: randomLongitude.toFixed(6),
            latitude: randomLatitude.toFixed(6),
        };
    },
    calculateDist(lat1, lon1, lat2, lon2) {
        const deg2rad = (deg) => {
            return deg * (Math.PI / 180);
        };
        const R = 6371; // Rayon de la Terre en kilomètres
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },

}
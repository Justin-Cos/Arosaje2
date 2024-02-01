module.exports = {
     convertToSnakeCase(name) {
        return name.replace(/\s+/g, '_').toLowerCase();
    },
     randomBoolean() {
        return Math.random() >= 0.5;
    },
    getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }
}
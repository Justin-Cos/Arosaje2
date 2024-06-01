console.log("Jest configuration loaded");

module.exports = {
    setupFiles: [
        "<rootDir>/tests/test-setup.js"
    ],

    testEnvironment: "node",

};
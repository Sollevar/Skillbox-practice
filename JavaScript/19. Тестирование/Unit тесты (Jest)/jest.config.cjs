const config = {
    verbose: true,
    transform: {
        '\\.js$': 'babel-jest',
    },
    testEnvironment: "jsdom"
};
module.exports = config;

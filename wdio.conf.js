exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js',
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:devtoolsOptions': {
            headless: true
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://the-internet.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        timeout: 60000
    },
    reporters: ['spec'],
}

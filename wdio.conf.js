exports.config = {
    runner: 'local',
    port: 4723,
    specs: [
        './test/specs/**/*.js',
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'mac',
        browserName: 'chrome',
        'wdio:devtoolsOptions': {
            headless: false
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        timeout: 60000
    },
    reporters: ['spec'],
}

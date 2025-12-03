# WebdriverIO Test Project

A learning project for WebdriverIO automation testing with planned BrowserStack integration.

## Project Structure

```
webdriverio-test/
├── test/
│   ├── specs/              # Test files
│   ├── pageobjects/        # Page Object Model classes
│   └── helpers/            # Helper functions and utilities
├── config/                 # BrowserStack and other configs
├── wdio.conf.js           # WebdriverIO configuration
├── package.json
└── README.md
```

## Installation

Dependencies are already installed. To verify:

```bash
npm list @wdio/cli
npm list webdriverio
```

## Running Tests

### Local Tests
```bash
npm run test
```

### Specific Spec
```bash
npx wdio run wdio.conf.js --spec test/specs/login.spec.js
```

## Project Phases

### Phase 1: Local Learning (Current)
- ✅ Project scaffolded
- Learn WebdriverIO fundamentals
- Write tests against public websites (e.g., the-internet.herokuapp.com)
- Understand Page Object Model pattern
- Master assertions and waits

### Phase 2: BrowserStack Integration
- Create `config/browserstack.conf.js`
- Configure remote capabilities
- Test on multiple browsers/devices
- Set up CI/CD integration

### Phase 3: Mobile/App Testing (Optional)
- Integrate Appium for mobile testing
- Test on Android devices via BrowserStack

## Resources

- [WebdriverIO Docs](https://webdriver.io/)
- [BrowserStack Integration](https://www.browserstack.com/automate/webdriverio)
- [Page Object Model Best Practices](https://webdriver.io/docs/pageobjects/)

# WebdriverIO Test Project

A learning project for WebdriverIO automation testing with planned BrowserStack integration.

## Project Structure

```
webdriverio-test/
├── test/
│   ├── specs/                          # Test specifications (7 files, 72 tests)
│   │   ├── assertions-practice.spec.js # Learning suite: Chai assertions (24 tests)
│   │   ├── labels-and-text.spec.js     # Text content validation (23 tests)
│   │   ├── login.spec.js               # Basic login tests (3 tests)
│   │   ├── login-advanced.spec.js      # Advanced login scenarios (7 tests)
│   │   ├── form.spec.js                # Form interaction tests (4 tests)
│   │   ├── checkbox.spec.js            # Checkbox handling (5 tests)
│   │   └── dropdown.spec.js            # Dropdown testing (6 tests)
│   │
│   ├── pageobjects/                    # Page Object Model classes (5 files)
│   │   ├── base.page.js                # Base class with common methods
│   │   ├── login.page.js               # Login page selectors and methods
│   │   ├── checkbox.page.js            # Checkbox page elements
│   │   ├── dropdown.page.js            # Dropdown page elements
│   │   └── form.page.js                # Form page elements
│   │
│   └── helpers/                        # Helper functions and utilities (empty)
│
├── config/                 # BrowserStack and other configs
├── wdio.conf.js           # WebdriverIO configuration
├── package.json           # Project dependencies
├── TESTING_GUIDE.md       # Comprehensive testing documentation and learning guide
└── README.md
```

### Test Suite Overview

| File | Tests | Purpose |
|------|-------|---------|
| assertions-practice.spec.js | 24 | Learn Chai assertion patterns with real examples |
| labels-and-text.spec.js | 23 | Validate text content, labels, error messages, patterns |
| login.spec.js | 3 | Basic login functionality |
| login-advanced.spec.js | 7 | Complex login scenarios (waits, multiple assertions) |
| form.spec.js | 4 | Form submission and validation |
| checkbox.spec.js | 5 | Checkbox selection and state verification |
| dropdown.spec.js | 6 | Dropdown interaction and value selection |
| **Total** | **72** | **100% pass rate** |

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

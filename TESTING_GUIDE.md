# VS Code Testing Guide for WebdriverIO

## Running Tests in VS Code

### Method 1: Using Tasks (Recommended for Quick Access)
1. Press **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows/Linux)
2. Type "Run Task"
3. Select from available test tasks:
   - **Run All Tests** - Run entire test suite
   - **Run Login Tests** - Run login page tests only
   - **Run Checkbox Tests** - Run checkbox interaction tests
   - **Run Dropdown Tests** - Run dropdown selection tests
   - **Run Input Field Tests** - Run form input tests
   - **Run Login Advanced Tests** - Run advanced login validation tests

### Method 2: Terminal
Open integrated terminal (Ctrl+`) and run:
```bash
npm test                    # Run all tests
npm test -- --spec test/specs/login.spec.js              # Run specific test file
npm test -- --spec test/specs/checkbox.spec.js           # Run checkbox tests only
```

### Method 3: Watch Mode
```bash
npm run test:watch        # Run tests in watch mode (auto-rerun on file changes)
```

## Understanding Test Output

### Test Structure:
```
[chrome 142.0.7444.176 mac #0-0] Running: chrome (v142.0.7444.176) on mac
[chrome 142.0.7444.176 mac #0-0] Session ID: a07971f0703271ade9748f640ff90de7
[chrome 142.0.7444.176 mac #0-0] » test/specs/checkbox.spec.js
[chrome 142.0.7444.176 mac #0-0] Checkbox Tests
[chrome 142.0.7444.176 mac #0-0]    ✓ should display checkboxes on the page
[chrome 142.0.7444.176 mac #0-0]    ✓ should be able to check a checkbox
[chrome 142.0.7444.176 mac #0-0]    ✖ should toggle multiple checkboxes
```

### Symbols:
- **✓** = Test passed
- **✖** = Test failed
- **Session ID** = Unique browser session identifier
- **#0-0** = Worker process number (parallel execution)

## Current Test Suite Status

### Summary:
- ✅ **25 Tests Passing** (100% Pass Rate)
- ⏱️ **Average Run Time:** 22 seconds

### Test Files:
1. **login.spec.js** (3/3 passing) ✅
2. **login-advanced.spec.js** (7/7 passing) ✅
3. **checkbox.spec.js** (5/5 passing) ✅
4. **dropdown.spec.js** (6/6 passing) ✅
5. **form.spec.js** (4/4 passing) ✅

## Debugging Tests

### Enable Debug Output:
1. Modify `wdio.conf.js` and change `logLevel` from `'info'` to `'debug'`
2. Run tests again to see detailed browser commands
3. Look for `COMMAND` and `RESULT` entries in logs

### Pause/Step Through:
Add `await browser.pause(5000)` to pause tests for 5 seconds
Add `await browser.debug()` to open debug console during test

## Page Objects & Selectors

### Where to Find Them:
- `/test/pageobjects/` - Contains reusable page element selectors
- `/test/specs/` - Contains test scenarios

### Structure:
```javascript
// Page Object (login.page.js)
get inputUsername () {
    return $('[id="username"]');  // Selector
}

// Test (login.spec.js)
await LoginPage.inputUsername.setValue('test');  // Use it
```

## Tips for Learning

1. **Start Small** - Run individual test files first
2. **Read Logs** - Look at BIDI commands to understand browser interactions
3. **Use Page Objects** - Reusable selectors make tests maintainable
4. **Check Assertions** - `.toBe()`, `.toBeDisplayed()`, `.toContain()` etc
5. **Practice Selectors** - Learn CSS/XPath to find elements on pages

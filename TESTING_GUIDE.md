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

## Chai Assertions Guide

**What is Chai?** Chai is an assertion library that lets you write readable test conditions. Every test ends with an assertion that verifies something happened correctly.

### Basic Chai Syntax
```javascript
expect(actual).toBe(expected);           // Simple equality
expect(actual).to.equal(expected);       // Same as above
expect(actual).to.include(value);        // Check if contains
expect(actual).to.be.true;               // Check if truthy
expect(actual).to.be.false;              // Check if falsy
expect(actual).to.not.equal(unexpected); // Negation (not equal)
```

### WebdriverIO-Specific Assertions
WebdriverIO extends Chai with browser-specific matchers for testing web elements.

#### **Element Visibility & Presence**
```javascript
// Check if element is displayed (visible on page)
expect(element).toBeDisplayed();
expect(element).not.toBeDisplayed();

// Check if element exists in DOM
expect(element).toExist();
expect(element).not.toExist();

// Check if element is clickable
expect(element).toBeClickable();
```

**Real example from our tests:**
```javascript
// From checkbox.spec.js
expect(await CheckboxPage.firstCheckbox).toBeDisplayed();  // Verify checkbox exists
```

#### **Text Content**
```javascript
// Check exact text
expect(element).toHaveText('Expected Text');

// Check if contains partial text
expect(element).toHaveTextContaining('partial');

// Get and check element text
const text = await element.getText();
expect(text).toContain('error');
```

**Real example from our tests:**
```javascript
// From login.spec.js
expect(await LoginPage.alertFlash).toHaveText('Your username is invalid!');
```

#### **Input Values & Attributes**
```javascript
// Check input field value
expect(input).toHaveValue('expected value');

// Check HTML attribute
expect(element).toHaveAttribute('href', 'https://example.com');

// Check CSS class
expect(element).toHaveElementClass('active');
```

**Real example from our tests:**
```javascript
// From form.spec.js
expect(input).toHaveValue('test input');  // Verify form field has correct value
```

#### **Multiple Elements (Arrays)**
```javascript
// Check count of elements
const elements = $$('button');
expect(elements).toHaveLength(5);  // Should find exactly 5 buttons

// Check each element
elements.forEach(elem => {
    expect(elem).toBeDisplayed();
});
```

**Real example from our tests:**
```javascript
// From dropdown.spec.js
const options = await DropdownPage.getAllOptions();
expect(options).toBeDefined();  // Verify we got the options
```

### Common Assertion Patterns in Our Tests

#### Pattern 1: Verify Page Loads
```javascript
// Check if main element displays
expect(await LoginPage.inputUsername).toBeDisplayed();
```
**What it does:** Confirms the page loaded correctly by checking a key element exists

#### Pattern 2: Verify Form Submission
```javascript
await LoginPage.login('admin', 'admin');
expect(await LoginPage.alertFlash).toHaveText('Your username is invalid!');
```
**What it does:** Confirms the form was submitted and we got expected feedback

#### Pattern 3: Verify State Changes
```javascript
await CheckboxPage.toggleCheckbox(0);
expect(checkbox).toBeChecked();
```
**What it does:** Confirms user action resulted in expected state change

#### Pattern 4: Verify List/Array Operations
```javascript
const options = await DropdownPage.getAllOptions();
expect(options.length).toBeGreaterThan(0);
```
**What it does:** Confirms collection has expected items

### Assertion Chaining (Advanced)
```javascript
// Chain multiple assertions
expect(element)
    .to.exist
    .and.to.be.visible
    .and.to.have.text('Click Me');

// This is equivalent to:
expect(element).toExist();
expect(element).toBeDisplayed();
expect(element).toHaveText('Click Me');
```

### Debugging Failed Assertions
When an assertion fails, Chai shows:
```
Expected: value to be 'admin'
Received: 'invalid'
```

**How to fix:**
1. Check the "Expected" vs "Received" values
2. Look at the element/page object selector
3. Run the test with debug logs enabled
4. Use `await browser.debug()` to pause and inspect

### Practice Exercise: Reading Assertions
Look at these test files and identify what each assertion checks:
1. **login.spec.js** - Find `.toHaveText()` assertions
2. **checkbox.spec.js** - Find `.toBeDisplayed()` assertions
3. **form.spec.js** - Find `.toHaveValue()` assertions
4. **dropdown.spec.js** - Find array/length assertions

For each assertion, ask yourself: "What is this test verifying?"

## Tips for Learning

### 1. Start Small - Run Individual Test Files First
**Why:** Testing one file helps you understand the flow without overwhelming output.

**How to practice:**
```bash
npm test -- --spec test/specs/login.spec.js              # Run only login tests
npm test -- --spec test/specs/checkbox.spec.js           # Run only checkbox tests
```

**What to do:** 
- Start with `login.spec.js` (the simplest tests)
- Trace through each test line by line
- Understand what each test is checking before running it
- Run it and verify the output matches your expectations

### 2. Read Logs - Look at BIDI Commands to Understand Browser Interactions
**Why:** The logs show exactly what WebdriverIO is telling the browser to do.

**What to look for in the output:**
```
[chrome ...] BIDI > navigateTo('http://the-internet.herokuapp.com/login')
[chrome ...] BIDI < navigateTo result
[chrome ...] BIDI > findElement('css selector', '[id="username"]')
[chrome ...] BIDI < elementReference (element found)
```

**Interpretation:**
- `BIDI >` = Command being sent to browser
- `BIDI <` = Response from browser
- If you see `stale element reference` → element no longer on page
- If you see `no element found` → selector is wrong or element not loaded yet

**Practice tip:** Add `logLevel: 'debug'` to `wdio.conf.js` to see all BIDI commands

### 3. Use Page Objects - Reusable Selectors Make Tests Maintainable
**Why:** Page Objects keep selectors organized and make tests readable.

**Structure to understand:**
```javascript
// In page object (login.page.js)
get inputUsername () {
    return $('[id="username"]');  // Find element once, reuse anywhere
}
get inputPassword () {
    return $('[id="password"]');
}
get btnSubmit () {
    return $('button[type="submit"]');
}

// In test file (login.spec.js)
await LoginPage.inputUsername.setValue('admin');      // Call getter, set value
await LoginPage.inputPassword.setValue('admin');
await LoginPage.btnSubmit.click();
```

**Benefits:**
- If selector changes, update it in ONE place (the page object)
- Tests are more readable (what you're doing vs technical details)
- Easy to add new methods to page objects

**Learning exercise:**
1. Open `test/pageobjects/login.page.js`
2. Find a selector like `get inputUsername()`
3. Open `test/specs/login.spec.js`
4. Search for where `inputUsername` is used
5. Understand the flow: Page Object → Test → Browser Action

### 4. Check Assertions - `.toBe()`, `.toBeDisplayed()`, `.toContain()` etc
**Why:** Assertions are how you verify the test actually passed.

**Common assertions you'll see:**
```javascript
expect(element).toBeDisplayed();           // Element is visible on page
expect(element).toHaveText('Login');       // Element contains this text
expect(element).toHaveValue('someValue');  // Input has this value
expect(text).toContain('error');           // Text contains substring
expect(title).toBe('Expected Title');      // Exact match
```

**How to read test failures:**
```
Expected: value to be 'admin'
Received: ''
```
→ The input field is empty when we expected it to have 'admin'

**Learning tip:**
- Look at `checkbox.spec.js` to see `.toBeDisplayed()` in action
- Look at `login.spec.js` to see `.toHaveText()` checking error messages
- Look at `form.spec.js` to see `.toHaveValue()` checking input values

### 5. Practice Selectors - Learn CSS/XPath to Find Elements on Pages
**Why:** Good selectors are the foundation of reliable tests.

**CSS Selectors (what we use):**
```javascript
$('[id="username"]')           // Find by ID attribute
$('button[type="submit"]')     // Find button with type="submit"
$('.error-message')            // Find by class name
$('input:nth-of-type(2)')      // Find 2nd input on page
$('div > button')              // Find button directly inside div
```

**How to find selectors:**
1. Open test website in browser
2. Right-click element → Inspect
3. Look at the HTML to find a unique identifier
4. Try in DevTools console: `document.querySelector('[id="username"]')`
5. Add to page object if it works

**Practice exercise:**
1. Visit http://the-internet.herokuapp.com/login in your browser
2. Right-click the username field → Inspect
3. Notice it has `id="username"`
4. Check that our page object has: `get inputUsername () { return $('[id="username"]'); }`
5. That's the same selector! ✅

**When selectors are fragile:**
- Avoid `nth-of-type()` (breaks if page layout changes)
- Avoid `nth-child()` (brittle)
- Prefer IDs, data-test attributes, or semantic HTML
- Look for `data-testid`, `id`, or `name` attributes first

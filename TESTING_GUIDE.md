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
- ✅ **72 Tests Passing** (100% Pass Rate)
- ⏱️ **Average Run Time:** 46 seconds
- 📊 **7 Test Files** covering comprehensive scenarios

### Test Files:
1. **assertions-practice.spec.js** (24/24 passing) ✅ - Chai assertion patterns with real examples
2. **labels-and-text.spec.js** (23/23 passing) ✅ - Text content, labels, error messages
3. **login.spec.js** (3/3 passing) ✅ - Basic login functionality
4. **login-advanced.spec.js** (7/7 passing) ✅ - Advanced login validation
5. **checkbox.spec.js** (5/5 passing) ✅ - Checkbox interactions
6. **dropdown.spec.js** (6/6 passing) ✅ - Dropdown selections
7. **form.spec.js** (4/4 passing) ✅ - Form input testing

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

## Labels and Text Content Testing

### Overview
The `labels-and-text.spec.js` file demonstrates practical text assertion patterns you'll use frequently when testing web applications.

### Key Test Areas

#### 1. Label Text Assertions
Tests that verify form labels, headings, and button text contain expected content.

```javascript
// Verify exact heading text
expect(heading).toHaveText('Login Page');

// Verify label contains substring
const labelText = await usernameLabel.getText();
expect(labelText).toContain('Username');

// Check multiple labels
const labels = await $$('label');
expect(labels).toHaveLength(2);
```

**Use case:** Form validation, page headers, button labels

#### 2. Error Message Assertions
Tests that verify error messages appear and contain relevant information.

```javascript
// Wait for error message to display
const errorMessage = await $('.flash.error');
await errorMessage.waitForDisplayed();

// Verify error contains expected text
const errorText = await errorMessage.getText();
expect(errorText).toContain('invalid');
```

**Use case:** Login failures, form validation errors, API errors

#### 3. Dynamic Text Content
Tests that verify text updates correctly based on user interactions.

```javascript
// Initially empty
let currentValue = await input.getValue();
expect(currentValue).toBe('');

// After user input
await input.setValue('admin');
currentValue = await input.getValue();
expect(currentValue).toContain('admin');
```

**Use case:** Live search, auto-complete, form submission feedback

#### 4. Text Matching Patterns
Advanced techniques for flexible text matching.

```javascript
// Using regular expressions
const headingText = await heading.getText();
expect(/Login/i.test(headingText)).toBe(true);

// Check text length
expect(headingText.length).toBeGreaterThan(3);
expect(headingText.length).toBeLessThan(50);

// String methods
expect(headingText.startsWith('Login')).toBe(true);
expect(headingText.endsWith('Page')).toBe(true);

// Word boundaries
const words = headingText.split(' ');
expect(words).toHaveLength(2);
```

**Use case:** Flexible validation, data format checking, boundary testing

### Real-World Patterns

#### Pattern 1: Verify Page Headers
```javascript
describe('Page Verification', () => {
    it('should verify correct page loaded', async () => {
        const heading = await $('h1');
        expect(heading).toBeDisplayed();
        expect(heading).toHaveText('Dashboard');
    });
});
```

#### Pattern 2: Error Message Validation
```javascript
describe('Form Error Handling', () => {
    it('should show error on invalid submission', async () => {
        await form.submit();
        
        const error = await $('.error-message');
        expect(error).toBeDisplayed();
        expect(error.getText()).toContain('required');
    });
});
```

#### Pattern 3: Dynamic Content Updates
```javascript
describe('Search Functionality', () => {
    it('should update results text on search', async () => {
        const initialText = await resultsLabel.getText();
        expect(initialText).toContain('0 results');
        
        await searchInput.setValue('test');
        const updatedText = await resultsLabel.getText();
        expect(updatedText).toContain('10 results');
    });
});
```

### Common Text Assertion Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `toHaveText()` | Exact text match | `expect(el).toHaveText('Click Me')` |
| `getText()` | Get text for custom checks | `const text = await el.getText()` |
| `toContain()` | Partial text match | `expect(text).toContain('error')` |
| `startsWith()` | Text begins with | `expect(text.startsWith('Login'))` |
| `endsWith()` | Text ends with | `expect(text.endsWith('Page'))` |
| `includes()` | Contains substring | `expect(text.includes('user'))` |

### Testing Tips for Labels & Text

1. **Always trim whitespace** - `getText()` handles this automatically
2. **Case sensitivity** - `toHaveText()` is case-sensitive
3. **Use `toContain()` for flexibility** - When exact text varies
4. **Check visibility first** - Verify element displays before reading text
5. **Handle dynamic content** - Use `await` and wait for element visibility
6. **Combine assertions** - Verify text AND visibility together

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

## Learning Assertions: The Practice File

### Overview
The `assertions-practice.spec.js` file is a comprehensive learning resource demonstrating Chai assertion patterns in real-world WebdriverIO scenarios. It includes 24 practical tests organized into 8 learning suites.

### Why This File Exists
**Purpose:** Help new testers learn assertion syntax and patterns by example

- Shows correct assertion syntax for different scenarios
- Demonstrates passing vs. failing conditions
- Uses real page objects and WebDriver commands
- Includes comments explaining each pattern
- Organized by assertion type for easy reference

### Learning Suites Covered

#### 1. Basic Equality Assertions (3 tests)
Learn how to check if values are equal or not equal.

```javascript
describe('Basic Equality Assertions', () => {
    it('should verify string equality', async () => {
        // Exact match
        expect('admin').toBe('admin');
        expect('admin').not.toBe('password');
    });

    it('should verify number equality', async () => {
        // Numbers
        expect(42).toBe(42);
        expect(42).not.toBe(0);
    });

    it('should verify boolean values', async () => {
        // Booleans
        expect(true).toBe(true);
        expect(false).not.toBe(true);
    });
});
```

**Key Points:**
- Use `toBe()` for strict equality (===)
- Use `not.toBe()` for inequality
- Works with strings, numbers, booleans

#### 2. Element Visibility Assertions (3 tests)
Learn how to verify elements display correctly.

```javascript
describe('Element Visibility Assertions', () => {
    it('should verify element is displayed', async () => {
        // Element must exist AND be visible
        expect(LoginPage.inputUsername).toBeDisplayed();
    });

    it('should verify element exists', async () => {
        // Element exists in DOM (doesn't need to be visible)
        expect(LoginPage.inputUsername).toExist();
    });

    it('should verify element is not displayed', async () => {
        // Element exists but not visible
        expect(nonVisibleElement).not.toBeDisplayed();
    });
});
```

**Key Points:**
- `toBeDisplayed()` = exists AND visible
- `toExist()` = in DOM but may be hidden
- Check these before reading element properties

#### 3. Text Content Assertions (3 tests)
Learn how to verify element text and labels.

```javascript
describe('Text Content Assertions', () => {
    it('should verify element text matches exactly', async () => {
        expect(button).toHaveText('Login');
    });

    it('should verify text contains substring', async () => {
        const text = await heading.getText();
        expect(text).toContain('Welcome');
    });

    it('should verify text matches pattern', async () => {
        const text = await heading.getText();
        expect(text.length).toBeGreaterThan(0);
    });
});
```

**Key Points:**
- `toHaveText()` = exact match
- `toContain()` = partial match
- `getText()` gives you raw text for custom checks

#### 4. Form Value Assertions (3 tests)
Learn how to verify input field values.

```javascript
describe('Form Value Assertions', () => {
    it('should verify input value', async () => {
        await input.setValue('admin');
        expect(input).toHaveValue('admin');
    });

    it('should verify empty input', async () => {
        expect(input).toHaveValue('');
    });

    it('should verify placeholder', async () => {
        expect(input).toHaveAttr('placeholder', 'Username');
    });
});
```

**Key Points:**
- `toHaveValue()` = current input value
- `toHaveAttr()` = HTML attribute checking
- Always trim whitespace in assertions

#### 5. Array and Count Assertions (3 tests)
Learn how to verify multiple elements.

```javascript
describe('Array and Count Assertions', () => {
    it('should verify array length', async () => {
        const labels = await $$('label');
        expect(labels).toHaveLength(2);
    });

    it('should verify array contains element', async () => {
        const options = await dropdown.$$('option');
        expect(options.length).toBeGreaterThan(0);
    });

    it('should verify element count', async () => {
        const items = await $$('.item');
        expect(items).not.toHaveLength(0);
    });
});
```

**Key Points:**
- `toHaveLength()` = exact count
- `toBeGreaterThan()` = range checking
- `$$` returns array of elements

#### 6. Boolean and Existence Assertions (3 tests)
Learn how to verify conditions and element existence.

```javascript
describe('Boolean and Existence Assertions', () => {
    it('should verify condition is true', async () => {
        const isDisplayed = await element.isDisplayed();
        expect(isDisplayed).toBe(true);
    });

    it('should verify element exists in page object', async () => {
        expect(LoginPage.inputUsername).toBeDefined();
    });

    it('should verify element is not present', async () => {
        const elements = await $$('.nonexistent');
        expect(elements).toHaveLength(0);
    });
});
```

**Key Points:**
- `toBe(true/false)` for boolean checks
- `toBeDefined()` = defined in code
- `toHaveLength(0)` = not present in DOM

#### 7. Attribute Assertions (3 tests)
Learn how to verify HTML attributes.

```javascript
describe('Attribute Assertions', () => {
    it('should verify element has specific attribute', async () => {
        expect(input).toHaveAttr('type', 'text');
    });

    it('should verify disabled attribute', async () => {
        expect(disabledButton).toHaveAttr('disabled');
    });

    it('should verify class attribute', async () => {
        expect(element).toHaveAttr('class');
        const classes = await element.getAttribute('class');
        expect(classes).toContain('active');
    });
});
```

**Key Points:**
- `toHaveAttr()` = check HTML attributes
- `getAttribute()` = get attribute value for custom logic
- Common attributes: type, disabled, class, id, data-*

#### 8. Page Object Integration (3 tests)
Learn how to use assertions with page objects.

```javascript
describe('Page Object Integration', () => {
    it('should verify page objects return elements', async () => {
        expect(LoginPage.inputUsername).toBeDefined();
        expect(LoginPage.inputPassword).toBeDefined();
        expect(LoginPage.buttonLogin).toBeDefined();
    });

    it('should verify page object methods work', async () => {
        await LoginPage.login('admin', 'admin');
        // Now verify success
        const dashboard = await $('h1');
        expect(dashboard).toHaveText('Dashboard');
    });

    it('should combine multiple assertions', async () => {
        // Check multiple conditions in one test
        expect(LoginPage.inputUsername).toBeDisplayed();
        expect(LoginPage.inputPassword).toBeDisplayed();
        expect(LoginPage.buttonLogin).toBeDisplayed();
    });
});
```

**Key Points:**
- Page objects make tests more maintainable
- Group related assertions together
- Use methods for reusable test steps

### How to Use This File for Learning

1. **Read a test** - Pick one from the 24 tests
2. **Run it** - See it pass: `npm test -- --spec test/specs/assertions-practice.spec.js`
3. **Modify it** - Change an assertion to make it fail
4. **Run it again** - See the failure message
5. **Fix it** - Change it back and verify it passes
6. **Apply it** - Use the pattern in your own tests

### Reference: All Assertion Types

| Assertion | Checks | Example |
|-----------|--------|---------|
| `toBe()` | Strict equality | `expect('admin').toBe('admin')` |
| `toHaveText()` | Exact text match | `expect(el).toHaveText('Login')` |
| `toContain()` | Substring/includes | `expect(text).toContain('error')` |
| `toBeDisplayed()` | Element visible | `expect(el).toBeDisplayed()` |
| `toExist()` | Element in DOM | `expect(el).toExist()` |
| `toHaveValue()` | Input value | `expect(input).toHaveValue('text')` |
| `toHaveAttr()` | HTML attribute | `expect(el).toHaveAttr('type')` |
| `toHaveLength()` | Array/string length | `expect(items).toHaveLength(5)` |
| `toBeDefined()` | Variable defined | `expect(obj).toBeDefined()` |
| `toBeGreaterThan()` | Numeric comparison | `expect(count).toBeGreaterThan(0)` |

### Best Practices from This File

1. **Combine page objects with assertions** - Cleaner, more maintainable tests
2. **One assertion focus per test** - Each test verifies one specific thing
3. **Use descriptive test names** - Names explain what is being verified
4. **Check visibility before reading** - Always verify element displays
5. **Use page object methods** - Reuse common interactions
6. **Group related tests** - Organize by assertion type or feature
7. **Document complex assertions** - Add comments for learning

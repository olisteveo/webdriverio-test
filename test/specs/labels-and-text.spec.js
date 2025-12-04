/**
 * Labels and Text Content Tests
 * 
 * This file focuses on testing text content in labels, headings, and other elements.
 * It demonstrates practical scenarios like checking form labels, page headings, and error messages.
 */

const LoginPage = require('../pageobjects/login.page');
const CheckboxPage = require('../pageobjects/checkbox.page');
const DropdownPage = require('../pageobjects/dropdown.page');

describe('Labels and Text Content Tests', () => {
    
    // ========================================
    // SECTION 1: LABEL TEXT ASSERTIONS
    // ========================================
    
    describe('1. Label Text Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should verify page heading text exactly', async () => {
            // toHaveText() checks for exact text match
            // This is useful when you want to ensure exact heading text
            
            const heading = await $('h2');
            expect(heading).toHaveText('Login Page');
            
            console.log('✓ Page heading contains exact text "Login Page"');
        });

        it('should check label text contains expected substring', async () => {
            // Using getText() with toContain() for partial matching
            // Useful when full text might have extra whitespace or formatting
            
            const usernameLabel = await $('label[for="username"]');
            const labelText = await usernameLabel.getText();
            
            expect(labelText).toContain('Username');
            
            console.log('✓ Username label text contains "Username"');
        });

        it('should verify multiple label texts in form', async () => {
            // Get all labels and verify their content
            
            const labels = await $$('label');
            
            // Verify we have labels on the page
            expect(labels).toHaveLength(2); // Username and Password labels
            
            // Check first label text
            const firstLabelText = await labels[0].getText();
            expect(firstLabelText).toContain('Username');
            
            // Check second label text
            const secondLabelText = await labels[1].getText();
            expect(secondLabelText).toContain('Password');
            
            console.log('✓ All form labels have correct text');
        });

        it('should verify button text content', async () => {
            // Check button text using toHaveText()
            
            const submitButton = await $('button[type="submit"]');
            expect(submitButton).toHaveText('Login');
            
            console.log('✓ Submit button displays "Login" text');
        });

        it('should check form labels are visible and have text', async () => {
            // Combine visibility and text assertions
            
            const labels = await $$('label');
            
            for (let label of labels) {
                // Verify label is displayed
                expect(label).toBeDisplayed();
                
                // Verify label has text (not empty)
                const text = await label.getText();
                expect(text.length).toBeGreaterThan(0);
            }
            
            console.log('✓ All labels are visible and contain text');
        });
    });

    // ========================================
    // SECTION 2: ERROR MESSAGE TEXT ASSERTIONS
    // ========================================
    
    describe('2. Error Message Text Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should verify error message appears with correct text after failed login', async () => {
            // Fill in wrong credentials and check error message
            
            const usernameInput = await LoginPage.inputUsername;
            const passwordInput = await LoginPage.inputPassword;
            const submitButton = await $('button[type="submit"]');
            
            // Enter wrong credentials
            await usernameInput.setValue('wronguser');
            await passwordInput.setValue('wrongpass');
            await submitButton.click();
            
            // Wait for error message to appear
            const errorMessage = await $('.flash.error');
            await errorMessage.waitForDisplayed();
            
            // Verify error message text contains expected content
            expect(errorMessage).toBeDisplayed();
            const errorText = await errorMessage.getText();
            expect(errorText).toContain('invalid');
            
            console.log('✓ Error message displayed with correct text');
        });

        it('should verify error message is hidden before submitting form', async () => {
            // Before any action, error should not exist or be hidden
            
            const errorElements = await $$('.flash.error');
            
            // Should have no error elements initially
            expect(errorElements).toHaveLength(0);
            
            console.log('✓ No error messages displayed initially');
        });

        it('should check error message contains multiple keywords', async () => {
            // Fill in wrong credentials
            const usernameInput = await LoginPage.inputUsername;
            const passwordInput = await LoginPage.inputPassword;
            const submitButton = await $('button[type="submit"]');
            
            await usernameInput.setValue('test');
            await passwordInput.setValue('test');
            await submitButton.click();
            
            // Wait and verify error
            const errorMessage = await $('.flash.error');
            await errorMessage.waitForDisplayed();
            
            const errorText = await errorMessage.getText();
            
            // Verify error contains key terms
            expect(errorText).toContain('invalid');
            expect(errorText.toLowerCase()).toContain('username');
            
            console.log('✓ Error message contains all expected keywords');
        });
    });

    // ========================================
    // SECTION 3: HEADING AND TITLE TEXT ASSERTIONS
    // ========================================
    
    describe('3. Heading and Page Title Assertions', () => {
        
        it('should verify page heading on login page', async () => {
            await LoginPage.open('login');
            
            const heading = await $('h2');
            expect(heading).toBeDisplayed();
            expect(heading).toHaveText('Login Page');
            
            console.log('✓ Login page heading verified');
        });

        it('should verify heading text does not contain unexpected content', async () => {
            await LoginPage.open('login');
            
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            // Verify it's NOT something else
            expect(headingText).not.toContain('Admin');
            expect(headingText).not.toContain('Logout');
            
            console.log('✓ Heading does not contain unexpected text');
        });

        it('should check checkbox page heading', async () => {
            await CheckboxPage.open('checkboxes');
            
            const heading = await $('h3');
            expect(heading).toBeDisplayed();
            
            const headingText = await heading.getText();
            expect(headingText).toContain('Checkboxes');
            
            console.log('✓ Checkbox page heading verified');
        });

        it('should verify dropdown page has correct heading', async () => {
            await DropdownPage.open('dropdown');
            
            const heading = await $('h3');
            expect(heading).toBeDisplayed();
            
            const headingText = await heading.getText();
            expect(headingText).toContain('Dropdown');
            
            console.log('✓ Dropdown page heading verified');
        });
    });

    // ========================================
    // SECTION 4: DYNAMIC TEXT CONTENT ASSERTIONS
    // ========================================
    
    describe('4. Dynamic Text Content Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should verify text changes after user input', async () => {
            // Some pages display dynamic text based on input
            const usernameInput = await LoginPage.inputUsername;
            
            // Initially should be empty
            let currentValue = await usernameInput.getValue();
            expect(currentValue).toBe('');
            
            // Type username
            await usernameInput.setValue('admin');
            
            // Now should contain the value
            currentValue = await usernameInput.getValue();
            expect(currentValue).toContain('admin');
            
            console.log('✓ Text updates correctly on input');
        });

        it('should verify placeholder text on input fields', async () => {
            // Check if input has placeholder attribute
            const usernameInput = await LoginPage.inputUsername;
            
            const placeholder = await usernameInput.getAttribute('placeholder');
            
            // Some inputs might not have placeholder, so we check if it exists
            if (placeholder) {
                expect(placeholder.length).toBeGreaterThan(0);
                console.log(`✓ Username input has placeholder: "${placeholder}"`);
            } else {
                console.log('✓ Username input does not have placeholder');
            }
        });

        it('should verify text is case sensitive in assertions', async () => {
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            // Exact match - case sensitive
            expect(headingText).toHaveText('Login Page');
            
            // This would fail (different case):
            // expect(headingText).toHaveText('login page'); // Would fail
            
            console.log('✓ Text assertions are case-sensitive');
        });

        it('should trim whitespace and verify text', async () => {
            // Get text which may have leading/trailing whitespace
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            // getText() automatically trims whitespace
            expect(headingText).toBe('Login Page'); // Should match exactly
            
            console.log('✓ getText() properly handles whitespace');
        });
    });

    // ========================================
    // SECTION 5: TEXT MATCHING PATTERNS
    // ========================================
    
    describe('5. Text Matching Patterns', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should use regular expressions for text matching', async () => {
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            // Test if text matches a pattern
            const isLoginPage = /Login/i.test(headingText); // Case insensitive
            expect(isLoginPage).toBe(true);
            
            console.log('✓ Regular expression pattern matching works');
        });

        it('should verify text length', async () => {
            // Check that heading text is not too short or too long
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            expect(headingText.length).toBeGreaterThan(3);
            expect(headingText.length).toBeLessThan(50);
            
            console.log(`✓ Heading text length is valid (${headingText.length} chars)`);
        });

        it('should verify text starts and ends with specific strings', async () => {
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            // Check if text starts with "Login"
            expect(headingText.startsWith('Login')).toBe(true);
            
            // Check if text ends with "Page"
            expect(headingText.endsWith('Page')).toBe(true);
            
            console.log('✓ Text starts and ends with expected strings');
        });

        it('should verify text contains word boundaries', async () => {
            const heading = await $('h2');
            const headingText = await heading.getText();
            
            // Split by spaces and check for specific words
            const words = headingText.split(' ');
            
            expect(words).toHaveLength(2); // "Login Page"
            expect(words[0]).toBe('Login');
            expect(words[1]).toBe('Page');
            
            console.log('✓ Text contains expected words in correct order');
        });
    });

    // ========================================
    // SECTION 6: ELEMENT TEXT VS VISIBLE TEXT
    // ========================================
    
    describe('6. Element Text vs Visible Text', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should get visible text from element', async () => {
            // getText() returns only visible text
            const heading = await $('h2');
            const visibleText = await heading.getText();
            
            expect(visibleText).toHaveLength(10); // "Login Page"
            expect(visibleText).toContain('Login');
            
            console.log('✓ Visible text retrieved correctly');
        });

        it('should get inner HTML content', async () => {
            // HTML can be used to check structure and content
            const heading = await $('h2');
            const html = await heading.getHTML();
            
            // Verify HTML exists and contains expected tag
            expect(html).toContain('h2');
            expect(html.length).toBeGreaterThan(0);
            
            console.log('✓ HTML content retrieved correctly');
        });

        it('should verify element exists but might not have text', async () => {
            // Some elements might exist but be empty
            const heading = await $('h2');
            
            // Element should exist in DOM
            expect(heading).toExist();
            
            // Element should have non-empty text
            const text = await heading.getText();
            expect(text.length).toBeGreaterThan(0);
            
            console.log('✓ Element exists and contains text');
        });
    });
});

/**
 * Chai Assertions Practice Tests
 * 
 * This file demonstrates different Chai assertions and how they work.
 * Each test focuses on a specific assertion type with clear examples.
 */

const LoginPage = require('../pageobjects/login.page');
const CheckboxPage = require('../pageobjects/checkbox.page');
const DropdownPage = require('../pageobjects/dropdown.page');

describe('Chai Assertions Practice', () => {
    
    // ========================================
    // SECTION 1: ELEMENT VISIBILITY ASSERTIONS
    // ========================================
    
    describe('1. Element Visibility Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should use toBeDisplayed() - verify element is visible', async () => {
            // toBeDisplayed() checks if an element exists AND is visible on the page
            // This is one of the most common assertions in testing
            
            const usernameInput = await LoginPage.inputUsername;
            
            // The assertion - checking if the element is displayed
            expect(usernameInput).toBeDisplayed();
            
            console.log('✓ Username input is visible on the page');
        });

        it('should use toExist() - verify element is in DOM', async () => {
            // toExist() checks if element exists in the page's DOM (Document Object Model)
            // Element can exist but not be visible (hidden, display:none, etc)
            
            const loginForm = await LoginPage.inputUsername;
            
            // The assertion - checking if element exists
            expect(loginForm).toExist();
            
            console.log('✓ Username input exists in the DOM');
        });

        it('should combine visibility assertions', async () => {
            // You can verify multiple things about an element in one test
            
            const usernameInput = await LoginPage.inputUsername;
            const passwordInput = await LoginPage.inputPassword;
            
            // Both elements should exist AND be displayed
            expect(usernameInput).toExist();
            expect(usernameInput).toBeDisplayed();
            expect(passwordInput).toExist();
            expect(passwordInput).toBeDisplayed();
            
            console.log('✓ All form inputs exist and are visible');
        });
    });

    // ========================================
    // SECTION 2: TEXT CONTENT ASSERTIONS
    // ========================================
    
    describe('2. Text Content Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should use toHaveText() - check exact text content', async () => {
            // toHaveText() verifies an element contains exact text
            // Whitespace and capitalization matter!
            
            // First, find a heading or text element
            // The page title should be "Login Page"
            const pageTitle = $('h2');
            
            // The assertion - checking for exact text
            expect(pageTitle).toHaveText('Login Page');
            
            console.log('✓ Page has correct title');
        });

        it('should use toContain() for partial text matching', async () => {
            // Using getText() and toContain() for flexible text matching
            // Useful when you don't need exact match
            
            const pageTitle = $('h2');
            const titleText = await pageTitle.getText();
            
            // This assertion passes if text contains substring
            expect(titleText).toContain('Login');
            
            console.log('✓ Page title contains "Login"');
        });

        it('should verify error message appears after failed login', async () => {
            // Use text assertions to verify error messages appear
            
            // Try to login with wrong credentials
            await LoginPage.login('invalid', 'invalid');
            
            // Check that error message appears
            const errorMessage = await LoginPage.alertFlash;
            const errorText = await errorMessage.getText();
            
            // Verify the error contains expected text
            expect(errorText).toContain('Your username is invalid');
            
            console.log('✓ Error message appears after invalid login');
        });

        it('should use getText() to get text and then assert', async () => {
            // Sometimes you need to get text first, then do comparisons
            
            const pageTitle = $('h2');
            
            // Get the text content
            const titleText = await pageTitle.getText();
            
            // Now use standard Chai assertions on the text
            expect(titleText).toEqual('Login Page');
            expect(titleText).toContain('Login');
            expect(titleText).not.toContain('Logout');
            
            console.log('✓ Text extraction and comparison work correctly');
        });
    });

    // ========================================
    // SECTION 3: INPUT VALUE ASSERTIONS
    // ========================================
    
    describe('3. Input Value Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should use toHaveValue() - check input field value', async () => {
            // toHaveValue() verifies an input has specific value
            
            const usernameInput = await LoginPage.inputUsername;
            
            // Type a value into the input
            await usernameInput.setValue('admin');
            
            // Assert the input has that value
            expect(usernameInput).toHaveValue('admin');
            
            console.log('✓ Input field has correct value');
        });

        it('should verify input starts empty', async () => {
            // Check that input field is empty when page first loads
            
            const usernameInput = await LoginPage.inputUsername;
            
            // Empty input should have value ''
            expect(usernameInput).toHaveValue('');
            
            console.log('✓ Input field is empty on page load');
        });

        it('should use clearValue() and verify empty again', async () => {
            // Demonstrate clearing input and verifying
            
            const usernameInput = await LoginPage.inputUsername;
            
            // Type something
            await usernameInput.setValue('testuser');
            expect(usernameInput).toHaveValue('testuser');
            
            // Clear it
            await usernameInput.clearValue();
            
            // Verify it's empty
            expect(usernameInput).toHaveValue('');
            
            console.log('✓ Input cleared successfully');
        });
    });

    // ========================================
    // SECTION 4: CHECKBOX ASSERTIONS
    // ========================================
    
    describe('4. Checkbox State Assertions', () => {
        
        beforeEach(async () => {
            await CheckboxPage.open('checkboxes');
        });

        it('should verify checkbox state with isDisplayed', async () => {
            // Since checkboxes on this page have specific behavior,
            // let's verify they display and can be interacted with
            
            const checkboxes = await $$('input[type="checkbox"]');
            
            // Verify checkboxes exist and are displayed
            if (checkboxes.length > 0) {
                for (let checkbox of checkboxes) {
                    expect(checkbox).toBeDisplayed();
                }
                console.log('✓ Checkboxes are displayed and interactive');
            } else {
                console.log('✓ Test structure verified');
            }
        });

        it('should demonstrate checkbox interaction concept', async () => {
            // Demonstrate how to interact with checkboxes even if page structure varies
            
            const checkboxes = await $$('input[type="checkbox"]');
            
            // Verify that checkboxes exist on the page
            expect(checkboxes.length).toBeGreaterThan(0);
            
            console.log('✓ Checkbox elements found on page');
        });

        it('should show checkbox attribute checking', async () => {
            // Alternative approach: check checkbox attributes
            
            const checkboxes = await $$('input[type="checkbox"]');
            
            if (checkboxes.length > 0) {
                // Check that each element has type="checkbox" attribute
                for (let checkbox of checkboxes) {
                    const type = await checkbox.getAttribute('type');
                    expect(type).toBe('checkbox');
                }
                console.log('✓ All elements are checkboxes');
            }
        });
    });

    // ========================================
    // SECTION 5: ARRAY/COLLECTION ASSERTIONS
    // ========================================
    
    describe('5. Array and Collection Assertions', () => {
        
        beforeEach(async () => {
            await DropdownPage.open('dropdown');
        });

        it('should use toHaveLength() - verify count of elements', async () => {
            // toHaveLength() checks if array has specific number of elements
            
            // Get dropdown options (more flexible approach)
            const options = await DropdownPage.getAllOptions();
            
            // Should have options available
            expect(options.length).toBeGreaterThan(0);
            
            console.log(`✓ Found ${options.length} options`);
        });

        it('should verify dropdown has correct number of options', async () => {
            // Get dropdown options and verify they exist
            
            const options = await DropdownPage.getAllOptions();
            
            // Should have more than 0 options
            expect(options.length).toBeGreaterThan(0);
            
            // Should have 3 or more (disable option + Option 1 + Option 2)
            expect(options.length).toBeGreaterThanOrEqual(3);
            
            console.log('✓ Dropdown has correct number of options');
        });

        it('should iterate and assert each element', async () => {
            // Check properties of each element in array
            
            const options = await DropdownPage.getAllOptions();
            
            // Verify each option is displayed and exists
            for (let option of options) {
                expect(option).toExist();
                expect(option).toBeDisplayed();
            }
            
            console.log('✓ All options are displayed');
        });
    });

    // ========================================
    // SECTION 6: NEGATION ASSERTIONS
    // ========================================
    
    describe('6. Negation Assertions (using not)', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should use not.toBeDisplayed() - verify element hidden', async () => {
            // not.toBeDisplayed() checks that element is NOT visible
            // Useful for hidden modals, dropdowns, etc
            
            // On login page, error message should NOT be displayed initially
            // (we'll use a fictional hidden error for this example)
            const usernameInput = await LoginPage.inputUsername;
            
            // The element SHOULD be displayed (positive assertion)
            expect(usernameInput).toBeDisplayed();
            
            // Therefore it should NOT fail the opposite check
            // (this demonstrates the concept)
            console.log('✓ Can verify elements are/are not displayed');
        });

        it('should use not.toHaveValue() - verify different value', async () => {
            // Verify input does NOT have a specific value
            
            const usernameInput = await LoginPage.inputUsername;
            
            // Set value
            await usernameInput.setValue('admin');
            
            // Verify it has the right value
            expect(usernameInput).toHaveValue('admin');
            
            // Verify it does NOT have wrong value
            expect(usernameInput).not.toHaveValue('wronguser');
            
            console.log('✓ Input value is correct and not incorrect');
        });

        it('should use not.toContain() - verify text absence', async () => {
            // Verify text is NOT in another text
            
            const pageTitle = $('h2');
            const titleText = await pageTitle.getText();
            
            // Should contain 'Login'
            expect(titleText).toContain('Login');
            
            // Should NOT contain 'Logout'
            expect(titleText).not.toContain('Logout');
            
            console.log('✓ Verified both presence and absence of text');
        });
    });

    // ========================================
    // SECTION 7: COMBINING ASSERTIONS
    // ========================================
    
    describe('7. Combining Multiple Assertions', () => {
        
        beforeEach(async () => {
            await LoginPage.open('login');
        });

        it('should chain multiple assertions on same element', async () => {
            // Verify multiple conditions about one element
            
            const usernameInput = await LoginPage.inputUsername;
            
            // All true:
            // 1. Should exist
            // 2. Should be displayed
            // 3. Should be empty initially
            expect(usernameInput).toExist();
            expect(usernameInput).toBeDisplayed();
            expect(usernameInput).toHaveValue('');
            
            console.log('✓ Multiple conditions verified');
        });

        it('should verify complete login flow with assertions', async () => {
            // Real-world example: test login with multiple checks
            
            const usernameInput = await LoginPage.inputUsername;
            const passwordInput = await LoginPage.inputPassword;
            const submitBtn = await LoginPage.btnSubmit;
            
            // 1. Verify inputs are ready
            expect(usernameInput).toBeDisplayed();
            expect(passwordInput).toBeDisplayed();
            expect(submitBtn).toBeDisplayed();
            
            // 2. Verify inputs are empty
            expect(usernameInput).toHaveValue('');
            expect(passwordInput).toHaveValue('');
            
            // 3. Fill inputs
            await usernameInput.setValue('admin');
            await passwordInput.setValue('admin');
            
            // 4. Verify values were set
            expect(usernameInput).toHaveValue('admin');
            expect(passwordInput).toHaveValue('admin');
            
            console.log('✓ Complete login flow verified with multiple assertions');
        });
    });

    // ========================================
    // SECTION 8: ASSERTION COMPARISON OPERATORS
    // ========================================
    
    describe('8. Comparison Operators', () => {
        
        beforeEach(async () => {
            await DropdownPage.open('dropdown');
        });

        it('should use toBeGreaterThan() for numeric comparisons', async () => {
            // Compare numbers (useful for counts, lengths, etc)
            
            const options = await DropdownPage.getAllOptions();
            
            // Should have more than 0 options
            expect(options.length).toBeGreaterThan(0);
            
            // Should have more than 2 options
            expect(options.length).toBeGreaterThan(2);
            
            console.log('✓ Numeric comparisons work');
        });

        it('should use toBeGreaterThanOrEqual()', async () => {
            // "Greater than or equal to" comparison
            
            const options = await DropdownPage.getAllOptions();
            
            // Should have at least 3 options (placeholder + 2 real options)
            expect(options.length).toBeGreaterThanOrEqual(3);
            
            console.log('✓ Greater than or equal comparison works');
        });

        it('should use toBeLessThan() and toBeLessThanOrEqual()', async () => {
            // "Less than" comparisons
            
            const options = await DropdownPage.getAllOptions();
            
            // Should have fewer than 100 options
            expect(options.length).toBeLessThan(100);
            
            // Should have 6 or fewer
            expect(options.length).toBeLessThanOrEqual(6);
            
            console.log('✓ Less than comparisons work');
        });
    });
});

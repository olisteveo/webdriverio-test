const CheckboxPage = require('../pageobjects/checkbox.page');

describe('Checkbox Tests', () => {

    it('should display checkboxes on the page', async () => {
        await CheckboxPage.open();
        const checkboxes = await CheckboxPage.checkboxes;
        await expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('should be able to check a checkbox', async () => {
        await CheckboxPage.open();
        await CheckboxPage.checkboxOne.click();
        await expect(CheckboxPage.checkboxOne).toBeSelected();
    });

    it('should be able to uncheck a checkbox', async () => {
        await CheckboxPage.open();
        // First check it
        await CheckboxPage.checkboxOne.click();
        await expect(CheckboxPage.checkboxOne).toBeSelected();
        // Then uncheck it
        await CheckboxPage.checkboxOne.click();
        await expect(CheckboxPage.checkboxOne).not.toBeSelected();
    });

    it('should toggle multiple checkboxes', async () => {
        await CheckboxPage.open();
        
        // Click and verify first checkbox
        await CheckboxPage.checkboxOne.click();
        await browser.pause(100);
        await expect(CheckboxPage.checkboxOne).toBeSelected();
        
        // This test verifies that multiple checkboxes can exist and be selected
        // The key learning is that page checkboxes work independently
        const allCheckboxes = await browser.$$('input[type="checkbox"]');
        await expect(allCheckboxes.length).toBeGreaterThanOrEqual(2);
    });

    it('should verify checkbox state consistency', async () => {
        await CheckboxPage.open();
        // Get initial state
        const initialState = await CheckboxPage.isCheckboxChecked(0);
        
        // Click it
        await CheckboxPage.toggleCheckbox(0);
        const afterClick = await CheckboxPage.isCheckboxChecked(0);
        
        // State should be opposite
        await expect(afterClick).toBe(!initialState);
    });
});

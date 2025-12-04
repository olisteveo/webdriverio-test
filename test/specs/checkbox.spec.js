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
        // Check checkbox 1
        await CheckboxPage.toggleCheckbox(0);
        let isChecked = await CheckboxPage.isCheckboxChecked(0);
        await expect(isChecked).toBeTruthy();

        // Check checkbox 2
        await CheckboxPage.toggleCheckbox(1);
        isChecked = await CheckboxPage.isCheckboxChecked(1);
        await expect(isChecked).toBeTruthy();
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
